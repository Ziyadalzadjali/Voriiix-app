import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, View } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { colors, radius, space, type } from '@/theme';

export function BottomSheet({
  visible,
  title,
  onClose,
  children,
}: {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <RNModal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' }} onPress={onClose}>
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={{
            backgroundColor: colors.bgElevated,
            borderTopLeftRadius: radius.lg,
            borderTopRightRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: space.xl,
            gap: space.md,
          }}>
          <View style={{ alignSelf: 'center', width: 42, height: 4, borderRadius: 2, backgroundColor: colors.textDim }} />
          <AppText style={{ ...type.section, color: colors.textMuted }}>{title}</AppText>
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
