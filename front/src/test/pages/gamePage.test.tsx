import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store/store';
import GamePage from '../../pages/gamePage';

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

describe('GamePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders and shows the Create Game button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <GamePage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Game')).toBeTruthy();
  });
});
