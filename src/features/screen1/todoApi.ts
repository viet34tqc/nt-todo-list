import { axiosTodoClient } from 'src/api/axiosClient';
import { Todo } from 'src/types/todo';

const todoApi = {
	get(id: number): Promise<Todo> {
		return axiosTodoClient.get(`${id}`);
	},
};

export default todoApi;
