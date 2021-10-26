import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import todoApi from '../../api/todoApi';
import { Todo } from '../../types/todo';

const Screen2 = () => {
	const [todo, setTodo] = useState<Todo>();

	useEffect(() => {
		(async function () {
			try {
				const todo = await todoApi.get(2);
				setTodo(todo);
			} catch (error: any) {
				console.log(error.message);
			}
		})();
	}, []);
	return (
		<div>
			<h1>This is screen 2</h1>
			<div>Name: {todo?.title}</div>
			<Link data-testid="screen2-btn" to="/">
				Back to screen 1
			</Link>
			<br />
			<Link to="/profile">Go to profile form</Link>
		</div>
	);
};

export default Screen2;
