import { useState } from 'react';
import { Link } from 'expo-router';

import { Button, Screen, AppText, TextField } from '@/components/ui';
import { useAuth } from '@/features/auth/auth-context';
import { validateEmail } from '@/features/auth/validation';
import { hrefs } from '@/navigation/hrefs';
import { toUserMessage } from '@/lib/errors';
import { colors, space, type } from '@/theme';

export function ForgotPasswordScreen() {
  const { client } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function submit() {
    const nextError = validateEmail(email);
    if (nextError) {
      setFieldError(nextError);
      return;
    }
    setFieldError(null);
    setError(null);
    setLoading(true);
    try {
      await client.auth.requestPasswordReset({ email: email.trim() });
      setSent(true);
    } catch (cause) {
      setError(toUserMessage(cause));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <AppText style={{ ...type.hero, color: colors.text, marginTop: space.xl }}>RESET</AppText>
      <AppText tone="muted">If the account exists, a reset link is issued by the server.</AppText>
      <TextField label="EMAIL" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} error={fieldError} />
      {error ? <AppText tone="accent">{error}</AppText> : null}
      {sent ? <AppText tone="gold">Check your email for reset instructions.</AppText> : null}
      <Button label="SEND RESET" loading={loading} onPress={submit} />
      <Link href={hrefs.login}>
        <AppText tone="cyan">Back to sign in</AppText>
      </Link>
    </Screen>
  );
}
