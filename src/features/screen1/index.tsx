import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Todo } from './todo';
import todoApi from './todoApi';

const Screen1 = () => {
	const { t } = useTranslation();
	const [todo, setTodo] = useState<Todo>();
	useEffect(() => {
		(async function () {
			try {
				const todo = await todoApi.get(1);
				setTodo(todo);
			} catch (error: any) {
				console.log(error.message);
			}
		})();
	}, []);

	return (
		<div>
			<h1>{t('screen1.title')}</h1>
			<div>Name: {todo?.title}</div>
			<Link data-testid="screen1-btn" to="/screen2">
				Go to screen 2
			</Link>
		</div>
	);
};

export default Screen1;
