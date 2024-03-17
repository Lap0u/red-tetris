import { describe, expect, it, vi } from 'vitest';
import getAvailableGames from '../../fetch/getAvailableGames';

const mockedAxios = vi.hoisted(() => ({
    get: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('getAvailableGames', () => {
    const fetchUrl = 'game/available';

    it('should call the server API and return the available games data', async () => {
        // Mock the fetch function
        mockedAxios.get.mockResolvedValue({
            status: 200,
            data : { game1: 'Game 1', game2: 'Game 2' },
        });

        // Call the getAvailableGames function
        const availableGamesData = await getAvailableGames();

        // Verify the fetch function was called with the correct arguments
        expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl)

        // Verify the returned available games data
        expect(availableGamesData).toEqual({ game1: 'Game 1', game2: 'Game 2' });
    });

    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        mockedAxios.get.mockResolvedValue({
            status: 500,
        });

        // Call the createUser function
        const availableGamesData = await getAvailableGames();

        // Verify the fetch function was called with the correct arguments
        expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl)

        // Verify the returned user data is null
        expect(availableGamesData).toBeNull();
    });
});