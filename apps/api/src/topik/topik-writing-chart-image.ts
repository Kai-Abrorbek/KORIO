import {
  TopikStimulus,
  TopikStimulusKind,
} from './schemas/topik-content.schema';

const chartRounds = new Set([35, 36, 37, 41, 47, 52, 60, 64, 83, 91, 96, 102]);

export function withTopikWritingChartImage(
  code: string,
  stimulus: TopikStimulus | null,
): TopikStimulus | null {
  if (
    !stimulus ||
    stimulus.kind !== TopikStimulusKind.CHART ||
    stimulus.imageUrl
  ) {
    return stimulus;
  }

  const match = /^topik-ii-writing-(\d+)-q53$/.exec(code);
  const round = Number(match?.[1]);
  if (!chartRounds.has(round)) return stimulus;

  return {
    ...stimulus,
    imageUrl: `/topik/writing/topik-ii-${round}-q53.png`,
  };
}
