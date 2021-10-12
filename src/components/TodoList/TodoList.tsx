import { useTodos } from '../../context/TodoContext';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.styles.scss';

const TodoList = () => {
	const { todos } = useTodos();
	if (!todos.length) {
		return <p>Loading...</p>;
	}
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} />
			))}
		</ul>
	);
};

export default TodoList;
