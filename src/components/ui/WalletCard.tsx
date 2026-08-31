import { View } from 'react-native';

import { Card } from '@/components/ui/Card';
import { AppText } from '@/components/ui/Text';
import { XPBalance } from '@/components/ui/XPBalance';
import type { WalletBalances } from '@/data/types';
import { colors, fonts, space, type } from '@/theme';

export function WalletCard({ balances }: { balances: WalletBalances }) {
  return (
    <Card>
      <AppText tone="muted" style={{ ...type.section, marginBottom: space.md }}>
        XP TRADE
      </AppText>
      <View style={{ flexDirection: 'row', gap: space.md }}>
        <View style={{ flex: 1, gap: 2 }}>
          <AppText style={{ fontFamily: fonts.headingSemi, color: colors.bxp, fontSize: 11, letterSpacing: 1.4 }}>
            BRONZE
          </AppText>
          <XPBalance kind="BXP" value={balances.BXP} />
        </View>
        <View style={{ width: 1, backgroundColor: colors.edge }} />
        <View style={{ flex: 1, gap: 2 }}>
          <AppText style={{ fontFamily: fonts.headingSemi, color: colors.sxp, fontSize: 11, letterSpacing: 1.4 }}>
            SILVER
          </AppText>
          <XPBalance kind="SXP" value={balances.SXP} />
        </View>
        <View style={{ width: 1, backgroundColor: colors.edge }} />
        <View style={{ flex: 1, gap: 2 }}>
          <AppText style={{ fontFamily: fonts.headingSemi, color: colors.gxp, fontSize: 11, letterSpacing: 1.4 }}>
            GOLD
          </AppText>
          <XPBalance kind="GXP" value={balances.GXP} />
        </View>
      </View>
    </Card>
  );
}
