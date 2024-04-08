import { describe, expect, it, vi } from 'vitest';
import getScore from '../../fetch/getScore';

const mockedAxios = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('getScore', () => {
  const id = 'userId';
  const fetchUrl = `score`;

  it('should call the server API and return the score ID', async () => {
    // Mock the fetch function
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: { id },
    });

    // Call the getScore function
    const score = await getScore();

    // Verify the fetch function was called with the correct arguments
    expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl);

    // Verify the returned user ID
    expect(score.id).toEqual(id);
  });

  it('should throw an error for server API failure', async () => {
    // Mock the fetch function to simulate a server error
    mockedAxios.get.mockResolvedValue({
      status: 500,
    });

    // Call the getScore function
    const score = await getScore();

    // Verify the fetch function was called with the correct arguments
    expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl);

    // Verify the returned user ID is null
    expect(score).toBeNull();
  });
});
