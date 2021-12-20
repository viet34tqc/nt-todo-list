import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CheckboxGroupField from 'src/components/FormFields/CheckboxGroupField';
import InputField from 'src/components/FormFields/InputField';
import TextAreaField from 'src/components/FormFields/TextareaField';
import LogoutButton from 'src/components/LogoutButton';
import { schema } from './validationSchema';

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
	const { t } = useTranslation();
	const [data, setData] = useState<ProfileFormInputs>(defaultValues);
	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = useForm({
		defaultValues,
		resolver: yupResolver(schema),
	});
	const handleFormSubmit: SubmitHandler<ProfileFormInputs> = formsValue => {
		setData({ ...data, ...formsValue });
	};
	return (
		<Container>
			<h1>{t('profile.title')}</h1>
			<LogoutButton />

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
