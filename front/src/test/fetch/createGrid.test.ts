import { describe, expect, it, vi } from 'vitest';
import createGame from '../../fetch/createGame';
import createGrids from '../../fetch/createGrids';

const mockedAxios = vi.hoisted(() => ({
  post: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('createGrid', () => {
  const id = '456';
  const fetchUrl = 'grid/create';

  it('should call the server API and return the grid ID', async () => {
    // Mock the axios
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { id: id },
    });

    await createGrids(id);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${fetchUrl}`, {
      gameId: id,
    });
  });
  it('should throw an error due to wrong status code', async () => {
    // Mock the fetch function to simulate a server error
    mockedAxios.post.mockResolvedValue({
      status: 500,
      data: { id: id },
    });

    await createGrids(id);

    expect(mockedAxios.post).toHaveBeenCalledWith(`${fetchUrl}`, {
      gameId: id,
    });
  });
});
