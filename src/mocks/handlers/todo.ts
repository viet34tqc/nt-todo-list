import { rest } from 'msw';
import { Todo } from 'src/types/todo';

export const mockTodos = { id: '1', title: 'Task One', completed: true };

export const todoHandlers = [
	rest.get<Todo>(
		`https://jsonplaceholder.typicode.com/todos/1`,
		(req, res, ctx) => {
			return res(ctx.json(mockTodos));
		}
	),
];

export const getTodoError = rest.get(
	`https://jsonplaceholder.typicode.com/todos/1`,
	async (req, res, ctx) =>
		res.once(ctx.status(500), ctx.json({ message: 'Cannot get data' }))
);
