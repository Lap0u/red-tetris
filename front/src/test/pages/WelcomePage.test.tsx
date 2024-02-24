import { describe, expect, test } from 'vitest';
import WelcomePage from '../../pages/welcomePage';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { BrowserRouter } from 'react-router-dom';

describe('WelcomePage', () => {
  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WelcomePage user={null} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByAltText('Tetris logo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(screen.getByText("Enter tetris' world")).toBeTruthy();
  });

  test('updates username state on input change', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <WelcomePage user={null} />
        </BrowserRouter>
      </Provider>
    );
    const inputElement = screen.getByPlaceholderText('Enter your username');
    const testUsername = 'testUser';
    fireEvent.change(inputElement, { target: { value: testUsername } });
    const elem = screen.getByDisplayValue(testUsername);
    expect(inputElement).toEqual(elem);
  });
});
