import type { Href } from 'expo-router';

export const hrefs = {
  tabs: '/(app)/(tabs)' as Href,
  login: '/(auth)/login' as Href,
  register: '/(auth)/register' as Href,
  forgotPassword: '/(auth)/forgot-password' as Href,
  academy: '/(app)/academy' as Href,
  workshop: '/(app)/workshop' as Href,
  rewards: '/(app)/rewards' as Href,
  notifications: '/(app)/notifications' as Href,
  booking: '/(app)/booking' as Href,
  bookingConfirmation: '/(app)/booking-confirmation' as Href,
  qr: '/(app)/qr' as Href,
  profile: '/(app)/profile' as Href,
  settings: '/(app)/settings' as Href,
  racing: '/(app)/(tabs)/racing' as Href,
  market: '/(app)/(tabs)/market' as Href,
  funDen: '/(app)/(tabs)/fun-den' as Href,
  funScout: '/(app)/(tabs)/fun-scout' as Href,
  events: '/(app)/events' as Href,
};
