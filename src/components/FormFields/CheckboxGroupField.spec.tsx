import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import CheckboxGroupField from './CheckboxGroupField';

describe('CheckBoxGroup', () => {
	const options = [
		{ label: 'Label 1', value: 'Value 1' },
		{ label: 'Label 2', value: 'Value 2' },
	];
	interface FormValues {
		fieldName: string[];
	}
	test('should display options', async () => {
		const watchResult: unknown[] = [];

		const Component = () => {
			const { control, watch } = useForm<FormValues>({
				defaultValues: {
					fieldName: [],
				},
			});
			watchResult.push(watch());

			return (
				<div>
					<CheckboxGroupField
						label="Checkbox Group label"
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
			fireEvent.click(screen.getAllByRole('checkbox')[0]);
		});
		expect(watchResult).toEqual([
			{ fieldName: [] },
			{ fieldName: ['Value 1'] },
		]);
		await act(async () => {
			fireEvent.click(screen.getAllByRole('checkbox')[0]);
		});
		expect(watchResult).toEqual([
			{ fieldName: [] },
			{ fieldName: ['Value 1'] },
			{ fieldName: [] },
		]);
	});
});
