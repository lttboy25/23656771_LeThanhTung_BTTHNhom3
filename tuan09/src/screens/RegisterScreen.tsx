import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';
import { ScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../store';
import { clearError, register } from '../store/authSlice';
import { validateEmail, validateName, validatePassword } from '../utils/validate';

export default function RegisterScreen({ navigation, route }: ScreenProps<'Register'>) {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleRegister = async () => {
    const e = {
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
    };
    setErrors(e);
    if (e.name || e.email || e.password) return;
    const res = await dispatch(register({ name, email, password }));
    if (register.fulfilled.match(res)) {
      if (route.params?.redirect === 'goBack') navigation.goBack();
      else navigation.navigate('Tabs', { screen: 'Home' });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <FormField label="Họ tên" value={name} onChangeText={setName} error={errors.name} />
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
        title={loading ? 'Đang xử lý...' : 'Đăng ký'}
        onPress={handleRegister}
        disabled={loading}
      />
      <PrimaryButton
        variant="outline"
        title="Đã có tài khoản? Đăng nhập"
        onPress={() => navigation.replace('Login', route.params)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  error: { color: '#c62828', marginBottom: 4 },
});
