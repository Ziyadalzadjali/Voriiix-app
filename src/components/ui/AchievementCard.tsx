import { View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/Text';
import type { HomeAchievement } from '@/data/types';
import { colors, space } from '@/theme';

export function AchievementCard({ achievement }: { achievement: HomeAchievement }) {
  return (
    <Card style={{ flex: 1, opacity: achievement.unlocked ? 1 : 0.55 }}>
      <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: achievement.unlocked ? colors.gold : colors.textDim }} />
      <AppText style={{ marginTop: space.sm }}>{achievement.title}</AppText>
      <AppText tone="dim" style={{ marginTop: 4, fontSize: 11, letterSpacing: 1.2 }}>
        {achievement.unlocked ? 'UNLOCKED' : 'LOCKED'}
      </AppText>
    </Card>
  );
}
