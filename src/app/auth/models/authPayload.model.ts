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

