import { describe, expect, it, vi } from 'vitest';
import getAvailableGames from '../../fetch/getAvailableGames';

describe('getAvailableGames', () => {
    const fetchUrl = 'http://localhost:3333/game/available';
    const fetchOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    it('should call the server API and return the available games data', async () => {
        // Mock the fetch function
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ game1: 'Game 1', game2: 'Game 2' }),
        });
        global.fetch = mockFetch;

        // Call the getAvailableGames function
        const availableGamesData = await getAvailableGames();

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned available games data
        expect(availableGamesData).toEqual({ game1: 'Game 1', game2: 'Game 2' });
    });

    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
        });
        global.fetch = mockFetch;

        // Call the createUser function
        const availableGamesData = await getAvailableGames();

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned user data is null
        expect(availableGamesData).toBeNull();
    });
});