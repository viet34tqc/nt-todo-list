import React from 'react';
import { Todo } from '../../models/todo';
import TodoItem from '../TodoItem/TodoItem';

interface TodoListProps {
	todos: Todo[];
}

const TodoList = ({ todos }: TodoListProps) => {
	return (
		<ul>
			{todos && todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
		</ul>
	);
};

export default TodoList;
