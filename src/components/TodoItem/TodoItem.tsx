import React from 'react';
import { API_URL } from '../../config/config';
import { useTodos } from '../../context/TodoContext';
import { Todo } from '../../models/todo';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
	const { id, name, completed } = todo;
	const { setTodos } = useTodos();
	const handleDelete = async () => {
		await fetch(`${API_URL}${id}`, {
			method: 'DELETE',
		})
			.then(async (res) => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	const handleToggleStatus = async () => {
		await fetch(`${API_URL}${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				completed: !completed,
			}),
		})
			.then(async (res) => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				setTodos((prevTodos) => {
					return prevTodos.map((todo) => {
						if (todo.id !== id) {
							return todo;
						}
						return {
							...todo,
							completed: !todo.completed,
						};
					});
				});
			})
			.catch((error) => {
				console.log(error.message);
			});
	};
	return (
		<li className={completed ? 'is-completed' : ''}>
			<input
				type="checkbox"
				defaultChecked={completed}
				onChange={handleToggleStatus}
			/>
			{name}
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
};

export default TodoItem;
