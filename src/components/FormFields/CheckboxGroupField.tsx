import React, { InputHTMLAttributes, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';

interface CheckboxOption {
	label?: string;
	value: number | string;
}

interface CheckboxGroupFieldProps
	extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	control: Control<any>;
	label?: string;
	options: CheckboxOption[];
}

const CheckboxGroupField = ({
	name,
	control,
	label,
	placeholder,
	options,
}: CheckboxGroupFieldProps) => {
	const {
		field: { value: defaultValue, onChange, onBlur },
		fieldState: { error },
	} = useController({ name, control });

	const [checkedValues, setCheckedValues] = useState(defaultValue || []);

	const handleSelect = (checkedValue: string | number) => {
		const newValues = checkedValues?.includes(checkedValue)
			? checkedValues?.filter((name: string | number) => name !== checkedValue) // Uncheck
			: [...checkedValues, checkedValue]; // Check
		setCheckedValues(newValues);
		return newValues; // Submitted value
	};
	return (
		<>
			<Form.Label>{label}</Form.Label>
			{options.map(({ value, label }) => (
				<Form.Check
					key={value}
					id={label}
					label={label}
					name={name}
					checked={checkedValues.includes(value)}
					onChange={() => onChange(handleSelect(value))}
					onBlur={onBlur}
					type="checkbox"
				/>
			))}
			{error?.message && (
				<Form.Text className="text-muted">{error?.message}</Form.Text>
			)}
		</>
	);
};

export default CheckboxGroupField;
