import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Highscore from '../../pages/highscorePage';
import { act } from 'react-dom/test-utils';

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

describe('Highscore', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders and shows the highscores button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Highscore />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Highscores')).toBeTruthy();
  });
  it('navigates to lobby when button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Highscore />
        </BrowserRouter>
      </Provider>
    );
    act(() => {
      const button = getByText('Return to Lobby');
      button.click();
    });
    // Assert whether the navigation has occurred
    expect(window.location.pathname).toBe('/');
  });
});
