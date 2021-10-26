import React, { InputHTMLAttributes } from 'react';
import { Form } from 'react-bootstrap';
import { Control, useController } from 'react-hook-form';

interface TextAreaFieldProps extends InputHTMLAttributes<HTMLTextAreaElement> {
	name: string;
	control: Control<any>;
	label?: string;
}

const TextAreaField = ({
	name,
	control,
	label,
	placeholder
}: TextAreaFieldProps) => {
	const {
		field,
		fieldState: { error },
	} = useController({ name, control });
	return (
		<Form.Group className="mb-3" controlId="formBasicEmail">
			<Form.Label>{label}</Form.Label>
			<Form.Control as="textarea" {...field} rows={3} placeholder={placeholder}/>
			{error?.message && (
				<Form.Text className="text-muted">{error?.message}</Form.Text>
			)}
		</Form.Group>
	);
};

export default TextAreaField;
