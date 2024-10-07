import { BadRequestException } from '@nestjs/common';

// export const parseAndValidateCount(count: number): number {
//     const parsedCount = parseInt(count.toString(), 10);
//     if (isNaN(parsedCount) || parsedCount < 0) {
//       throw new BadRequestException('Invalid count value');
//     }
//     return parsedCount;
//   }
export const toBoolean = (value: any) => {
  if (['true', true].includes(value)) return true;
  if (['false', false].includes(value)) return false;
  return false;
};
export const checkNan = (value: number) => {
  const parseAndNan = !isNaN(parseInt(value.toString()));
  return parseAndNan;
};
