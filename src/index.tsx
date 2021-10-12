import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TodoContextProvider from './context/TodoContext';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<TodoContextProvider>
			<App />
		</TodoContextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
