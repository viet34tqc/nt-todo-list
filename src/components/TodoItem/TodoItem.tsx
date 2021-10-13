import React, { useState } from 'react';
import { API_URL } from '../../config/config';
import { useTodos } from '../../context/TodoContext';
import { Todo } from '../../models/todo';
import './TodoItem.styles.scss';

interface TodoItemProps {
	todo: Todo;
}

const TodoItem = ({ todo: { id, name, completed } }: TodoItemProps) => {
	const { setTodos } = useTodos();
	const [deleteLoading, setDeleteLoading] = useState(false);

	// Handle delete todo
	const handleDelete = async () => {
		setDeleteLoading(true);
		await fetch(`${API_URL}${id}`, {
			method: 'DELETE',
		})
			.then(async (res) => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				setTodos((prevTodos) => prevTodos.filter((item) => item.id !== id));
				setDeleteLoading(false);
			})
			.catch((error) => {
				console.log(error.message);
				setDeleteLoading(false);
			});
	};

	// Handle toggle todo
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
		<li className={`todo-item ${completed ? 'is-completed' : ''}`}>
			<label>
				<input
					type="checkbox"
					defaultChecked={completed}
					onChange={handleToggleStatus}
				/>
				<span className="todo-item__name">{name}</span>
				<button
					className="todo-item__delete"
					disabled={deleteLoading}
					onClick={handleDelete}
				>
					Delete
				</button>
			</label>
		</li>
	);
};

export default TodoItem;
