import { Todo } from '../types/todo';
import { axiosTodoClient } from './axiosClient';

const todoApi = {
	get(id: number): Promise<Todo> {
		return axiosTodoClient.get(`${id}`);
	},
};

export default todoApi;
