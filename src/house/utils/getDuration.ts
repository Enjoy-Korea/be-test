import { BadRequestException } from '@nestjs/common';

export const getDuration = (startDate: string, endDate: string): number => {
  const date1 = new Date(
    +startDate.slice(0, 4),
    +startDate.slice(4, 6),
    +startDate.slice(6, 8),
  );
  const date2 = new Date(
    +endDate.slice(0, 4),
    +endDate.slice(4, 6),
    +endDate.slice(6, 8),
  );
  const duration = Math.floor(
    (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24),
  );
  if (duration < 30) {
    throw new BadRequestException('비정상적인 요청');
  }
  return duration;
};
