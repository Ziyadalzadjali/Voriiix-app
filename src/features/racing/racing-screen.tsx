import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';
import { router } from 'expo-router';

import { Button, Card, EmptyState, ErrorState, LoadingState, Screen, AppText } from '@/components/ui';
import { PUSH_PATHS } from '@/data/push/catalog';
import type { PushPath } from '@/data/push/types';
import type { RacingPathHref, RacingPathStep } from '@/data/types';
import { useRacingPage } from '@/features/racing/use-racing-page';
import { hrefs } from '@/navigation/hrefs';
import { colors, fonts, radius, space, type } from '@/theme';

function hrefFor(kind: RacingPathHref) {
  if (kind === 'events') return hrefs.events;
  if (kind === 'academy') return hrefs.academy;
  if (kind === 'funDen') return hrefs.funDen;
  return hrefs.booking;
}

function actionLabel(kind: RacingPathHref) {
  if (kind === 'events') return 'Open events';
  if (kind === 'academy') return 'Open academy';
  if (kind === 'funDen') return 'Open Fun Den';
  return 'Book this step';
}

export function RacingScreen() {
  const [path, setPath] = useState<PushPath>('yalla-drift');
  const { data, state, reload } = useRacingPage(path);

  if (state.kind === 'loading' && !data) {
    return <LoadingState label="SYNCING PATH…" />;
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

      <AppText tone="gold" style={type.caption}>
        Synced from akacademy.online/push only
      </AppText>
      {data?.syncWarning ? (
        <AppText tone="muted" style={type.caption}>
          {data.syncWarning}
        </AppText>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.sm }}>
        {PUSH_PATHS.map((item) => {
          const active = path === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setPath(item.id)}
              style={{
                borderRadius: radius.pill,
                borderWidth: 1,
                borderColor: active ? colors.gold : colors.edge,
                backgroundColor: active ? colors.carbon : colors.bgElevated,
                paddingHorizontal: space.md,
                paddingVertical: 8,
              }}>
              <AppText
                style={{
                  fontFamily: fonts.headingSemi,
                  fontSize: 12,
                  letterSpacing: 1.2,
                  color: active ? colors.gold : colors.steel,
                }}>
                {item.label.toUpperCase()}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {state.kind === 'error' ? <ErrorState message={state.message} onRetry={reload} /> : null}

      {data ? (
        <>
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
            <PathCard key={step.id} step={step} />
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
                  <View
                    key={entry.id}
                    style={{
                      marginTop: space.sm,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: space.md,
                    }}>
                    <AppText style={{ flex: 1 }}>
                      {entry.rank}. {entry.name}
                    </AppText>
                    {entry.scoreLabel ? (
                      <AppText tone="gold" style={{ fontFamily: fonts.mono, fontSize: 12 }}>
                        {entry.scoreLabel}
                      </AppText>
                    ) : null}
                  </View>
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

function PathCard({ step }: { step: RacingPathStep }) {
  return (
    <Card accent={step.order === 1}>
      {step.imageUrl ? (
        <Image
          source={{ uri: step.imageUrl }}
          style={{ height: 120, borderRadius: radius.md, marginBottom: space.md, backgroundColor: colors.carbon }}
          resizeMode="cover"
        />
      ) : null}
      <View style={{ flexDirection: 'row', gap: space.md, alignItems: 'flex-start' }}>
        <AppText style={{ fontFamily: fonts.mono, color: colors.gold, fontSize: 18 }}>
          {String(step.order).padStart(2, '0')}
        </AppText>
        <View style={{ flex: 1 }}>
          <AppText style={{ ...type.title, color: colors.text }}>{step.title}</AppText>
          {step.summary ? (
            <AppText tone="muted" style={{ marginTop: 4 }}>
              {step.summary}
            </AppText>
          ) : null}
          {step.href ? (
            <View style={{ marginTop: space.md }}>
              <Button
                label={actionLabel(step.href)}
                variant="ghost"
                onPress={() => {
                  if (step.href) router.push(hrefFor(step.href));
                }}
              />
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
