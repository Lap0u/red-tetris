import { describe, expect, it, vi } from 'vitest';
import getGame from '../../fetch/getGame';

const mockedAxios = vi.hoisted(() => ({
    get: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('getGame', () => {
    const id = 'gameId';
    const fetchUrl = `game/${id}`;

    it('should call the server API and return the game ID', async () => {
        // Mock the fetch function
        mockedAxios.get.mockResolvedValue({
            status: 200,
            data : { id },
        });

        // Call the getGame function
        const gameId = await getGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl)

        // Verify the returned game ID
        expect(gameId).toEqual(id);
    });

    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        mockedAxios.get.mockResolvedValue({
            status: 500,
        });

        // Call the getGame function
        const gameId = await getGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl)

        // Verify the returned game ID is null
        expect(gameId).toBeNull();
    });
});
