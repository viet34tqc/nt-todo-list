import { yupResolver } from '@hookform/resolvers/yup';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import todoApi from 'src/api/todoApi';
import { Todo } from 'src/models/todo';
import { todoSchema } from 'src/validation/todoSchema';
import './styles/TodoForm.scss';

interface TodoFormProps {
	todos: Todo[];
	setTodos: Dispatch<SetStateAction<Todo[]>>;
}

interface TodoFormInputs {
	name: string;
}

const TodoForm = ({ todos, setTodos }: TodoFormProps) => {
	const {
		register,
		handleSubmit,
		setFocus,
		setError,
		setValue,
		formState: { errors },
	} = useForm<TodoFormInputs>({
		mode: 'onChange', // React Hook Form check validation on input change (default is onSubmit)
		resolver: yupResolver(todoSchema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const isDisabled = !!errors?.name?.message || isLoading;

	const onSubmit: SubmitHandler<TodoFormInputs> = async ({ name }) => {
		setIsLoading(true);

		// Check duplicate
		const includedItem = todos.some((todo) => {
			return todo.name.trim() === name.trim();
		});

		if (includedItem) {
			setError('name', {
				type: 'manual',
				message: 'Your item is already on the list',
			});
			setIsLoading(false);
			return;
		}

		// Call API
		try {
			const newTodo = await todoApi.add({
				name: name.trim(),
				completed: false,
			});
			setTodos((prevTodos) => [...prevTodos, newTodo]);
			setIsLoading(false);
			setFocus('name');
			setValue('name', '');
		} catch (error: any) {
			setIsLoading(false);
			setFocus('name');
		}
	};

	// Input focus on mount
	useEffect(() => {
		setFocus('name');
	}, [setFocus]);

	return (
		<form id="form-todo" onSubmit={handleSubmit(onSubmit)}>
			<div>
				<input
					{...register('name')}
					type="text"
					placeholder="Enter your todo"
				/>
				<p className="error">{errors?.name?.message}</p>
			</div>
			<button type="submit" disabled={isDisabled}>
				{isLoading ? 'Adding' : 'Add'}
			</button>
		</form>
	);
};

export default TodoForm;
