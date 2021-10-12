import {
	createContext,
	Dispatch,
	FC,
	SetStateAction,
	useContext,
	useState,
} from 'react';
import { Todo } from '../models/todo';

interface ITodoContext {
	todos: Todo[];
	setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoContext = createContext<ITodoContext | null>(null);

const TodoContextProvider: FC = ({ children }) => {
	const [todos, setTodos] = useState<Todo[]>([]);

	return (
		<TodoContext.Provider value={{ todos, setTodos }}>
			{children}
		</TodoContext.Provider>
	);
};

export default TodoContextProvider;

export const useTodos = () => {
	const context = useContext(TodoContext) as ITodoContext;
	if (context === undefined) {
		throw new Error('useSomething must be used within a SomethingProvider');
	}
	return context;
};
