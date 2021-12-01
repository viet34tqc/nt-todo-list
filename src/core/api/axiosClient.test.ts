import { getTodoError } from 'src/features/screen1/handlers/todo';
import { server } from 'src/core/mocks/server';
import { Todo } from 'src/features/screen1/todo';
import { axiosTodoClient } from './axiosClient';

test('axiosClient success', async () => {
	const data: Todo = await axiosTodoClient.get(
		'https://jsonplaceholder.typicode.com/todos/1'
	);
	expect(data.title).toBe('Task One');
});

test('should display error message when fetching todos', async () => {
	server.use(getTodoError);
    let message = ''
	try {
		await axiosTodoClient.get('https://jsonplaceholder.typicode.com/todos/1');
	} catch (error) {
		message = error?.response?.data?.message
	}
    expect(message).toBe('Cannot get data');
});
