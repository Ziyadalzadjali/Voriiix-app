import { View } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { AppText } from '@/components/ui/Text';
import { colors, space, type } from '@/theme';

export function ConfirmDialog({
  visible,
  title,
  body,
  confirmLabel,
  onConfirm,
  onClose,
}: {
  visible: boolean;
  title: string;
  body: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <AppText style={{ ...type.title, color: colors.text }}>{title}</AppText>
      <AppText tone="muted" style={{ marginTop: space.md }}>
        {body}
      </AppText>
      <View style={{ gap: space.sm, marginTop: space.xl }}>
        <Button label={confirmLabel} onPress={onConfirm} />
        <Button label="Cancel" variant="ghost" onPress={onClose} />
      </View>
    </Modal>
  );
}
