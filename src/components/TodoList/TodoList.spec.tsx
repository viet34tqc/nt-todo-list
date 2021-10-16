import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import App from '../../App';
import { getTodoError } from '../../mocks/handlers';
import { server } from '../../mocks/server';

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
