import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import TodoContextProvider from '../../context/TodoContext';
import TodoList from './TodoList';

describe('Render TodoList', () => {
	beforeEach(() => {
		render(
			<TodoContextProvider>
				<TodoList />
			</TodoContextProvider>
		);
	});

	test('Loading todo list', async () => {
		// Asynchronous query
		const displayedTasks = await screen.findAllByTestId(/task-id-\d+/);
		expect(displayedTasks).toHaveLength(2);
		expect(screen.getByText('Task One')).toBeInTheDocument();
		expect(screen.getByText('Task Two')).toBeInTheDocument();
	});
	test('Loading text is shown while the API is in progress', async () => {
		const loading = screen.getByText('Loading...');
		expect(loading).toBeInTheDocument();
		await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
	});
});
