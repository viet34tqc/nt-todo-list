import React, { ChangeEvent, FormEvent, useState } from 'react';
import { API_URL } from '../../config/config';
import { useTodos } from '../../context/TodoContext';
import './TodoForm.styles.scss';

const errorsMessage = {
	isEmpty: 'Please enter your todo item',
	isInvalidEmail: 'Please enter valid email address',
	isDuplicated: 'Your item is already on the list',
};

const pattern = new RegExp(
	/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

const TodoForm = () => {
	const { todos, setTodos } = useTodos();
	const [value, setValue] = useState('');
	const [errors, setErrors] = useState({
		isEmpty: false,
		isInvalidEmail: false,
		isDuplicated: false,
	});
	const [isLoading, setIsLoading] = useState(false);

	const isDisabled =
		errors.isEmpty ||
		errors.isInvalidEmail ||
		errors.isDuplicated ||
		!value ||
		isLoading;

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(value);

		if (!value.trim()) {
			setErrors({
				...errors,
				isEmpty: true,
				isInvalidEmail: false,
				isDuplicated: false,
			});
		} else if (!pattern.test(value.trim())) {
			setErrors({
				...errors,
				isEmpty: false,
				isInvalidEmail: true,
				isDuplicated: false,
			});
		} else {
			setErrors({
				...errors,
				isEmpty: false,
				isInvalidEmail: false,
				isDuplicated: false,
			});
		}
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Check duplicate
		const includedItem = todos.some((todo) => {
			return todo.name.trim() === value.trim();
		});

		if (includedItem) {
			setErrors({ ...errors, isDuplicated: true });
			setIsLoading(false);
			return;
		}

		// Call API
		await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: value.trim(),
				completed: false,
			}),
		})
			.then(async (res) => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				const newTodo = await res.json();
				setTodos((prevTodos) => [...prevTodos, newTodo]);
				setValue('');
				setIsLoading(false);
			})
			.catch((error) => {
				setErrors(error.message);
				setIsLoading(false);
			});
	};

	return (
		<form id="form-todo" onSubmit={handleFormSubmit}>
			<div>
				<input
					type="text"
					value={value}
					onChange={handleInputChange}
					placeholder="Enter your todo"
				/>

				{Object.entries(errors).map(
					([type, val], idx) =>
						val && <p key={idx} className="error">{(errorsMessage as any)[type]}</p>
				)}
			</div>
			<button type="submit" disabled={isDisabled}>
				Add
			</button>
		</form>
	);
};

export default TodoForm;
