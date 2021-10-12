import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';
import { Todo } from './models/todo';

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	// Call API to get Todos
	useEffect(() => {
		(async function () {
			try {
				const res = await fetch(process.env.REACT_APP_API_URL || '');
				const todos: Todo[] = await res.json();
				setTodos(() => todos);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	return (
		<main>
			<h1>Your todo list</h1>

			<TodoForm setTodos={setTodos} />
			<TodoList todos={todos} />
		</main>
	);
}

export default App;
