export const fonts = {
  display: 'Anton_400Regular',
  heading: 'BarlowCondensed_800ExtraBold',
  headingSemi: 'BarlowCondensed_600SemiBold',
  body: 'Inter_400Regular',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_800ExtraBold',
  mono: 'Orbitron_700Bold',
} as const;

export const type = {
  hero: {
    fontFamily: fonts.display,
    fontSize: 42,
    letterSpacing: 0.4,
    lineHeight: 40,
    textTransform: 'uppercase' as const,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 26,
    letterSpacing: 0.3,
    lineHeight: 28,
    textTransform: 'uppercase' as const,
  },
  section: {
    fontFamily: fonts.heading,
    fontSize: 12,
    letterSpacing: 2.8,
    lineHeight: 16,
    textTransform: 'uppercase' as const,
  },
  body: { fontFamily: fonts.body, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fonts.bodySemi, fontSize: 12, letterSpacing: 0.3, lineHeight: 16 },
  xp: { fontFamily: fonts.mono, fontSize: 26, letterSpacing: 0.4, lineHeight: 30 },
} as const;
