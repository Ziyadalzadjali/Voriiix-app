import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, View } from 'react-native';

import { colors, radius, space } from '@/theme';

export function Modal({
  visible,
  onClose,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: 'center',
          padding: space.xl,
        }}>
        <Pressable
          onPress={(event) => event.stopPropagation()}
          style={{
            backgroundColor: colors.surface,
            borderRadius: radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            padding: space.xl,
          }}>
          <View>{children}</View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}
