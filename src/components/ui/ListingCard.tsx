import { Image, Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, fonts, space } from '@/theme';

export function ListingCard({
  title,
  sku,
  imageUrl,
  onPress,
}: {
  title: string;
  sku?: string;
  imageUrl?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}>
      <View
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          backgroundColor: '#111116',
          borderWidth: 1,
          borderColor: 'rgba(139, 92, 246, 0.35)',
        }}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={{ height: 140, width: '100%', backgroundColor: '#09090B' }} resizeMode="cover" />
        ) : (
          <View style={{ height: 140, backgroundColor: '#09090B' }} />
        )}
        <View style={{ padding: space.md, gap: 4 }}>
          {sku ? (
            <AppText style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.6, color: '#71717A' }}>
              {sku}
            </AppText>
          ) : null}
          <AppText style={{ fontFamily: fonts.mono, fontSize: 16, letterSpacing: 0.6, color: colors.text }}>
            {title.toUpperCase()}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}
