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