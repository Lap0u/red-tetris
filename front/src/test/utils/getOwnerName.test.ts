import { describe, expect, it } from 'vitest';
import { getOwnerName } from '../../utils/getOwnerName';

describe('getOwnerName', () => {
  it('should find the owner in the array', () => {
    const user = { id: 1, username: 'user1' };
    const owners = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ];
    const ownerName = getOwnerName(user.id, owners);
    expect(ownerName).toBe('user1');
  });

  it('should return undefined cause user does not exist', () => {
    const user = { id: 3, username: 'user3' };
    const owners = [
      { id: 1, username: 'user1' },
      { id: 2, username: 'user2' },
    ];
    const ownerName = getOwnerName(user.id, owners);
    expect(ownerName).toBe(undefined);
  });
});
