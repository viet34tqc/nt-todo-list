import { useEffect, useState } from 'react';
import todoApi from 'src/api/todoApi';
import { Todo as TodoType } from 'src/models/todo';
import TodoFilter from './Filter';
import TodoForm from './Form';
import TodoList from './List';

const Todo = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);
	const [filter, setFilter] = useState('all');
	const [error, setError] = useState('');

	// Call API to get Todos
	useEffect(() => {
		(async function () {
			try {
				const todos: TodoType[] = await todoApi.getAll();
				setTodos(todos);
			} catch (error: any) {
				setError(error?.response?.data?.message || 'Cannot get data');
			}
		})();
	}, [setTodos]);

	const todoList = todos.filter((todo) => {
		if (filter === 'completed') {
			return todo.completed;
		} else if (filter === 'incompleted') {
			return !todo.completed;
		}
		return todo;
	});

	return (
		<main>
			<h1>Your todo list</h1>
			<>
				<TodoForm todos={todos} setTodos={setTodos} />
				<TodoFilter onFilter={setFilter} />
				<TodoList todos={todoList} setTodos={setTodos} error={error} />
			</>
		</main>
	);
};

export default Todo;
