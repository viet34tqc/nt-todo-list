import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import { API_URL } from './config/config';
import { useTodos } from './context/TodoContext';
import { Todo } from './models/todo';

function App() {
	const { setTodos } = useTodos();
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

	return (
		<main>
			<h1>Your todo list</h1>
			{!error && (
				<>
					<TodoForm />
					<TodoList />
				</>
			)}
		</main>
	);
}

export default App;
