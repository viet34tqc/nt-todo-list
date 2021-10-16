import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TodoItem from './TodoItem';

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
