import { map, pipe, range, toArray } from '@fxts/core';
import { House } from '../../src/entities';

export const houseFakers = pipe(
  range(10),
  map(
    (i) =>
      new House(
        '산포리 펜션',
        '입실/퇴실 시간\n ㅁ 입실시간 : 오후 3시 ~ 오후 10시\n ㅁ 퇴실시간 : 익일 오전 11시 까지\n ㅁ 오후 10시 이후의 입실은 미리 연락부탁드립니다.',
        '경상북도 울진군 근남면 세포2길 1-21',
        '펜션',
        30000,
        '울진대학교',
        i + 1 + '',
      ),
  ),
  toArray,
);
