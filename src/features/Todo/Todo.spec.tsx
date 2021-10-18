import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import App from 'src/App';
import { getTodoError, mockTodos } from 'src/features/Todo/mocks/handlers';
import { server } from 'src/server';
import TodoForm from './Form';
import TodoItem from './Item';

describe('TodoForm', () => {
	const setTodos = jest.fn();
	beforeEach(() => {
		render(<TodoForm todos={mockTodos} setTodos={setTodos} />);
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

				expect(setTodos).not.toBeCalled();
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
				await waitFor(() => expect(setTodos).toHaveBeenCalledTimes(1));
			});
		});
	});
});

const mockTodo = {
	id: '1234',
	name: 'Test todo',
	completed: false,
};

const setTodos = jest.fn();
describe('TodoItem', () => {
	beforeEach(() => {
		render(<TodoItem todo={mockTodo} setTodos={setTodos} />);
	});

	describe('TodoItem interaction', () => {
		test('Todo status is toggled on checkbox click', async () => {
			const checkbox = screen.getByLabelText(mockTodo.name);
			fireEvent.click(checkbox);
			await waitFor(() => expect(setTodos).toHaveBeenCalledTimes(1));
		});
		test('Todo is deleted on button click', async () => {
			const checkbox = screen.getByRole('button');
			fireEvent.click(checkbox);
			await waitFor(() => expect(setTodos).toHaveBeenCalledTimes(1));
		});
	});
});

describe('TodoList', () => {
	describe('Load Todo from API successfully', () => {
		beforeEach(() => {
			render(<App />);
		});
		test('Loading text is shown while the API is in progress', async () => {
			const loading = screen.getByText('Loading...');
			expect(loading).toBeInTheDocument();
			await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
		});

		test('Render todo list successfully', async () => {
			const displayedTasks = await screen.findAllByTestId(/task-id-\d+/);
			expect(displayedTasks).toHaveLength(2);
			expect(screen.getByText('Task One')).toBeInTheDocument();
			expect(screen.getByText('Task Two')).toBeInTheDocument();
		});
	});

	it('Displays error message when fetching todos', async () => {
		server.use(getTodoError);
		render(<App />);

		const errorDisplay = await screen.findByText('Internal Server Error');
		expect(errorDisplay).toBeInTheDocument();

		const displayedTasks = screen.queryAllByTestId(/task-id-\d+/);
		expect(displayedTasks).toEqual([]);
	});
});
