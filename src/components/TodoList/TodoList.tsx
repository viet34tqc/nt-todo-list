import { useEffect, useState } from 'react';
import { API_URL } from '../../config/config';
import { useTodos } from '../../context/TodoContext';
import { Todo } from '../../models/todo';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.styles.scss';

const TodoList = () => {
	const { todos, setTodos } = useTodos();
	const [error, setError] = useState('');

	// Call API to get Todos
	useEffect(() => {
		(async function () {
			await fetch(API_URL)
				.then(async (res) => {
					const todos: Todo[] = await res.json();
					setTodos(() => todos);
				})
				.catch((error) => {
					setError(error.message);
				});
		})();
	}, [setTodos]);

	console.log( todos );

	if (!todos.length) {
		return <p>Loading...</p>;
	} else if (error) {
		return <p>{error}</p>;
	}
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
};

export default TodoList;
