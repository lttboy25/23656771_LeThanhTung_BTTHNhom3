import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService, User } from "../utils/authService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const AUTH_KEY = 'auth';

type AuthState = {token: string | null; user: User | null; loading: boolean; restored: boolean};
const initialState: AuthState = {token: null, user: null, loading: false, restored: false};

export const restoreAuth = createAsyncThunk('auth/restore', async () => {
  try {
    const raw = await AsyncStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (typeof data?.token === 'string' && data.token && data?.user?.email) {
      return data as { token: string; user: User };
    }
    await AsyncStorage.removeItem(AUTH_KEY); // dữ liệu hỏng thì xóa
    return null;
  } catch {
    return null;
  }
});

const persist = (data: {token: string, user: User}) => 
    AsyncStorage.setItem(AUTH_KEY, JSON.stringify(data));

export const login = createAsyncThunk(
    'auth/login',
    async(p: {email: string; password: string}, {rejectWithValue}) => {
        try {
            const r = await authService.login(p.email.trim(), p.password);
            await persist(r);
            return r;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const register = createAsyncThunk(
  'auth/register',
  async (p: { name: string; email: string; password: string }, { rejectWithValue }) => {
    try {
      const r = await authService.register(p.name.trim(), p.email.trim(), p.password);
      await persist(r);
      return r;
    } catch (e: any) {
      return rejectWithValue(e.message);
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: s => {
      s.token = null;
      s.user = null;
      AsyncStorage.removeItem(AUTH_KEY);
    },
  },
  extraReducers: b => {
    const pending = (s: AuthState) => { s.loading = true; };
    const done = (s: AuthState, a: any) => {
      s.loading = false;
      s.token = a.payload.token;
      s.user = a.payload.user;
    };
    const fail = (s: AuthState) => { s.loading = false; };
    b.addCase(login.pending, pending)
      .addCase(login.fulfilled, done)
      .addCase(login.rejected, fail)
      .addCase(register.pending, pending)
      .addCase(register.fulfilled, done)
      .addCase(register.rejected, fail)
      .addCase(restoreAuth.fulfilled, (s, a) => {
        if(a.payload) {s.token = a.payload.token; s.user = a.payload.user;}
        s.restored = true;
      })
      .addCase(restoreAuth.rejected, s => {s.restored = true;})
  },
});

export const { logout } = slice.actions;
export default slice.reducer;