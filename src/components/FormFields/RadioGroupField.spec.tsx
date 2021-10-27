import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import RadioGroupField from './RadioGroupField';

describe('RadioGroup', () => {
	const options = [
		{ label: 'Label 1', value: 'Value 1' },
		{ label: 'Label 2', value: 'Value 2' },
	];
	interface FormValues {
		fieldName: string;
	}
	test('RadioGroup field', async () => {
		const watchResult: unknown[] = [];

		const Component = () => {
			const { control, watch } = useForm<FormValues>({
				defaultValues: {
					fieldName: '',
				},
			});
			watchResult.push(watch());

			return (
				<div>
					<RadioGroupField
						label="Radio Group label"
						name="fieldName"
						control={control}
						options={options}
					/>
				</div>
			);
		};
		render(<Component />);

		expect(screen.getByText('Label 1')).toBeInTheDocument();
		expect(screen.getByText('Label 2')).toBeInTheDocument();

		await act(async () => {
			fireEvent.click(screen.getAllByRole('radio')[0]);
		});
		expect(watchResult).toEqual([{ fieldName: '' }, { fieldName: 'Value 1' }]);
		await act(async () => {
			fireEvent.click(screen.getAllByRole('radio')[1]);
		});
		console.log('watchResult', watchResult);
		expect(watchResult).toEqual([
			{ fieldName: '' },
			{ fieldName: 'Value 1' },
			{ fieldName: 'Value 2' },
		]);
	});
});
