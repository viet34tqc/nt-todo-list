import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TodoContext } from '../../context/TodoContext';
import TodoForm from './TodoForm';

const value = {
	todos: [],
	setTodos: jest.fn(),
};

describe('TodoForm', () => {
	beforeEach(() => {
		render(
			<TodoContext.Provider value={value}>
				<TodoForm />
			</TodoContext.Provider>
		);
	});
	describe('TodoForm render', () => {
		test('TodoForm contains an input text and it has focus on mount', () => {
			const inputField = screen.getByPlaceholderText('Enter your todo');
			expect(inputField).toBeInTheDocument();
			expect(inputField).toHaveFocus();
		});
		test('TodoForm contains a submit button', () => {
			const inputField = screen.getByRole('button');
			expect(inputField).toBeInTheDocument();
		});
	});

	describe('TodoForm interaction', () => {
		describe('Validation', () => {
			test('Input Field has error text when user enters only space character', () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				const submitButton = screen.getByRole('button');
				fireEvent.change(inputField, { target: { value: ' ' } });
				expect(
					screen.getByText('Please enter your todo item')
				).toBeInTheDocument();
				expect(submitButton).toBeDisabled();
			});
			test('Input Field has error text when user enters invalid email', () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				const submitButton = screen.getByRole('button');
				fireEvent.change(inputField, { target: { value: 'abc123' } });
				expect(
					screen.getByText('Please enter valid email address')
				).toBeInTheDocument();
				expect(submitButton).toBeDisabled();
			});
			test('Successful validation', () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				const submitButton = screen.getByRole('button');
				fireEvent.change(inputField, { target: { value: 'abc123@gmail.com' } });
				expect(screen.queryByRole('p')).not.toBeInTheDocument();
				expect(submitButton).not.toBeDisabled();
			});
		});

		describe('Form submit', () => {
			test("Form mustn't submit when the user enters invalid email", () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				fireEvent.change(inputField, { target: { value: 'abc123' } });
				fireEvent.click(screen.getByText('Add'));

				expect(value.setTodos).not.toBeCalled();
			});
			test('Form submit and submit button changes text when the user enters valid email', async () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				fireEvent.change(inputField, { target: { value: 'abc123@gmail.com' } });
				fireEvent.click(screen.getByText('Add'));

				expect(
					screen.queryByRole('button', { name: 'Add' })
				).not.toBeInTheDocument();
				expect(
					screen.getByRole('button', { name: 'Adding' })
				).toBeInTheDocument();
				await waitFor(() => expect(value.setTodos).toHaveBeenCalledTimes(1));
			});
		});
	});
});
