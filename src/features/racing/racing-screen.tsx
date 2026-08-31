import { View } from 'react-native';
import { router } from 'expo-router';

import { Button, Card, EmptyState, ErrorState, LoadingState, Screen, AppText } from '@/components/ui';
import { isPreviewData } from '@/data/source';
import type { RacingPathStep } from '@/data/types';
import { useRacingPage } from '@/features/racing/use-racing-page';
import { hrefs } from '@/navigation/hrefs';
import { colors, fonts, space, type } from '@/theme';

function hrefFor(step: RacingPathStep) {
  if (step.href === 'events') return hrefs.events;
  if (step.href === 'academy') return hrefs.academy;
  return hrefs.booking;
}

export function RacingScreen() {
  const { data, state, reload } = useRacingPage();

  if (state.kind === 'loading' && !data) {
    return <LoadingState label="LOADING PATH…" />;
  }

  return (
    <Screen>
      <AppText tone="muted" style={type.section}>
        {data?.kicker ?? 'Journey'}
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text }}>
        {data?.title ?? 'Champ'}{' '}
        <AppText style={{ ...type.hero, color: colors.gold }}>{data?.titleAccent ?? 'Drifter Path'}</AppText>
      </AppText>
      <AppText tone="muted">{data?.subtitle}</AppText>

      {isPreviewData() ? (
        <AppText tone="gold" style={type.caption}>
          From akacademy.online/push · standings and slots are not live
        </AppText>
      ) : null}

      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}

      {data ? (
        <>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
            {data.tags.map((tag) => (
              <View
                key={tag}
                style={{
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: colors.edge,
                  backgroundColor: colors.carbon,
                  paddingHorizontal: space.md,
                  paddingVertical: 6,
                }}>
                <AppText style={{ fontFamily: fonts.headingSemi, fontSize: 12, letterSpacing: 1.2, color: colors.steel }}>
                  {tag.toUpperCase()}
                </AppText>
              </View>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: space.sm }}>
            <View style={{ flex: 1 }}>
              <Button label="Get Started" onPress={() => router.push(hrefs.booking)} />
            </View>
            <View style={{ flex: 1 }}>
              <Button label="See Fun Den" variant="ghost" onPress={() => router.push(hrefs.funDen)} />
            </View>
          </View>

          <AppText tone="muted" style={type.section}>
            CHAMP DRIFTER PATH
          </AppText>
          {data.pathSteps.map((step) => (
            <Card key={step.id} accent={step.order === 1}>
              <View style={{ flexDirection: 'row', gap: space.md, alignItems: 'flex-start' }}>
                <AppText style={{ fontFamily: fonts.mono, color: colors.gold, fontSize: 18 }}>
                  {String(step.order).padStart(2, '0')}
                </AppText>
                <View style={{ flex: 1 }}>
                  <AppText style={{ ...type.title, color: colors.text }}>{step.title}</AppText>
                  <AppText tone="muted" style={{ marginTop: 4 }}>
                    {step.summary}
                  </AppText>
                  <View style={{ marginTop: space.md }}>
                    <Button
                      label={step.href === 'booking' ? 'Book this step' : 'Open'}
                      variant="ghost"
                      onPress={() => router.push(hrefFor(step))}
                    />
                  </View>
                </View>
              </View>
            </Card>
          ))}

          <AppText tone="muted" style={type.section}>
            VORIIX HEROS
          </AppText>
          {data.leaderboards.map((board) => (
            <Card key={board.id}>
              <AppText style={{ fontFamily: fonts.heading, letterSpacing: 1.6, color: colors.gold }}>
                {board.title.toUpperCase()}
              </AppText>
              {board.entries.length ? (
                board.entries.map((entry) => (
                  <AppText key={entry.id} style={{ marginTop: space.sm }}>
                    {entry.rank}. {entry.name}
                  </AppText>
                ))
              ) : (
                <EmptyState title={board.emptyLabel} body="Names appear when the server publishes standings." />
              )}
            </Card>
          ))}

          <AppText tone="muted" style={type.section}>
            {data.pillarsKicker.toUpperCase()}
          </AppText>
          <AppText style={{ ...type.title, color: colors.text }}>{data.pillarsTitle}</AppText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.md }}>
            {data.pillars.map((pillar) => (
              <Card key={pillar.id} style={{ width: '47%', flexGrow: 1 }}>
                <AppText style={{ ...type.title, color: colors.gold }}>{pillar.title}</AppText>
                <AppText tone="muted" style={{ marginTop: space.sm }}>
                  {pillar.summary}
                </AppText>
              </Card>
            ))}
          </View>

          <AppText tone="muted" style={type.section}>
            COMMON QUESTIONS
          </AppText>
          {data.faqs.map((faq) => (
            <Card key={faq.id}>
              <AppText style={{ fontFamily: fonts.bodyBold }}>{faq.question}</AppText>
              <AppText tone="muted" style={{ marginTop: space.sm }}>
                {faq.answer}
              </AppText>
            </Card>
          ))}

          <Card accent>
            <AppText style={{ ...type.title, color: colors.text }}>Ready to race?</AppText>
            <AppText tone="muted" style={{ marginVertical: space.md }}>
              {data.welcomeLine}
            </AppText>
            <AppText tone="dim" style={type.caption}>
              Welcome tokens are issued by the server, never by this app.
            </AppText>
            <View style={{ gap: space.sm, marginTop: space.md }}>
              <Button label="Join SR" onPress={() => router.push(hrefs.booking)} />
              <Button label="See live sim" variant="ghost" onPress={() => router.push(hrefs.booking)} />
            </View>
          </Card>
        </>
      ) : null}
    </Screen>
  );
}
