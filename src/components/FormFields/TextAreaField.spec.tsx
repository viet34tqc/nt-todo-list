import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import TextareaField from './TextareaField';

describe('Textarea', () => {
	interface FormValues {
		fieldName: string;
	}
	test('Textarea field', async () => {
		const Component = () => {
			const { control } = useForm<FormValues>({
				defaultValues: {
					fieldName: '',
				},
			});

			return (
				<div>
					<TextareaField
						label="Textarea field label"
						name="fieldName"
						control={control}
					/>
				</div>
			);
		};
		render(<Component />);

		expect(screen.getByText('Textarea field label')).toBeInTheDocument();

		await act(async () => {
			fireEvent.input(screen.getByRole('textbox'), {
				target: { value: 'abcd' },
			});
		});
		expect(screen.getByRole('textbox')).toHaveValue('abcd')
	});
});
