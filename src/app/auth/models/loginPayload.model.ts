export interface LoginPayload {
    email: string | null,
    password: string | null
}

export interface User {
    id: number,
    nombre: string,
    apellido: string,
    email: string,
    password: string,
    token: string,
    role: string
}