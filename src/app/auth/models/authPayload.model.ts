export interface LoginPayload {
    email: string | null,
    password: string | null
}

export interface RegisterPayload {
    name: string | null,
    surname: string | null,
    country: string | null,
    email: string | null,
    password: string,
    confirmPassword: string | null
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

export interface CreateUser {
    nombre: string | null,
    apellido: string | null,
    email: string | null,
    password: string | null,
    token: string | null,
    role: string | null
}

