export interface Course {
    id_course: number;
    id_subject: number,
    initialDate: string,
    endDate: string,
}

export interface CreateCourse {
    id_subject: number,
    initialDate: string,
    endDate: string,
}

export interface UpdateCourse {
    id_subject?: number,
    initialDate?: string,
    endDate?: string,
}