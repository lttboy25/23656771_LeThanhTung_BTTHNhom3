export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const validDateAuth = (
    v: {name?:string, email: string, password: string},
    mode: 'login' | 'register'
) => {
    const errors: {name?: string; email?:string, password?:string} = {};
    if(mode === 'register' && !v.name?.trim()) 
        errors.name = "Vui long nhap ho va ten";

    if(!v.email.trim()) 
        errors.email = "Vui long nhap email";
    else if (!isValidEmail(v.email)) 
        errors.email = "Vui long nhap email dung dinh dang";

    if (!v.password.trim()) 
        errors.password = "Vui long nhap mat khau";
    else if(v.password.length < 6) 
        errors.password = "Mat khau phai co tu 6 ky tu tro len";
    
    return errors;
}