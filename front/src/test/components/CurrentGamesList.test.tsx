import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../store/store';
import CurrentGamesList from '../../components/CurrentGamesList';
import getAvailableGames from '../../fetch/getAvailableGames';

vi.mock('../../fetch/getAvailableGames', () => ({
  __esModule: true,
  default: vi.fn(),
}));

const renderComponent = () =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CurrentGamesList />
      </BrowserRouter>
    </Provider>
  );

describe('CurrentGamesList', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();
  });

  it('displays no games available message when there are no games', async () => {
    // Mock getAvailableGames to return an empty array
    vi.mocked(getAvailableGames).mockResolvedValueOnce([]);
    renderComponent();
    expect(
      await screen.findByText('No games available currently')
    ).toBeTruthy();
  });
});
