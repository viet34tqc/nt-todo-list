import { useEffect, useState } from 'react';
import { API_URL } from 'src/config/config';
import { Todo as TodoType } from 'src/models/todo';
import TodoForm from './Form';
import TodoList from './List';

const Todo = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [error, setError] = useState('');

	// Call API to get Todos
	useEffect(() => {
		(async function () {
			await fetch(API_URL)
				.then(async (res) => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					const todos: TodoType[] = await res.json();
					setTodos(todos);
				})
				.catch((error) => {
					setError(error.message);
				});
		})();
	}, [setTodos]);
	return (
		<main>
			<h1>Your todo list</h1>
			<>
				<TodoForm todos={todos} setTodos={setTodos} />
				<TodoList todos={todos} setTodos={setTodos} error={error} />
			</>
		</main>
	);
};

export default Todo;
