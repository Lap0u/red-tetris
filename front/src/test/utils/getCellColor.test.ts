import { describe, expect, it } from 'vitest';
import { getCellColor } from '../../utils/getCellColor';

describe('getCellColor', () => {
  it('should return correct color for each cell value', () => {
    const cellColors = [
      'bg-[#00FFFF]',
      'bg-[#FFFF00]',
      'bg-[#0000FF]',
      'bg-[#FFAA00]',
      'bg-[#9900FF]',
      'bg-[#FF0000]',
      'bg-[#00FF00]',
      'bg-[#FF00FF]',
      'bg-gradient-to-br from-[#FF00FF] via-gray-500 to-[#FF00FF]',
    ];

    for (let i = 1; i <= 9; i++) {
      const color = getCellColor(i);
      expect(color).toBe(cellColors[i - 1]);
    }
  });

  it('should return gray for invalid cell value', () => {
    const color = getCellColor(10);
    expect(color).toBe('bg-gray-500');
  });
});
