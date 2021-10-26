import React, { InputHTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	name: string;
	control: Control<any>;
	label?: string;
}

const InputField = ({
	name,
	control,
	label,
	type,
	placeholder,
}: InputFieldProps) => {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control });
	return (
		<Form.Group className="mb-3">
			<Form.Label>{label}</Form.Label>
			<Form.Control {...field} type={type} placeholder={placeholder} />
			{error?.message && (
				<Form.Text className="text-muted">{error?.message}</Form.Text>
			)}
		</Form.Group>
	);
};

export default InputField;
