import { describe, expect, it } from 'vitest';
import { AvailableGameSpeed } from '../../dto/AvailableGameSpeed';
import { handleGameSpeed } from '../../utils/handleGameSpeed';

describe('handleGameSpeed ', () => {
  it('should return the gamespeed', () => {
    const speed: AvailableGameSpeed = 'beginner';
    const res = handleGameSpeed(null, '12', 12, speed);
    expect(res).toBe(speed);
  });
});
