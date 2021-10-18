import React, { Dispatch, SetStateAction, useState } from 'react';
import { API_URL } from 'src/config/config';
import { Todo } from 'src/models/todo';
import './styles/TodoItem.scss';

interface TodoItemProps {
	todo: Todo;
	setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoItem = ({
	todo: { id, name, completed },
	setTodos,
}: TodoItemProps) => {
	const [isDeleteLoading, setIsDeleteLoading] = useState(false);

	// Handle delete todo
	const handleDelete = async () => {
		setIsDeleteLoading(true);
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
				setIsDeleteLoading(false);
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
		<li
			className={`todo-item ${completed ? 'is-completed' : ''}`}
			data-testid={`task-id-${id}`}
		>
			<label>
				<input
					className="todo-item__toggler"
					type="checkbox"
					defaultChecked={completed}
					onChange={handleToggleStatus}
				/>
				<span className="todo-item__name">{name}</span>
				<button
					className="todo-item__delete"
					disabled={isDeleteLoading}
					onClick={handleDelete}
				>
					{isDeleteLoading ? 'Deleting' : 'Delete'}
				</button>
			</label>
		</li>
	);
};

export default TodoItem;
