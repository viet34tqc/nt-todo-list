import React, {
	ChangeEvent,
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from 'react';
import todoApi from 'src/api/todoApi';
import { Todo } from 'src/models/todo';
import { todoSchema } from 'src/validation/todoSchema';
import './styles/TodoForm.scss';

const errorsMessage = {
	isEmpty: 'Please enter your todo item',
	isInvalidEmail: 'Please enter valid email address',
	isDuplicated: 'Your item is already on the list',
};

interface TodoFormProps {
	todos: Todo[];
	setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoForm = ({ todos, setTodos }: TodoFormProps) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const isDisabled = !!error || !value || isLoading;

	const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(value);

		todoSchema
			.validate({ name: value }, { abortEarly: false })
			.then(() => {
				setError('');
			})
			.catch((error) => {
				setError(error?.message || '');
			});
	};

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		// Check duplicate
		const includedItem = todos.some((todo) => {
			return todo.name.trim() === value.trim();
		});

		if (includedItem) {
			setError('Your item is already on the list');
			setIsLoading(false);
			return;
		}

		// Call API
		try {
			const newTodo = await todoApi.add({
				name: value.trim(),
				completed: false,
			});
			setTodos((prevTodos) => [...prevTodos, newTodo]);
			setValue('');
			setIsLoading(false);
			inputRef?.current?.focus();
		} catch (error: any) {
			setError(error.message);
			inputRef?.current?.focus();
			setIsLoading(false);
		}
	};

	// Input focus on mount
	useEffect(() => {
		inputRef?.current?.focus();
	}, []);

	return (
		<form id="form-todo" onSubmit={handleFormSubmit}>
			<div>
				<input
					ref={inputRef}
					type="text"
					value={value}
					onChange={handleInputChange}
					placeholder="Enter your todo"
				/>
				<p className="error">{error}</p>
			</div>
			<button type="submit" disabled={isDisabled}>
				{isLoading ? 'Adding' : 'Add'}
			</button>
		</form>
	);
};

export default TodoForm;
