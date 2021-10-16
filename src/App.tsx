import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import { API_URL } from './config/config';
import { Todo } from './models/todo';

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [error, setError] = useState('');

	// Call API to get Todos
	useEffect(() => {
		(async function () {
			await fetch(API_URL)
				.then(async (res) => {
					const todos: Todo[] = await res.json();
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
}

export default App;
