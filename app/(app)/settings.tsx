import { DestinationScreen } from '@/features/shell/destination-screen';

export default function SettingsRoute() {
  return (
    <DestinationScreen
      kicker="SETTINGS"
      title="CONTROL"
      body="Remote config, notification prefs and session security load from the backend. No secrets are stored in the mobile bundle."
    />
  );
}
