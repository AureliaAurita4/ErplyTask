import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import userReducer from './store/reducers';

const mock = new MockAdapter(axios);

const renderWithProviders = (ui: React.ReactElement) => {
  const store = configureStore({ reducer: { user: userReducer } });
  return render(
    <Provider store={store}>
      {ui}
    </Provider>
  );
};

test('integration test for the application', async () => {
  const articles = [
    { title: 'Test Article', description: 'Description of the test article', url: 'https://example.com' }
  ];
  mock.onGet(/top-headlines/).reply(200, { articles });

  renderWithProviders(<App />);

  expect(screen.getByText('Log in')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByLabelText('API Token'), { target: { value: 'test-token' } });
  fireEvent.click(screen.getByRole('button', { name: 'Login' }));

  await waitFor(() => expect(screen.getByText('Fresh News')).toBeInTheDocument());

  expect(screen.getByText('Test Article')).toBeInTheDocument();
  expect(screen.getByText('Description of the test article')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

  await waitFor(() => expect(screen.getByText('Log in')).toBeInTheDocument());
});
