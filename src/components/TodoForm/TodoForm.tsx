import React, { ChangeEvent, FormEvent, useState } from 'react';
import { API_URL } from '../../config/config';
import { useTodos } from '../../context/TodoContext';

const errorMessage = {
	isEmpty: 'Please enter your todo item',
	isInvalidEmail: 'Please enter valid email address',
};

const TodoForm = () => {
	const { setTodos } = useTodos();
	const [value, setValue] = useState('');
	const [error, setError] = useState({
		isEmpty: false,
		isInvalidEmail: false,
	});

	const isDisabled = error.isEmpty || error.isInvalidEmail || !value;

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(value);

		const pattern = new RegExp(
			/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);

		if (!value.trim()) {
			setError({ ...error, isEmpty: true, isInvalidEmail: false });
		} else if (!pattern.test(value.trim())) {
			setError({ ...error, isEmpty: false, isInvalidEmail: true });
		} else {
			setError({ ...error, isEmpty: false, isInvalidEmail: false });
		}
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Call API
		await fetch(API_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: value,
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
			})
			.catch((error) => {
				setError(error.message);
			});
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<div>
				<input
					type="text"
					value={value}
					onChange={handleInputChange}
					placeholder="Enter your todo"
				/>
				{error.isEmpty && <p className="error">{errorMessage.isEmpty}</p>}
				{error.isInvalidEmail && (
					<p className="error">{errorMessage.isInvalidEmail}</p>
				)}
			</div>
			<input type="submit" value="Add" disabled={isDisabled} />
		</form>
	);
};

export default TodoForm;
