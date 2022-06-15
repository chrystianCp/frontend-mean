export interface AuthResponse {
    ok: boolean, 
    uid?:  string,
    name?: string,
    token?: string,
    msg?: string,
    email?: string,
    role?: 'ADMIN_ROLE' | 'USER_ROLE'
}

export interface Usuario {
    // name: string
    uid: string,
    email: string,
    role: 'ADMIN_ROLE' | 'USER_ROLE'
  
}