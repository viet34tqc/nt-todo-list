import { rest } from 'msw';
import { Todo } from 'src/features/screen1/todo';

export const mockTodos = [
	{ id: '1', title: 'Task One', completed: true },
	{ id: '2', title: 'Task Two', completed: false },
];

export const todoHandlers = [
	rest.get<Todo>(
		`https://jsonplaceholder.typicode.com/todos/1`,
		(req, res, ctx) => {
			return res(ctx.json(mockTodos[0]));
		}
	),
	rest.get<Todo>(
		`https://jsonplaceholder.typicode.com/todos/2`,
		(req, res, ctx) => {
			return res(ctx.json(mockTodos[1]));
		}
	),
];

export const getTodoError = rest.get(
	`https://jsonplaceholder.typicode.com/todos/1`,
	async (req, res, ctx) =>
		res.once(ctx.status(500), ctx.json({ message: 'Cannot get data' }))
);
