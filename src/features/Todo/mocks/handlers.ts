import { rest } from 'msw';
import { API_URL } from 'src/config/config';
import { Todo } from 'src/models/todo';

export const mockTodos = [
	{ id: '1', name: 'Task One', completed: true },
	{ id: '2', name: 'Task Two', completed: false },
];

export const todoHandlers = [
	rest.post<Todo>(`${API_URL}/todo`, (req, res, ctx) => {
		const { id, name, completed } = req?.body;
		return res(
			ctx.json({
				id,
				name,
				completed,
			})
		);
	}),

	rest.put<Todo>(`${API_URL}/todo/:todoID`, (req, res, ctx) => {
		const { id, name, completed } = req?.body;
		return res(
			ctx.json({
				id,
				name,
				completed: !completed,
			})
		);
	}),

	rest.delete<Todo>(`${API_URL}/todo/:todoID`, (req, res, ctx) => {
		const { id, name, completed } = req?.body;
		return res(
			ctx.json({
				id,
				name,
				completed,
			})
		);
	}),

	rest.get<Todo[]>(`${API_URL}/todo`, (req, res, ctx) => {
		return res(ctx.json(mockTodos));
	}),
];

export const getTodoError = rest.get(`${API_URL}/todo`, async (req, res, ctx) =>
	res.once(ctx.status(500), ctx.json({ message: 'Cannot get data' }))
);
