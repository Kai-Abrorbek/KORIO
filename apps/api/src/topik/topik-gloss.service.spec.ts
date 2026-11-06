import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

// 읽기 레슨 스키마는 jest 에서 데코레이터 타입을 못 읽는다 — 뜻보기 서비스는 가짜로 넣는다
jest.mock('../reading-lessons/reading-gloss.service', () => ({
  ReadingGlossService: class {},
}));

import { TopikGlossService } from './topik-gloss.service';
import { topikVisibleText } from './topik-visible-text.util';

const lean = <T>(value: T) => ({
  select: () => ({ lean: () => Promise.resolve(value) }),
});
const text = (value: string) => [
  {
    type: 'paragraph',
    segments: [{ type: 'text', text: value, key: '', label: '' }],
  },
];

describe('TOPIK 단어 뜻보기', () => {
  it('묶음이 화면에 보여 주는 글을 다 모은다 (지문·문제·보기·대본)', () => {
    const all = topikVisibleText(
      {
        sharedStimulus: {
          title: '안내문',
          blocks: text('도서관은 아홉 시에 문을 엽니다.'),
          bulletItems: ['주말 휴관'],
          infoItems: [{ label: '장소', value: '시청' }],
        } as never,
        sharedAudio: {
          transcript: [{ speaker: '여자', text: '우산이 있어요?' }],
        } as never,
      },
      [
        {
          prompt: text('알맞은 것을 고르십시오.') as never,
          choices: [{ text: '병원' }] as never,
        },
      ],
    );
    for (const piece of [
      '안내문',
      '도서관은',
      '주말 휴관',
      '시청',
      '우산이',
      '고르십시오',
      '병원',
    ]) {
      expect(all).toContain(piece);
    }
  });

  it('묶음 단위로 캐시 키를 만들어 기존 뜻보기 서비스에 넘긴다', async () => {
    const groupId = new Types.ObjectId();
    const questionModel = {
      findOne: jest.fn(() => lean({ groupId })),
      find: jest.fn(() =>
        lean([{ prompt: text('학교에서 공부해요.'), choices: [] }]),
      ),
    };
    const groupModel = {
      findById: jest.fn(() => lean({ sharedStimulus: null })),
    };
    const gloss = {
      word: '학교에서',
      lemma: '학교',
      pos: 'noun',
      meaning: { ko: '', uz: 'maktab', en: 'school', ru: '' },
      grammar: [],
    };
    const glossService = { resolve: jest.fn().mockResolvedValue(gloss) };
    const service = new TopikGlossService(
      groupModel as never,
      questionModel as never,
      glossService as never,
    );

    await expect(
      service.glossWord(new Types.ObjectId().toString(), '학교에서'),
    ).resolves.toEqual({ gloss });
    expect(glossService.resolve).toHaveBeenCalledWith(
      `topik:${groupId.toString()}`,
      '학교에서',
      expect.stringContaining('학교에서 공부해요.'),
    );
  });

  it('없는 문항은 404', async () => {
    const service = new TopikGlossService(
      {} as never,
      { findOne: jest.fn(() => lean(null)) } as never,
      {} as never,
    );
    await expect(service.glossWord('not-an-id', '단어')).rejects.toBeInstanceOf(
      NotFoundException,
    );
    await expect(
      service.glossWord(new Types.ObjectId().toString(), '단어'),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
