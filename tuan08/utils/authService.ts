const BASE_URL = 'https://6aba13785b549d818d61e2cc.mockapi.io/api/v1/users';

export type User = { id: string; name: string; email: string };
export type Account = User & { password: string };
export type AuthResult = { token: string; user: User };

const toResult = (a: Account): AuthResult => ({
    token: `23656771tokenfake-${a.id}`,
    user: { id: a.id, name: a.name, email: a.email }, // không trả password
});

// mockapi lọc kiểu "chứa chuỗi", nên phải so khớp chính xác lại ở client
const findByEmail = async (email: string): Promise<Account[]> => {
    const res = await fetch(`${BASE_URL}?email=${encodeURIComponent(email)}`);
    if (res.status === 404) return []; // mockapi trả 404 khi không có kết quả
    if (!res.ok) throw new Error('Khong ket noi duoc may chu');
    const list: Account[] = await res.json();
    return list.filter(a => a.email.toLowerCase() === email.toLowerCase());
};

export const authService = {
    async register(name: string, email: string, password: string): Promise<AuthResult> {
        if ((await findByEmail(email)).length > 0) {
            throw new Error('Email da duoc dang ky');
        }

        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) throw new Error('Dang ky that bai');

        const acc: Account = await res.json();
        return toResult(acc);
    },

    async login(email: string, password: string): Promise<AuthResult> {
        const acc = (await findByEmail(email)).find(a => a.password === password);
        if (!acc) throw new Error('Email hoac mat khau khong khop');
        return toResult(acc);
    },
};