import * as yup from 'yup';

export const todoSchema = yup.object({
	name: yup
		.string()
		.trim()
		.email('Please enter valid email address')
		.required('Please enter your todo item'),
});
