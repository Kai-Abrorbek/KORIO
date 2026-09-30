import { TopikAudio } from '../../../topik/schemas/topik-content.schema';

type AudioLine = [speaker: string, text: string];

const audio = (key: string, lines: AudioLine[]): TopikAudio => ({
  key,
  audioUrl: '',
  transcript: lines.map(([speaker, text]) => ({ speaker, text })),
  mockPlaybackLimit: 1,
  guidedPlaybackLimit: 3,
  guidedAutoRepeatCount: 2,
  speechFallback: true,
});

// 제60회 TOPIK I B-홀수형 듣기 통합 대본 pp. 1–12.
// 원본 MP3는 문항별 클립으로 분리되지 않았으므로 대본 기반 TTS를 사용한다.
export const TOPIK_I_60_LISTENING_AUDIO: Record<string, TopikAudio> = {
  'topik-i-60-listening-01': audio('topik-i-60-listening-01', [
    ['남자', '사과가 맛있어요?'],
  ]),
  'topik-i-60-listening-02': audio('topik-i-60-listening-02', [
    ['여자', '오늘 학교에 가요?'],
  ]),
  'topik-i-60-listening-03': audio('topik-i-60-listening-03', [
    ['남자', '이거 어디에서 샀어요?'],
  ]),
  'topik-i-60-listening-04': audio('topik-i-60-listening-04', [
    ['여자', '지금 뭐 해요?'],
  ]),
  'topik-i-60-listening-05': audio('topik-i-60-listening-05', [
    ['남자', '생일 축하해요.'],
  ]),
  'topik-i-60-listening-06': audio('topik-i-60-listening-06', [
    ['여자', '민수 씨, 잘 가요.'],
  ]),
  'topik-i-60-listening-07': audio('topik-i-60-listening-07', [
    ['여자', '남자 옷은 어디 있어요?'],
    ['남자', '3층에 있습니다.'],
  ]),
  'topik-i-60-listening-08': audio('topik-i-60-listening-08', [
    ['남자', '모두 두 권입니까?'],
    ['여자', '네. 이 책 두 권 빌려 주세요.'],
  ]),
  'topik-i-60-listening-09': audio('topik-i-60-listening-09', [
    ['여자', '이거 한국 돈으로 바꾸고 싶어요.'],
    ['남자', '얼마나 바꿔 드릴까요?'],
  ]),
  'topik-i-60-listening-10': audio('topik-i-60-listening-10', [
    ['남자', '수미 씨, 5번 버스 왔어요.'],
    ['여자', '그럼 저 먼저 갈게요.'],
  ]),
  'topik-i-60-listening-11': audio('topik-i-60-listening-11', [
    ['남자', '방이 몇 개예요?'],
    ['여자', '두 개예요.'],
  ]),
  'topik-i-60-listening-12': audio('topik-i-60-listening-12', [
    ['여자', '저는 영화를 좋아해요. 민수 씨는요?'],
    ['남자', '저는 운동을 좋아해요.'],
  ]),
  'topik-i-60-listening-13': audio('topik-i-60-listening-13', [
    ['남자', '여기 일요일에 쉬어요?'],
    ['여자', '아니요. 저희는 월요일에 쉽니다.'],
  ]),
  'topik-i-60-listening-14': audio('topik-i-60-listening-14', [
    ['여자', '민수 씨는 계속 서울에 살았어요?'],
    ['남자', '네. 저는 서울에서 태어났어요.'],
  ]),
  'topik-i-60-listening-15': audio('topik-i-60-listening-15', [
    ['여자', '이 수박 얼마예요?'],
    ['남자', '만 원이에요. 하나 드릴까요?'],
  ]),
  'topik-i-60-listening-16': audio('topik-i-60-listening-16', [
    ['남자', '수미 씨, 늦어서 미안해요.'],
    ['여자', '아직 영화 시작 안 했어요. 들어가요.'],
  ]),
  'topik-i-60-listening-17': audio('topik-i-60-listening-17', [
    ['여자', '민수 씨는 보통 저녁을 집에서 먹어요?'],
    ['남자', '네. 요리하는 걸 좋아해서 만들어서 먹어요. 수미 씨는요?'],
    ['여자', '저는 요리를 잘 못해요. 그래서 밖에서 자주 먹어요.'],
  ]),
  'topik-i-60-listening-18': audio('topik-i-60-listening-18', [
    ['남자', '저, 어머니 선물을 좀 사려고 하는데요.'],
    ['여자', '이 티셔츠는 어떠세요?'],
    ['남자', '예쁘네요. 그걸로 주세요. 얼마예요?'],
    ['여자', '삼만 원입니다.'],
  ]),
  'topik-i-60-listening-19': audio('topik-i-60-listening-19', [
    ['남자', '수미 씨, 어제는 왜 학교에 안 왔어요?'],
    ['여자', '몸이 안 좋아서 집에 있었어요.'],
    ['남자', '그랬어요? 지금은 괜찮아요?'],
    ['여자', '네, 푹 쉬어서 이제 괜찮아요.'],
  ]),
  'topik-i-60-listening-20': audio('topik-i-60-listening-20', [
    ['여자', '민수 씨, 회의 준비 다 했어요?'],
    ['남자', '네, 조금 전에 다 했습니다.'],
    ['여자', '그럼 지금 회의 시작할까요?'],
    ['남자', '네. 회의실로 가겠습니다.'],
  ]),
  'topik-i-60-listening-21': audio('topik-i-60-listening-21', [
    ['여자', '오랜만에 미술관에 오니까 좋네요. 같이 와 줘서 고마워요.'],
    ['남자', '아니에요. 저도 오고 싶었어요.'],
    [
      '여자',
      '그런데 혹시 그림을 배운 적이 있어요? 그림을 잘 아는 것 같아서요.',
    ],
    ['남자', '아니요. 그림을 좋아해서 평소에 많이 봐요.'],
  ]),
  'topik-i-60-listening-22': audio('topik-i-60-listening-22', [
    ['남자', '수미 씨는 회사에 차를 안 가지고 다녀요?'],
    ['여자', '네. 저는 지하철로 다녀요.'],
    ['남자', '운전해서 다니는 게 편하지 않아요?'],
    ['여자', '아니요. 길이 막혀서 지하철을 타는 게 편해요.'],
  ]),
  'topik-i-60-listening-23': audio('topik-i-60-listening-23', [
    ['남자', '손님, 두 분이세요? 저기 안쪽 자리 어떠세요?'],
    ['여자', '창문 쪽은 오래 기다려야 돼요?'],
    ['남자', '30분 정도 기다리셔야 합니다.'],
    ['여자', '그럼 기다릴게요. 창문 밖 경치가 좋아서요.'],
  ]),
  'topik-i-60-listening-24': audio('topik-i-60-listening-24', [
    ['여자', '우리 여행 가서 뭐 할까요? 이제 계획을 세워야죠.'],
    ['남자', '가서 정하는 게 어때요? 다 정하고 가면 재미가 없을 것 같아요.'],
    ['여자', '그렇지만 미리 계획을 하고 가면 시간을 잘 쓸 수 있잖아요.'],
    ['남자', '거기에 가서 알아보면 더 좋은 곳이 있을 수도 있어요.'],
  ]),
  'topik-i-60-listening-25-26': audio('topik-i-60-listening-25-26', [
    [
      '여자',
      '학생회에서 알립니다. 다음 주 금요일에 열리는 ‘동아리 발표회’ 행사가 올해는 체육관에서 열립니다. 작년보다 많은 동아리가 신청을 해서 발표회를 체육관에서 하게 되었습니다. 학생회관으로 가지 마시고, 체육관으로 와 주시기 바랍니다. 재미있는 공연도 볼 수 있으니까 많이 와 주세요. 감사합니다.',
    ],
  ]),
  'topik-i-60-listening-27-28': audio('topik-i-60-listening-27-28', [
    ['남자', '나도 운동 좀 해야 하는데……. 수미 씨는 요즘 무슨 운동 하세요?'],
    ['여자', '저는 인터넷으로 요가 수업을 듣고 있는데, 생각보다 괜찮아요.'],
    ['남자', '아, 인터넷으로 운동을 하면 집에서 할 수 있으니까 좋겠네요.'],
    ['여자', '네. 그리고 어려우면 화면을 멈추고 자세히 볼 수 있어서 좋아요.'],
    ['남자', '필요하면 다시 봐도 되고요.'],
    ['여자', '맞아요. 또 시간이 없으면 밤늦게 하거나 아침 일찍 해도 돼요.'],
  ]),
  'topik-i-60-listening-29-30': audio('topik-i-60-listening-29-30', [
    ['여자', '작가님의 책이 외국인들에게 인기가 많습니다. 어떤 책인가요?'],
    [
      '남자',
      '한국인의 재미있는 생활 모습에 대한 책이에요. 방에 신발을 벗고 들어가거나 음식을 자를 때 가위를 사용하는 것처럼요.',
    ],
    ['여자', '그런데 어떻게 이런 책을 쓰셨어요?'],
    [
      '남자',
      '제가 호텔에서 일했는데, 그때 외국 손님들이 한국에 대한 질문을 많이 했어요. 그래서 이런 책을 생각하게 됐죠.',
    ],
    ['여자', '그렇군요. 두 번째 책도 준비하고 계세요?'],
    [
      '남자',
      '네. 외국인들에게 알려 주고 싶은 것이 아직 많아요. 이번에는 한국의 아름다운 장소를 소개하는 책을 써 보려고요.',
    ],
  ]),
};
