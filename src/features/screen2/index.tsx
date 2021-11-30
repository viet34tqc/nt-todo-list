import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Todo } from '../screen1/todo';
import todoApi from '../screen1/todoApi';

const Screen2 = () => {
	const { t } = useTranslation();

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
			<h1>{t('screen2.title')}</h1>

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
