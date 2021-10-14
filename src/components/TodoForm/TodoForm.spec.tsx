import { render, screen } from '@testing-library/react';
import { TodoContext } from '../../context/TodoContext';
import TodoForm from './TodoForm';

const value = {
	todos: [],
	setTodos: () => {},
};

describe('TodoForm render', () => {
	beforeEach(() => {
		render(
			<TodoContext.Provider value={value}>
				<TodoForm />
			</TodoContext.Provider>
		);
	});

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
