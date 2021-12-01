import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ProfileForm from '.';

describe('ProfileForm', () => {
	beforeEach(() => {
		render(<ProfileForm />);
	});

	test('should display required error when the value is empty', async () => {
		fireEvent.click(screen.getByRole('button', { name: /Save Change/ }));
		expect(
			await screen.findByText('Please enter your email')
		).toBeInTheDocument();
		expect(
			await screen.findByText('Please select at least one')
		).toBeInTheDocument();
	});
	test('should display error when the email is not valid', async () => {
		fireEvent.input(screen.getByPlaceholderText('user@example.com'), {
			target: { value: /email/ },
		});
		fireEvent.click(screen.getByRole('button', {name: /Save Change/}));
		expect(
			await screen.findByText('Please enter valid email')
		).toBeInTheDocument();
	});
	test('should not display error when values are valid', async () => {
		fireEvent.input(screen.getByPlaceholderText('user@example.com'), {
			target: { value: 'abc@gmail.com' },
		});
		fireEvent.click(screen.getByLabelText('Blog posts'));
		fireEvent.click(screen.getByRole('button', { name: /Save Change/ }));
		await waitFor(() => {
			expect(
				screen.queryByText('Please enter valid email')
			).not.toBeInTheDocument();
			expect(
				screen.queryByText('Please enter your email')
			).not.toBeInTheDocument();
			expect(
				screen.queryByText('Please select at least one')
			).not.toBeInTheDocument();
		});

		expect(await screen.findByText(/abc@gmail\.com/)).toBeInTheDocument();
		expect(await screen.findByText(/blog/)).toBeInTheDocument();
	});
});
