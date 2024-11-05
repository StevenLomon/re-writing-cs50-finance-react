import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders login page', () => {
  render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  );

  // Look for text in the Login component to confirm it rendered
  const loginText = screen.getByText(/Log In/i);
  expect(loginText).toBeInTheDocument();
});
