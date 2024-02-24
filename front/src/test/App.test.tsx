import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../store/store';

// Mock external modules
vi.mock('js-cookie', () => ({
  __esModule: true, // This property tells Vitest that your mock should be treated as a module with ES module semantics.
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

vi.mock('./fetch/getUser', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('socket.io-client', () => ({
  io: vi.fn().mockReturnValue({
    on: vi.fn(),
    emit: vi.fn(),
  }),
}));

// Helper function to render the component with all necessary providers
const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

describe('App Component', () => {
  it('renders WelcomePage by default', async () => {
    renderApp();

    expect(screen.getByAltText('Tetris logo')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter your username')).toBeTruthy();
    expect(screen.getByText("Enter tetris' world")).toBeTruthy();
  });
});
