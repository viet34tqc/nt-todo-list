import { render, screen } from '@testing-library/react';
import { mockTodos } from '../../mocks/handlers';
import TodoList from './TodoList';

describe('Render TodoList', () => {
	test('Loading todo list', async () => {
		render(<TodoList todos={mockTodos} setTodos={jest.fn()} error="" />);

		const displayedTasks = screen.getAllByTestId(/task-id-\d+/);
		expect(displayedTasks).toHaveLength(2);
		expect(screen.getByText('Task One')).toBeInTheDocument();
		expect(screen.getByText('Task Two')).toBeInTheDocument();
	});
});
