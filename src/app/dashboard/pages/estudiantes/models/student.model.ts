export interface Student {
    id_student: number;
    name: string,
    surname: string,
    email?: string,
    registrationDate: Date
}

export interface CreateStudent {
    name: string,
    surname: string,
    email: string,
    registrationDate: Date
}

export interface UpdateStudent {
    name?: string,
    surname?: string,
    email?: string,
    registrationDate?: Date
}