import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { act } from 'react-dom/test-utils';
import NotFoundPage from '../../pages/404';

vi.mock('../fetch/getGame', () => ({
  __esModule: true,
  default: vi.fn(),
}));
vi.mock('../App', () => ({
  socket: {
    on: vi.fn(),
    emit: vi.fn(),
    off: vi.fn(),
  },
}));

describe('404', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the 404 page', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Page Not Found')).toBeTruthy();
  });
  it('navigates to homepage when button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NotFoundPage />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      const button = getByText('Return to homepage');
      button.click();
    });
    // Assert whether the navigation has occurred
    expect(window.location.pathname).toBe('/');
  });
});
