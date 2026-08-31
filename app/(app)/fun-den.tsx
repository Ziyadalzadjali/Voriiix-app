import { DestinationScreen } from '@/features/shell/destination-screen';
import { hrefs } from '@/navigation/hrefs';
import { router } from 'expo-router';

export default function FunDenRoute() {
  return (
    <DestinationScreen
      kicker="FUN DEN"
      title="YALLA DRIFT"
      body="Fun Den is a VORIIX venue on the website. Sessions, slots and walk-ins are confirmed by the backend."
      actionLabel="Book a session"
      onAction={() => router.push(hrefs.booking)}
    />
  );
}
