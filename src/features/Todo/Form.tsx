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
import './styles/TodoForm.scss';

const errorsMessage = {
	isEmpty: 'Please enter your todo item',
	isInvalidEmail: 'Please enter valid email address',
	isDuplicated: 'Your item is already on the list',
};

const pattern = new RegExp(
	/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

interface TodoFormProps {
	todos: Todo[];
	setTodos: Dispatch<SetStateAction<Todo[]>>;
}

const TodoForm = ({ todos, setTodos }: TodoFormProps) => {
	const [value, setValue] = useState('');
	const [errors, setErrors] = useState({
		isEmpty: false,
		isInvalidEmail: false,
		isDuplicated: false,
	});
	const [isLoading, setIsLoading] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

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
			setErrors(error.message);
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

				{Object.entries(errors).map(
					([type, val], idx) =>
						val && (
							<p key={idx} className="error">
								{(errorsMessage as any)[type]}
							</p>
						)
				)}
			</div>
			<button type="submit" disabled={isDisabled}>
				{isLoading ? 'Adding' : 'Add'}
			</button>
		</form>
	);
};

export default TodoForm;
