import { useState } from 'react';
import { View } from 'react-native';
import { Link, router } from 'expo-router';

import { BrandMark, Button, Screen, AppText, TextField } from '@/components/ui';
import { MOCK_PHONE_OTP } from '@/data/adapters/mock/auth-adapter';
import { isPreviewData } from '@/data/source';
import { useAuth } from '@/features/auth/auth-context';
import { hrefs } from '@/navigation/hrefs';
import { normalizePhone, validateEmail, validateOtp, validatePassword, validatePhone } from '@/features/auth/validation';
import { toUserMessage } from '@/lib/errors';
import { colors, space, type } from '@/theme';

type Mode = 'email' | 'phone';

export function LoginScreen() {
  const { client, setSession } = useAuth();
  const [mode, setMode] = useState<Mode>('phone');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+968');
  const [code, setCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function enterGarage() {
    setError(null);
    setFieldError(null);
    setLoading(true);
    try {
      if (mode === 'email') {
        const emailError = validateEmail(email) ?? validatePassword(password);
        if (emailError) {
          setFieldError(emailError);
          return;
        }
        const session = await client.auth.loginWithEmail({ email: email.trim(), password });
        setSession(session);
        router.replace(hrefs.tabs);
        return;
      }

      const cleanPhone = normalizePhone(phone);
      if (!otpSent) {
        const phoneError = validatePhone(cleanPhone);
        if (phoneError) {
          setFieldError(phoneError);
          return;
        }
        await client.auth.startPhoneOtp({ phone: cleanPhone });
        setOtpSent(true);
        return;
      }

      const otpError = validateOtp(code);
      if (otpError) {
        setFieldError(otpError);
        return;
      }
      const session = await client.auth.verifyPhoneOtp({ phone: cleanPhone, code: code.trim() });
      setSession(session);
      router.replace(hrefs.tabs);
    } catch (cause) {
      setError(toUserMessage(cause));
    } finally {
      setLoading(false);
    }
  }

  async function social(kind: 'apple' | 'google') {
    setError(null);
    setLoading(true);
    try {
      const session = kind === 'apple' ? await client.auth.signInWithApple() : await client.auth.signInWithGoogle();
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
        From simulator precision to real drift aggression
      </AppText>
      <AppText style={{ ...type.hero, color: colors.text, marginTop: space.sm }}>SIGN IN</AppText>
      <AppText tone="muted">Enter the garage. No grip. No glory.</AppText>

      {isPreviewData() ? (
        <AppText tone="gold" style={type.caption}>
          Development preview · mock adapter{otpSent ? ` · OTP ${MOCK_PHONE_OTP}` : ''}
        </AppText>
      ) : null}

      <View style={{ flexDirection: 'row', gap: space.sm }}>
        <Button label="Phone" variant={mode === 'phone' ? 'primary' : 'ghost'} onPress={() => setMode('phone')} />
        <Button label="Email" variant={mode === 'email' ? 'primary' : 'ghost'} onPress={() => setMode('email')} />
      </View>

      {mode === 'email' ? (
        <>
          <TextField
            label="EMAIL"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            error={fieldError}
          />
          <TextField label="PASSWORD" secureTextEntry value={password} onChangeText={setPassword} />
        </>
      ) : (
        <>
          <TextField label="PHONE" keyboardType="phone-pad" value={phone} onChangeText={setPhone} error={fieldError} />
          {otpSent ? (
            <TextField label="CODE" keyboardType="number-pad" value={code} onChangeText={setCode} maxLength={6} />
          ) : null}
        </>
      )}

      {error ? <AppText tone="accent">{error}</AppText> : null}

      <Button
        label={mode === 'phone' && !otpSent ? 'SEND CODE' : 'ENTER THE GARAGE'}
        loading={loading}
        onPress={enterGarage}
      />

      <Link href={hrefs.forgotPassword}>
        <AppText tone="gold">Forgot password</AppText>
      </Link>

      <View style={{ gap: space.sm }}>
        <Button label="Continue with Apple" variant="social" onPress={() => social('apple')} />
        <Button label="Continue with Google" variant="social" onPress={() => social('google')} />
      </View>

      <Link href={hrefs.register}>
        <AppText tone="muted">New driver? Create an account</AppText>
      </Link>
    </Screen>
  );
}
