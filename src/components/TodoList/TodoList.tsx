import React from 'react';
import { useTodos } from '../../context/TodoContext';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = () => {
	const { todos } = useTodos();
	return (
		<ul>
			{todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
		</ul>
	);
};

export default TodoList;
