/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './core/i18n/i18n';
import './index.css';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
