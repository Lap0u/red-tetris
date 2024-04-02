import { User } from '../dto/User';

export const getOwnerName = (gameUserId: number, owners: User[]) => {
  const ownerIndex = owners.findIndex((owner) => owner.id === gameUserId);
  return owners[ownerIndex]?.username;
};
