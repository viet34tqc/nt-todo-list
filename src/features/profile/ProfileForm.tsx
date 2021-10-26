import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckboxGroupField from 'src/components/FormFields/CheckboxGroupField';
import InputField from 'src/components/FormFields/InputField';
import TextAreaField from 'src/components/FormFields/TextareaField';
import * as yup from 'yup';

interface ProfileFormInputs {
	fullname: string;
	username: string;
	email: string;
	about: string;
	password: string;
	newPassword: string;
	newPassword2: string;
	emailNoti: String[];
}

const defaultValues = {
	fullname: '',
	username: '',
	email: '',
	about: '',
	password: '',
	newPassword: '',
	newPassword2: '',
	emailNoti: ['blog'],
};

const ProfileForm = () => {
	const schema = yup.object({
		fullname: yup.string(),
		username: yup.string(),
		email: yup.string().email('Please enter valid email'),
		about: yup.string(),
		password: yup.string(),
		newPassword: yup.string(),
		newPassword2: yup.string(),
		emailNoti: yup.array().min(1, 'Please select at least one'),
	});
	const { handleSubmit, control } = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});
	const handleFormSubmit: SubmitHandler<ProfileFormInputs> = (formsValue) => {
		console.log('formsValue', formsValue);
	};
	return (
		<Container>
			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<InputField
					label="Full Name"
					name="fullname"
					control={control}
					placeholder="John Smith"
				/>
				<InputField
					label="User Name"
					name="username"
					control={control}
					placeholder="johnny.s"
				/>
				<InputField
					label="Email"
					name="email"
					control={control}
					type="email"
					placeholder="user@example.com"
				/>
				<InputField
					label="Current Password"
					name="password"
					control={control}
					type="password"
				/>
				<InputField
					label="New Password"
					name="newPassword"
					control={control}
					type="password"
				/>
				<InputField
					label="Confirm Password"
					name="newPassword2"
					control={control}
					type="password"
				/>
				<TextAreaField
					label="About"
					name="about"
					control={control}
					placeholder="My bio"
				/>
				<CheckboxGroupField
					name="emailNoti"
					label="Email Notifications"
					control={control}
					options={[
						{ label: 'Blog posts', value: 'blog' },
						{ label: 'Newsletter', value: 'newsletter' },
						{ label: 'Personal Offers', value: 'personal' },
					]}
				/>
				<Button variant="primary" type="submit">
					Submit
				</Button>
			</form>
		</Container>
	);
};

export default ProfileForm;
