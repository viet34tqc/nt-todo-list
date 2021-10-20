import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { getTodoError, mockTodos } from 'src/features/Todo/mocks/handlers';
import { server } from 'src/server';
import TodoForm from './Form';
import TodoItem from './Item';
import Todo from './Todo';

describe('TodoForm', () => {
	const setTodos = jest.fn();
	beforeEach(() => {
		render(<TodoForm todos={mockTodos} setTodos={setTodos} />);
	});
	describe('TodoForm render', () => {
		test('TodoForm contains an input text and it has focus on mount', async () => {
			const inputField = screen.getByPlaceholderText('Enter your todo');
			// We need to add waitFor here due to the react-hook-form validation
			// Otherwise, there might be an warning 'An update inside a test was not wrapped in act(...)'
			await waitFor(() => {
				expect(inputField).toBeInTheDocument();
				expect(inputField).toHaveFocus();
			});
		});
		test('TodoForm contains a submit button', async () => {
			const inputField = screen.getByRole('button');
			await waitFor(() => {
				expect(inputField).toBeInTheDocument();
			});
		});
	});

	describe('TodoForm interaction', () => {
		describe('Validation', () => {
			test('Input Field has error text when user enters only space character', async () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				const submitButton = screen.getByRole('button');
				fireEvent.input(inputField, { target: { value: ' ' } });
				await waitFor(async () => {
					expect(
						await screen.findByText('Please enter your todo item')
					).toBeInTheDocument();
					expect(submitButton).toBeDisabled();
				});
			});
			test('Input Field has error text when user enters invalid email', async () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				const submitButton = screen.getByRole('button');
				fireEvent.change(inputField, { target: { value: 'abc123' } });
				await waitFor(async () => {
					expect(
						await screen.findByText('Please enter valid email address')
					).toBeInTheDocument();
					expect(submitButton).toBeDisabled();
				});
			});
			test('Successful validation', async () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				const submitButton = screen.getByRole('button');
				fireEvent.change(inputField, { target: { value: 'abc123@gmail.com' } });
				await waitFor(async () => {
					expect(screen.queryByRole('p')).not.toBeInTheDocument();
					expect(submitButton).not.toBeDisabled();
				});
			});
		});

		describe('Form submit', () => {
			test("Form mustn't submit when the user enters invalid email", async () => {
				const inputField = screen.getByPlaceholderText('Enter your todo');
				fireEvent.change(inputField, { target: { value: 'abc123' } });
				fireEvent.click(screen.getByText('Add'));
				await waitFor(async () => {
					expect(setTodos).not.toBeCalled();
				});
			});
			test('Form submitted and submit button changes text when the user enters valid email', async () => {
				const inputField = screen.getByPlaceholderText(
					'Enter your todo'
				) as HTMLInputElement;
				fireEvent.input(inputField, { target: { value: 'abc123@gmail.com' } });
				fireEvent.click(screen.getByText('Add'));

				expect(
					await screen.findByRole('button', { name: 'Adding' })
				).toBeInTheDocument();
				await waitFor(() => {
					expect(setTodos).toHaveBeenCalledTimes(1);
					expect(inputField.value).toBe('');
				});
			});
		});
	});
});

describe('TodoItem', () => {
	const mockTodo = {
		id: '1234',
		name: 'Test todo',
		completed: false,
	};
	const setTodos = jest.fn();
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
			const button = screen.getByRole('button');
			fireEvent.click(button);
			await waitFor(() => expect(setTodos).toHaveBeenCalledTimes(1));
		});
	});
});

describe('TodoList', () => {
	describe('Load Todo from API successfully', () => {
		beforeEach(() => {
			render(<Todo />);
		});
		test('Loading text is shown while the API is in progress', async () => {
			const loading = screen.getByText('Loading...');
			expect(loading).toBeInTheDocument();
			await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
		});

		test('Render todo list successfully', async () => {
			const displayedTasks = await screen.findAllByTestId(/task-\d+/);
			expect(displayedTasks).toHaveLength(2);
			expect(screen.getByText('Task One')).toBeInTheDocument();
			expect(screen.getByText('Task Two')).toBeInTheDocument();
		});

		test('should delete first Todo item', async () => {
			const button = await screen.findByTestId(/delete-1/i);
			fireEvent.click(button);
			await waitFor(() => {
				expect(screen.queryByTestId(/task-1/i)).not.toBeInTheDocument();
			});
		});

		test('should toggle Todo status on checkbox click', async () => {
			const checkbox = await screen.findByTestId(/checkbox-2/i);
			fireEvent.click(checkbox);
			await waitFor(() => {
				expect(screen.getByTestId(/task-2/i)).toHaveClass('is-completed');
			});
		});
	});

	it('Displays error message when fetching todos', async () => {
		server.use(getTodoError);
		render(<Todo />);

		const errorDisplay = await screen.findByText('Cannot get data');
		expect(errorDisplay).toBeInTheDocument();

		const displayedTasks = screen.queryAllByTestId(/task-\d+/);
		expect(displayedTasks).toEqual([]);
	});
});
