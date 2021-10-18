import { Todo } from 'src/models/todo';
import axiosClient from './axiosClient';

const todoApi = {
	getAll(): Promise<Todo[]> {
		const url = '/todo';
		return axiosClient.get(url);
	},
	add(data: Partial<Todo>): Promise<Todo> {
		const url = `/todo`;
		return axiosClient.post(url, data);
	},
	toggleStatus(data: Partial<Todo>): Promise<Todo> {
		const url = `/todo/${data.id}`;
		return axiosClient.put(url, data);
	},
	delete(id: string): Promise<Todo> {
		const url = `/todo/${id}`;
		return axiosClient.delete(url);
	},
};

export default todoApi;
