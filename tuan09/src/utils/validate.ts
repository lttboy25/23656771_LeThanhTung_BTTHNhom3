const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (v: string) =>
  !v.trim() ? 'Vui lòng nhập email' : !EMAIL_RE.test(v.trim()) ? 'Email không đúng định dạng' : '';

export const validatePassword = (v: string) =>
  !v ? 'Vui lòng nhập mật khẩu' : v.length < 6 ? 'Mật khẩu tối thiểu 6 ký tự' : '';

export const validateName = (v: string) => (!v.trim() ? 'Vui lòng nhập họ tên' : '');
