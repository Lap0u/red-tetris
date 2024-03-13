import { describe, expect, it, vi } from 'vitest';
import getUser from '../../fetch/getUser';

const mockedAxios = vi.hoisted(() => ({
  get: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('getUser', () => {
  const id = 'userId';
  const fetchUrl = `user/${id}`;

  it('should call the server API and return the user ID', async () => {
    // Mock the fetch function
    mockedAxios.get.mockResolvedValue({
      status: 200,
      data: { id },
    });

    // Call the getUser function
    const user = await getUser(id);

    // Verify the fetch function was called with the correct arguments
    expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl)

    // Verify the returned user ID
    expect(user.id).toEqual(id);
  });

  it('should throw an error for server API failure', async () => {
    // Mock the fetch function to simulate a server error
    mockedAxios.get.mockResolvedValue({
      status: 500,
    });

    // Call the getUser function
    const user = await getUser(id);

    // Verify the fetch function was called with the correct arguments
    expect(mockedAxios.get).toHaveBeenCalledWith(fetchUrl)

    // Verify the returned user ID is null
    expect(user).toBeNull();
  });
});
