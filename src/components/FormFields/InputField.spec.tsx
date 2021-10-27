import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import InputField from './InputField';

describe('Input', () => {
	interface FormValues {
		fieldName: string;
	}
	test('Input field', async () => {
		const Component = () => {
			const { control } = useForm<FormValues>({
				defaultValues: {
					fieldName: '',
				},
			});

			return (
				<div>
					<InputField
						label="Input field label"
						name="fieldName"
						control={control}
					/>
				</div>
			);
		};
		render(<Component />);

		expect(screen.getByText('Input field label')).toBeInTheDocument();

		await act(async () => {
			fireEvent.input(screen.getByRole('textbox'), {
				target: { value: 'abcd' },
			});
		});
		expect(screen.getByRole('textbox')).toHaveValue('abcd')
	});
});
