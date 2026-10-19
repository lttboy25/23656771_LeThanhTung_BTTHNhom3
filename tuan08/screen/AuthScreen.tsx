import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '../store/authSlice';
import { validDateAuth } from '../utils/validators';

export default function AuthScreen({ navigation, route }: any) {
  const redirectTo = route.params?.redirectTo;
  const dispatch = useDispatch<any>();
  const loading = useSelector((s: any) => s.auth.loading);

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  const switchMode = (m: 'login' | 'register') => {
    setMode(m);
    setErrors({});
  };

  const onSubmit = async () => {
    const errs = validDateAuth({ name, email, password }, mode);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const action = mode === 'login'
      ? login({ email, password })
      : register({ name, email, password });
    const result = await dispatch(action);

      if (result.meta.requestStatus === 'fulfilled') {
              if (redirectTo) navigation.replace(redirectTo);
      else if (route.params?.goBack) navigation.goBack();
      else navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    } else {
      Alert.alert('Lỗi', (result.payload as string) ?? 'Có lỗi xảy ra');
    }
  };

  return (
    <View style={s.container}>
      <View style={s.tabs}>
        {(['login', 'register'] as const).map(m => (
          <TouchableOpacity key={m} style={[s.tab, mode === m && s.tabActive]} onPress={() => switchMode(m)}>
            <Text style={mode === m ? s.tabTextActive : s.tabText}>
              {m === 'login' ? 'Đăng nhập' : 'Đăng ký'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {mode === 'register' && (
        <>
          <TextInput style={s.input} placeholder="Họ tên" value={name} onChangeText={setName} />
          {!!errors.name && <Text style={s.error}>{errors.name}</Text>}
        </>
      )}

      <TextInput style={s.input} placeholder="Email" autoCapitalize="none"
        keyboardType="email-address" value={email} onChangeText={setEmail} />
      {!!errors.email && <Text style={s.error}>{errors.email}</Text>}

      <TextInput style={s.input} placeholder="Mật khẩu" secureTextEntry
        value={password} onChangeText={setPassword} />
      {!!errors.password && <Text style={s.error}>{errors.password}</Text>}

      <TouchableOpacity style={s.button} onPress={onSubmit} disabled={loading}>
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={s.buttonText}>{mode === 'login' ? 'Đăng nhập' : 'Đăng ký'}</Text>}
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  tabs: { flexDirection: 'row', marginBottom: 20 },
  tab: { flex: 1, padding: 12, alignItems: 'center', borderBottomWidth: 2, borderColor: '#ddd' },
  tabActive: { borderColor: '#1e88e5' },
  tabText: { color: '#888' },
  tabTextActive: { color: '#1e88e5', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginTop: 12 },
  error: { color: 'red', fontSize: 12, marginTop: 4 },
  button: { backgroundColor: '#1e88e5', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: '600' },
});