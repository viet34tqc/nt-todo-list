import React, { InputHTMLAttributes, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';

interface RadioOption {
	label?: string;
	value: number | string;
}

interface RadioGroupFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	control: Control<any>;
	label?: string;
	options: RadioOption[];
}

const RadioGroupField = ({
	name,
	control,
	label,
	placeholder,
	options,
}: RadioGroupFieldProps) => {
	const {
		field: { value: defaultValue, onChange, onBlur },
		fieldState: { error },
	} = useController({ name, control });

	return (
		<>
			<Form.Label>{label}</Form.Label>
			{options.map(({ value, label }) => (
				<Form.Check
					key={value}
					id={label}
					label={label}
					name={name}
					value={value}
					checked={value === defaultValue}
					onChange={() => onChange(value)}
					onBlur={onBlur}
					type="radio"
				/>
			))}
			{error?.message && (
				<Form.Text className="text-muted">{error?.message}</Form.Text>
			)}
		</>
	);
};

export default RadioGroupField;
