import { Redirect } from 'expo-router';

import { LoadingState } from '@/components/ui';
import { useAuth } from '@/features/auth/use-auth';
import { hrefs } from '@/navigation/hrefs';

export default function Index() {
  const { ready, session } = useAuth();

  if (!ready) {
    return <LoadingState />;
  }

  if (!session) {
    return <Redirect href={hrefs.login} />;
  }

  return <Redirect href={hrefs.tabs} />;
}
