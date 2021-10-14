import TodoForm from './components/TodoForm/TodoForm';
import TodoList from './components/TodoList/TodoList';

function App() {
	return (
		<main>
			<h1>Your todo list</h1>
			<>
				<TodoForm />
				<TodoList />
			</>
		</main>
	);
}

export default App;
