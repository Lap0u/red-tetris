import { describe, expect, it, vi } from 'vitest';
import createUser from '../../fetch/createUser';

describe('createUser', () => {
    const username = 'testUser';
    const socketId = '12345678';
    const fetchUrl = 'http://localhost:3333/user/create'
    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, socketId }),
    };

    it('should call the server API and return the user data', async () => {
        // Mock the fetch function
        const mockFetch = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 123, username: 'testUser' }),
        });
        global.fetch = mockFetch;

        // Call the createUser function
        const userData = await createUser(username, socketId);

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned user data
        expect(userData).toEqual({ id: 123, username: 'testUser' });
    });
    it('socketId should be undefined', async () => {
        // Call the createUser function
        const userData = await createUser(username, undefined);

        // Verify the returned game ID is null
        expect(userData).toBeNull();
    });
    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        const mockFetch = vi.fn().mockResolvedValue({
            ok: false,
        });
        global.fetch = mockFetch;

        // Call the createUser function
        const userData = await createUser(username, socketId);

        // Verify the fetch function was called with the correct arguments
        expect(mockFetch).toHaveBeenCalledWith(fetchUrl, fetchOptions);

        // Verify the returned user data is null
        expect(userData).toBeNull();
    });
});
