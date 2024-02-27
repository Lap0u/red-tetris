export const getCellColor = (cell: number) => {
  switch (cell) {
    case 1:
      return 'bg-[#00FFFF]';
    case 2:
      return 'bg-[#FFFF00]';
    case 3:
      return 'bg-[#0000FF]';
    case 4:
      return 'bg-[#FFAA00]';
    case 5:
      return 'bg-[#9900FF]';
    case 6:
      return 'bg-[#FF0000]';
    case 7:
      return 'bg-[#00FF00]';
    case 8:
      return 'bg-[#FF00FF]';
    default:
      return 'bg-gray-500';
  }
};
