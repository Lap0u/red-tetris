import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import Lobby from '../../pages/lobbyPage';
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

describe('LobbyPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders and shows the Create Game button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Lobby user={{ id: 1, username: 'lol' }} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Create Game')).toBeTruthy();
  });
  it('Changes location when clicking the create game button', () => {
    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Lobby user={{ id: 1, username: 'lol' }} />
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      const button = getByText('Create Game');
      button.click();
    });
    // Assert whether the navigation has occurred
    expect(window.location.pathname).toBe('/');
  });
});
