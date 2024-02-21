import { describe, expect, it, vi } from 'vitest';
import getGame from '../../fetch/getGame';

describe('getGame', () => {
    const id = 'gameId';
    const fetchUrl = `http://localhost:3333/game/${id}`;
    const fetchOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    it('should call the server API and return the game ID', async () => {
        // Mock the fetch function
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id }),
        });
        global.fetch = mockFetch;

        // Call the getGame function
        const gameId = await getGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned game ID
        expect(gameId).toEqual(id);
    });

    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
        });
        global.fetch = mockFetch;

        // Call the getGame function
        const gameId = await getGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned game ID is null
        expect(gameId).toBeNull();
    });
});
