import React, { ChangeEvent } from 'react';
import './styles/TodoFilter.scss'

interface TodoFilterProps {
	onFilter: React.Dispatch<React.SetStateAction<string>>;
}

const TodoFilter = ({ onFilter }: TodoFilterProps) => {
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		onFilter(e.target.value);
	};
	return (
		<div className="todo-filter">
			<label className="form-control">
				<input
					className="form-control__input form-control__input--checkbox"
					type="radio"
					name="status"
					value="all"
					onChange={handleChange}
					defaultChecked
				/>
				<span className="form-control__label">All</span>
			</label>
			<label className="form-control">
				<input
					className="form-control__input form-control__input--checkbox"
					type="radio"
					name="status"
					value="completed"
					data-testid="filter-complete"
					onChange={handleChange}
				/>
				<span className="form-control__label">Completed</span>
			</label>
			<label className="form-control">
				<input
					className="form-control__input form-control__input--checkbox"
					type="radio"
					name="status"
					value="incompleted"
					data-testid="filter-incomplete"
					onChange={handleChange}
				/>
				<span className="form-control__label">Incompleted</span>
			</label>
		</div>
	);
};

export default TodoFilter;
