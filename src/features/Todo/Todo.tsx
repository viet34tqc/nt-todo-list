import { useEffect, useState } from 'react';
import todoApi from 'src/api/todoApi';
import { Todo as TodoType } from 'src/models/todo';
import TodoForm from './Form';
import TodoList from './List';

const Todo = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [error, setError] = useState('');

	// Call API to get Todos
	useEffect(() => {
		(async function () {
			try {
				const todos: TodoType[] = await todoApi.getAll();
				setTodos(todos);
			} catch (error: any) {
				setError(error?.message || 'Cannot load data');
			}
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
