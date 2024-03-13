import { describe, expect, it, vi } from 'vitest';
import createGame from '../../fetch/createGame';

const mockedAxios = vi.hoisted(() => ({
    post: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('createGame', () => {
    const id = 456;
    const fetchUrl = 'game/new'

    it('should call the server API and return the game ID', async () => {
        // Mock the axios
        mockedAxios.post.mockResolvedValue({
            status: 200,
            data: { id: id },
        });

        const gameId = await createGame(id);

        expect(mockedAxios.post).toHaveBeenCalledWith(`${fetchUrl}`, { userId: id });
        expect(gameId).toStrictEqual(id);
    });
    it('should throw an error due to wrong status code', async () => {
        // Mock the fetch function to simulate a server error
        mockedAxios.post.mockResolvedValue({
          status: 500,
          data: { id: id },
      });

        // Call the createGame function
        const gameId = await createGame(id);

        // Verify the fetch function was called with the correct arguments
        expect(mockedAxios.post).toHaveBeenCalledWith(`${fetchUrl}`, { userId: id });

        // Verify the returned game ID is null
        expect(gameId).toBeNull();
    });

});
