import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import PregamePage from '../../pages/pregamePage';
import store from '../../store/store';

vi.mock('../../fetch/getGame', () => ({
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

describe('PregamePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders and shows the Start Game button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PregamePage user={{ id: 1, username: 'lol' }} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Start Game')).toBeTruthy();
  });
});
