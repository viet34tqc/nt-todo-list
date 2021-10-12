import React from 'react';
import { Todo } from '../../models/todo';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
	return (
		<li>
			<input type="checkbox" name="" id="" />
			{todo.name}
			<button>Delete</button>
		</li>
	);
};

export default TodoItem;
