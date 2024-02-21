import { describe, expect, it, vi } from 'vitest';
import createGame from '../../fetch/createGame';

describe('createGame', () => {
    const id = 456;
    const fetchUrl = 'http://localhost:3333/game/new'
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: id }),
    };

    it('should call the server API and return the game ID', async () => {
        // Mock the fetch function
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 123 }),
        });
        global.fetch = mockFetch;

        // Call the createGame function
        const gameId = await createGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned game ID
        expect(gameId).toBe(123);
    });

    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
        });
        global.fetch = mockFetch;

        // Call the createGame function
        const gameId = await createGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned game ID is null
        expect(gameId).toBeNull();
    });

});
