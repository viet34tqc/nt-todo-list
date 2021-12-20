import * as yup from 'yup';
export const schema = yup.object({
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
