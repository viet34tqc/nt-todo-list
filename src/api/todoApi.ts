import { Todo } from '../types/todo';
import { axiosTodoClient } from './axiosClient';

const todoApi = {
	get(): Promise<Todo> {
		return axiosTodoClient.get('');
	},
};

export default todoApi;
