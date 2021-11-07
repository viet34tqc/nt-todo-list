import { axiosTodoClient } from 'src/core/api/axiosClient';
import { Todo } from 'src/features/screen1/todo';

const todoApi = {
	get(id: number): Promise<Todo> {
		return axiosTodoClient.get(`${id}`);
	},
};

export default todoApi;
