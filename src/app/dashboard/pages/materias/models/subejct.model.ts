export interface Subject {
    id: number,
    subject_name: string,
    description: string
}

export interface CreateSubject {
    subject_name: string,
    description: string
}

export interface UpdateSubject {
    subject_name?: string,
    description?: string
}