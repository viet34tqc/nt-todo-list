import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
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
	emailNoti: string[];
}

const defaultValues = {
	fullname: '',
	username: '',
	email: '',
	about: '',
	password: '',
	newPassword: '',
	newPassword2: '',
	emailNoti: [],
};

function transformProfileValue(key: string, value: string | string[]) {
	if (key !== 'emailNoti') {
		return value;
	}
	return Array.isArray(value) && value.join(', ');
}

const ProfileForm = () => {
	const [data, setData] = useState<ProfileFormInputs>(defaultValues);
	const schema = yup.object({
		fullname: yup.string(),
		username: yup.string(),
		email: yup
			.string()
			.email('Please enter valid email')
			.required('Please enter your email'),
		about: yup.string(),
		password: yup.string(),
		newPassword: yup.string(),
		newPassword2: yup.string(),
		emailNoti: yup.array().min(1, 'Please select at least one'),
	});
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});
	const handleFormSubmit: SubmitHandler<ProfileFormInputs> = (formsValue) => {
		setData({ ...data, ...formsValue });
	};
	return (
		<Container>
			<h1>Profile Form</h1>

			<form onSubmit={handleSubmit(handleFormSubmit)}>
				<Row>
					<Col>
						<InputField
							label="Full Name"
							name="fullname"
							control={control}
							placeholder="John Smith"
						/>
					</Col>
					<Col>
						<InputField
							label="User Name"
							name="username"
							control={control}
							placeholder="johnny.s"
						/>
					</Col>
				</Row>
				<InputField
					label="Email"
					name="email"
					control={control}
					placeholder="user@example.com"
				/>
				<TextAreaField
					label="About"
					name="about"
					control={control}
					placeholder="My bio"
				/>
				<Row>
					<Col sm={6}>
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
					</Col>
					<Col sm={{ span: 5, offset: 1 }}>
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
					</Col>
					<Col>
						<Button variant="primary" type="submit" disabled={isSubmitting}>
							Save Change
						</Button>
						{data.email && (
							<>
								<div style={{ marginTop: '20px' }}>Your submitted data is:</div>
								<ul>
									{Object.entries(data).map(([key, value]) => (
										<li key={key}>
											{key}: {transformProfileValue(key, value)}
										</li>
									))}
								</ul>
							</>
						)}
					</Col>
				</Row>
			</form>
		</Container>
	);
};

export default ProfileForm;
