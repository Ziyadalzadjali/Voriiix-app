import { Button, ErrorState, LoadingState, Screen, AppText, WalletCard } from '@/components/ui';
import { isPreviewData } from '@/data/source';
import { useHomeDashboard } from '@/features/home/use-home-dashboard';
import { hrefs } from '@/navigation/hrefs';
import { colors, type } from '@/theme';
import { router } from 'expo-router';

export function WalletScreen() {
  const { data, state, reload } = useHomeDashboard();

  if (state.kind === 'loading' && !data) {
    return <LoadingState />;
  }

  return (
    <Screen>
      <AppText tone="accent" style={type.section}>
        WALLET
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>XP</AppText>
      <AppText tone="muted">BXP, SXP and GXP are server-authoritative. The client cannot change a balance.</AppText>
      {isPreviewData() ? (
        <AppText tone="gold" style={type.caption}>
          Development preview · not live balances
        </AppText>
      ) : null}
      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}
      {data ? <WalletCard balances={data.wallet} /> : null}
      <Button label="XP PACKAGES" variant="ghost" onPress={() => router.push(hrefs.rewards)} />
    </Screen>
  );
}
