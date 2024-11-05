import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from './pages/Login';

test('renders login page', async () => {
  render(<Login />);

  // Print out the DOM to check if the button is actually rendered as expected
  screen.debug();

  // Look for a "Log In" button or link
  const loginButton  = await screen.findByRole('button', { name: /Log In/i }, { timeout: 2000 });
  expect(loginButton).toBeInTheDocument();
});
