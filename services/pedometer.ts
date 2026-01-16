import { Pedometer } from 'expo-sensors';

const AVERAGE_STEP_LENGTH = 0.7; // 平均歩幅（メートル）

export async function isPedometerAvailable(): Promise<boolean> {
  return await Pedometer.isAvailableAsync();
}

export function startPedometerTracking(
  callback: (steps: number, distance: number) => void
): { stop: () => void } {
  let totalSteps = 0;

  const subscription = Pedometer.watchStepCount((result) => {
    totalSteps += result.steps;
    const distance = totalSteps * AVERAGE_STEP_LENGTH;
    callback(totalSteps, distance);
  });

  return {
    stop: () => {
      subscription.remove();
    },
  };
}
