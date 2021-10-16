import { Dispatch, SetStateAction } from 'react';
import { Todo } from '../../models/todo';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.styles.scss';

interface TodoListProps {
	todos: Todo[];
	setTodos: Dispatch<SetStateAction<Todo[]>>;
	error: string;
}

const TodoList = ({ todos, setTodos, error }: TodoListProps) => {
	if (!todos.length) {
		return <p>Loading...</p>;
	} else if (error) {
		return <p>{error}</p>;
	}
	return (
		<ul className="todo-list">
			{todos.map((todo) => (
				<TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
			))}
		</ul>
	);
};

export default TodoList;
