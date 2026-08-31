import { useState } from 'react';
import { Link, router } from 'expo-router';

import { BrandMark, Button, Screen, AppText, TextField } from '@/components/ui';
import { isPreviewData } from '@/data/source';
import { useAuth } from '@/features/auth/auth-context';
import { validateDisplayName, validateEmail, validatePassword } from '@/features/auth/validation';
import { hrefs } from '@/navigation/hrefs';
import { toUserMessage } from '@/lib/errors';
import { colors, space, type } from '@/theme';

export function RegisterScreen() {
  const { client, setSession } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    const nextError = validateDisplayName(displayName) ?? validateEmail(email) ?? validatePassword(password);
    if (nextError) {
      setFieldError(nextError);
      return;
    }
    setFieldError(null);
    setLoading(true);
    try {
      const session = await client.auth.register({
        displayName: displayName.trim(),
        email: email.trim(),
        password,
      });
      setSession(session);
      router.replace(hrefs.tabs);
    } catch (cause) {
      setError(toUserMessage(cause));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <BrandMark />
      <AppText tone="muted" style={{ ...type.section, marginTop: space.md }}>
        New driver
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text, marginTop: space.sm }}>CREATE ACCOUNT</AppText>
      <AppText tone="muted">New driver. Same garage rules.</AppText>
      {isPreviewData() ? (
        <AppText tone="gold" style={type.caption}>
          Development preview · mock adapter
        </AppText>
      ) : null}
      <TextField label="NAME" value={displayName} onChangeText={setDisplayName} error={fieldError} />
      <TextField label="EMAIL" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextField label="PASSWORD" secureTextEntry value={password} onChangeText={setPassword} />
      {error ? <AppText tone="accent">{error}</AppText> : null}
      <Button label="JOIN THE GRID" loading={loading} onPress={submit} />
      <Link href={hrefs.login}>
        <AppText tone="cyan">Already have an account? Sign in</AppText>
      </Link>
    </Screen>
  );
}
