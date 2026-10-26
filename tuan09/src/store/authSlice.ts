import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authService, { AuthResult } from '../services/authService';
import { setAuthToken } from '../api/client';
import { User } from '../types';

export const AUTH_STORAGE_KEY = 'auth_session';

type AuthState = {
  user: User | null;
  token: string | null;
  expiresAt: number | null;
  restoring: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
  expiresAt: null,
  restoring: true,
  loading: false,
  error: null,
};

const persist = async (r: AuthResult) => {
  setAuthToken(r.token);
  await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(r));
};

export const login = createAsyncThunk<
  AuthResult,
  { email: string; password: string },
  { rejectValue: string }
>('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const r = await authService.login(email, password);
    await persist(r);
    return r;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const register = createAsyncThunk<
  AuthResult,
  { name: string; email: string; password: string },
  { rejectValue: string }
>('auth/register', async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const r = await authService.register(name, email, password);
    await persist(r);
    return r;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

export const restoreSession = createAsyncThunk<AuthResult | null>('auth/restore', async () => {
  try {
    const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;

    const saved: AuthResult = JSON.parse(raw);
    const isValid = !!saved.token && !!saved.user?.id && saved.expiresAt > Date.now();
    if (!isValid) {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    setAuthToken(saved.token);

    try {
      const user = await authService.getMe(saved.user.id);
      return { ...saved, user };
    } catch (err: any) {
      if ([401, 403, 404].includes(err?.response?.status)) {
        await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        setAuthToken(null);
        return null;
      }
      return saved;
    }
  } catch {
    return null;
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  setAuthToken(null);
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
});

const apply = (s: AuthState, r: AuthResult | null | undefined) => {
  s.user = r?.user ?? null;
  s.token = r?.token ?? null;
  s.expiresAt = r?.expiresAt ?? null;
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(login.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        apply(s, a.payload);
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? 'Đăng nhập thất bại';
      })
      .addCase(register.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(register.fulfilled, (s, a) => {
        s.loading = false;
        apply(s, a.payload);
      })
      .addCase(register.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload ?? 'Đăng ký thất bại';
      })
      .addCase(restoreSession.fulfilled, (s, a) => {
        s.restoring = false;
        apply(s, a.payload);
      })
      .addCase(restoreSession.rejected, (s) => {
        s.restoring = false;
      })
      .addCase(logout.pending, (s) => {
        apply(s, null);
      });
  },
});

export const { clearError } = slice.actions;
export default slice.reducer;
