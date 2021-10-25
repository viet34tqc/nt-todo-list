import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import todoApi from '../../api/todoApi';
import { Todo } from '../../types/todo';

const Screen1 = () => {
	const [todo, setTodo] = useState<Todo>();
	useEffect(() => {
		(async function () {
			try {
				const todo: Todo = await todoApi.get();
				setTodo(todo);
			} catch (error: any) {
				console.log(error.message);
			}
		})();
	}, [setTodo]);

	return (
		<div>
			<h1>This is screen 1</h1>
			<div>Name: {todo?.title}</div>
			<Link to="/screen2">Go to screen 2</Link>
		</div>
	);
};

export default Screen1;
