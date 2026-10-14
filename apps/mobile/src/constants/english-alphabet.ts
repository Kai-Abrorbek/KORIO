import type { HangulCategory, HangulExample } from "@/types/hangul";

export interface EnglishLetter {
  id: string;
  char: string;
  uppercase: string;
  category: HangulCategory;
  name: string;
  koreanName: string;
  romanization: string;
  examples: HangulExample[];
}

// 미국 영어 기준. 글자 이름과 단어 속 대표 소리는 서로 다르다.
// 소리 예시는 입문용이며 철자 조합·강세에 따른 모든 변형을 뜻하지 않는다.
const LETTERS: readonly [
  uppercase: string,
  name: string,
  koreanName: string,
  nameIpa: string,
  examples: readonly [sound: string, word: string, wordIpa: string][],
][] = [
  [
    "A",
    "ay",
    "에이",
    "eɪ",
    [
      ["æ", "apple", "ˈæpəl"],
      ["eɪ", "cake", "keɪk"],
    ],
  ],
  [
    "B",
    "bee",
    "비",
    "biː",
    [
      ["b", "book", "bʊk"],
      ["b", "baby", "ˈbeɪbi"],
    ],
  ],
  [
    "C",
    "cee",
    "시",
    "siː",
    [
      ["k", "cat", "kæt"],
      ["s", "city", "ˈsɪti"],
    ],
  ],
  [
    "D",
    "dee",
    "디",
    "diː",
    [
      ["d", "dog", "dɔɡ"],
      ["d", "day", "deɪ"],
    ],
  ],
  [
    "E",
    "ee",
    "이",
    "iː",
    [
      ["ɛ", "egg", "ɛɡ"],
      ["iː", "me", "miː"],
    ],
  ],
  [
    "F",
    "ef",
    "에프",
    "ɛf",
    [
      ["f", "fish", "fɪʃ"],
      ["f", "five", "faɪv"],
    ],
  ],
  [
    "G",
    "gee",
    "지",
    "dʒiː",
    [
      ["ɡ", "go", "ɡoʊ"],
      ["dʒ", "giant", "ˈdʒaɪənt"],
    ],
  ],
  [
    "H",
    "aitch",
    "에이치",
    "eɪtʃ",
    [
      ["h", "hat", "hæt"],
      ["h", "hello", "həˈloʊ"],
    ],
  ],
  [
    "I",
    "eye",
    "아이",
    "aɪ",
    [
      ["ɪ", "in", "ɪn"],
      ["aɪ", "kite", "kaɪt"],
    ],
  ],
  [
    "J",
    "jay",
    "제이",
    "dʒeɪ",
    [
      ["dʒ", "jam", "dʒæm"],
      ["dʒ", "juice", "dʒuːs"],
    ],
  ],
  [
    "K",
    "kay",
    "케이",
    "keɪ",
    [
      ["k", "key", "kiː"],
      ["k", "king", "kɪŋ"],
    ],
  ],
  [
    "L",
    "el",
    "엘",
    "ɛl",
    [
      ["l", "leg", "lɛɡ"],
      ["l", "love", "lʌv"],
    ],
  ],
  [
    "M",
    "em",
    "엠",
    "ɛm",
    [
      ["m", "moon", "muːn"],
      ["m", "milk", "mɪlk"],
    ],
  ],
  [
    "N",
    "en",
    "엔",
    "ɛn",
    [
      ["n", "nose", "noʊz"],
      ["n", "night", "naɪt"],
    ],
  ],
  [
    "O",
    "oh",
    "오",
    "oʊ",
    [
      ["ɑ", "hot", "hɑt"],
      ["oʊ", "home", "hoʊm"],
    ],
  ],
  [
    "P",
    "pee",
    "피",
    "piː",
    [
      ["p", "pen", "pɛn"],
      ["p", "pig", "pɪɡ"],
    ],
  ],
  [
    "Q",
    "cue",
    "큐",
    "kjuː",
    [
      ["kw", "queen", "kwiːn"],
      ["kw", "quick", "kwɪk"],
    ],
  ],
  [
    "R",
    "ar",
    "아르",
    "ɑr",
    [
      ["r", "red", "rɛd"],
      ["r", "rain", "reɪn"],
    ],
  ],
  [
    "S",
    "ess",
    "에스",
    "ɛs",
    [
      ["s", "sun", "sʌn"],
      ["z", "rose", "roʊz"],
    ],
  ],
  [
    "T",
    "tee",
    "티",
    "tiː",
    [
      ["t", "top", "tɑp"],
      ["t", "ten", "tɛn"],
    ],
  ],
  [
    "U",
    "you",
    "유",
    "juː",
    [
      ["ʌ", "up", "ʌp"],
      ["juː", "cute", "kjuːt"],
    ],
  ],
  [
    "V",
    "vee",
    "브이",
    "viː",
    [
      ["v", "van", "væn"],
      ["v", "very", "ˈvɛri"],
    ],
  ],
  [
    "W",
    "double-u",
    "더블유",
    "ˈdʌbəl juː",
    [
      ["w", "water", "ˈwɔtər"],
      ["w", "we", "wiː"],
    ],
  ],
  [
    "X",
    "ex",
    "엑스",
    "ɛks",
    [
      ["ks", "box", "bɑks"],
      ["ɡz", "exam", "ɪɡˈzæm"],
    ],
  ],
  [
    "Y",
    "why",
    "와이",
    "waɪ",
    [
      ["j", "yes", "jɛs"],
      ["iː", "happy", "ˈhæpi"],
      ["aɪ", "my", "maɪ"],
    ],
  ],
  [
    "Z",
    "zee",
    "지",
    "ziː",
    [
      ["z", "zoo", "zuː"],
      ["z", "zero", "ˈzɪroʊ"],
    ],
  ],
];

export const ENGLISH_ALPHABET: readonly EnglishLetter[] = LETTERS.map(
  ([uppercase, name, koreanName, nameIpa, examples]) => ({
    id: `en-${uppercase.toLowerCase()}`,
    uppercase,
    char: `${uppercase}${uppercase.toLowerCase()}`,
    category: "AEIOU".includes(uppercase) ? "vowel" : "consonant",
    name,
    koreanName,
    romanization: `/${nameIpa}/`,
    examples: examples.map(([sound, word, wordIpa]) => ({
      sound: `/${sound}/`,
      word,
      romanization: `/${wordIpa}/`,
    })),
  }),
);
