import { Role } from "./roles.model"

export interface User {
    id: number
    nombre: string
    apellido: string
    email: string
    password: string
    token: string
    roleId: number
}

export interface CreateUser {
    nombre: string | null
    apellido: string | null
    email: string | null
    password: string | null
    token: string | null
    roleId: number
}

export interface UpdateUser {
    nombre?: string | null
    apellido?: string | null
    email?: string | null
    password?: string | null
    token?: string | null
    roleId?: number
}

export interface UserWithRole extends User {
    nombre: string
    apellido: string
    email: string
    password: string
    token: string
    role: Role
}