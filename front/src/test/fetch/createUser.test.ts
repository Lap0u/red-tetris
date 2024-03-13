import { describe, expect, it, vi } from 'vitest';
import createUser from '../../fetch/createUser';

const mockedAxios = vi.hoisted(() => ({
    post: vi.fn(),
}));

vi.mock('../../axios/axios', () => ({
  default: mockedAxios,
}));

describe('createUser', () => {
    const username = 'testUser';
    const socketId = '12345678';
    const fetchUrl = 'user/create'

    it('should call the server API and return the user data', async () => {
        // Mock the fetch function
        mockedAxios.post.mockResolvedValue({
            status: 200,
            data : { id: 123, username: 'testUser' },
        });

        // Call the createUser function
        const userData = await createUser(username, socketId);

        expect(mockedAxios.post).toHaveBeenCalledWith(`${fetchUrl}`, { username, socketId });

        // Verify the returned user data
        expect(userData).toEqual({ id: 123, username: 'testUser' });
    });
    it('socketId should be undefined', async () => {
        // Call the createUser function
        const userData = await createUser(username, undefined);

        // Verify the returned game ID is null
        expect(userData).toBeNull();
    });
    it('username should already exists', async () => {
        mockedAxios.post.mockResolvedValue({
            status: 409,
        });

        // Call the createUser function
        const userData = await createUser(username, socketId);

        // Verify the returned game ID is null
        expect(userData).toEqual({ message: 'Username already exists' });
    });
    it('should throw an error for server API failure', async () => {
        // Mock the fetch function to simulate a server error
        mockedAxios.post.mockResolvedValue({
            status: 500,
        });

        // Call the createUser function
        const userData = await createUser(username, socketId);

        expect(mockedAxios.post).toHaveBeenCalledWith(`${fetchUrl}`, { username, socketId });

        // Verify the returned user data is null
        expect(userData).toBeNull();
    });
});
