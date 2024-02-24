import { describe, expect, it, vi } from 'vitest';
import getUser from '../../fetch/getUser';

describe('getUser', () => {
  const id = 'userId';
  const fetchUrl = `http://localhost:3333/user/${id}`;
  const fetchOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  it('should call the server API and return the user ID', async () => {
    // Mock the fetch function
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id }),
    });
    global.fetch = mockFetch;

    // Call the getUser function
    const userId = await getUser(id);

    // Verify the fetch function was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

    // Verify the returned user ID
    expect(userId).toEqual(id);
  });

  it('should throw an error for server API failure', async () => {
    // Mock the fetch function to simulate a server error
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
    });
    global.fetch = mockFetch;

    // Call the getUser function
    const userId = await getUser(id);

    // Verify the fetch function was called with the correct arguments
    expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

    // Verify the returned user ID is null
    expect(userId).toBeNull();
  });
});
