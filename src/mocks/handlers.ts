import { rest } from 'msw';
import { API_URL } from '../config/config';
import { Todo } from '../models/todo';

export const mockTodos = [
	{ id: '1', name: 'Task One', completed: true },
	{ id: '2', name: 'Task Two', completed: false },
];

export const handlers = [
	rest.post<Todo>(API_URL, (req, res, ctx) => {
		const { name, completed } = req?.body;
		return res(
			ctx.json({
				id: '1',
				name,
				completed,
			})
		);
	}),

	rest.get<Todo[]>(API_URL, (req, res, ctx) => {
		return res(ctx.json(mockTodos));
	}),
];
