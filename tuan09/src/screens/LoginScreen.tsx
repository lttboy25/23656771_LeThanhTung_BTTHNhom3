import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store';
import { clearError, login } from '../store/authSlice';
import { validateEmail, validatePassword } from '../utils/validate';

export default function LoginScreen({ navigation, route }: ScreenProps<'Login'>) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const goAfterAuth = () => {
    if (route.params?.redirect === 'goBack') navigation.goBack();
    else navigation.navigate('Tabs', { screen: 'Home' });
  };

  const handleLogin = async () => {
    const e = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(e);
    if (e.email || e.password) return;
    const res = await dispatch(login({ email, password }));
    if (login.fulfilled.match(res)) goAfterAuth();
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="test@gmail.com"
        error={errors.email}
      />
      <FormField
        label="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Tối thiểu 6 ký tự"
        error={errors.password}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <PrimaryButton
        title={loading ? 'Đang xử lý...' : 'Đăng nhập'}
        onPress={handleLogin}
        disabled={loading}
      />
      <PrimaryButton
        variant="outline"
        title="Chưa có tài khoản? Đăng ký"
        onPress={() => navigation.replace('Register', route.params)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  error: { color: '#c62828', marginBottom: 4 },
});
