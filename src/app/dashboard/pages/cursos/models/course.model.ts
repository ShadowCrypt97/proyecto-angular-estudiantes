export interface Course {
    id: number;
    subjectId: number,
    initialDate: string,
    endDate: string,
}

export interface CreateCourse {
    subjectId: number,
    initialDate: string,
    endDate: string,
}

export interface UpdateCourse {
    subjectId?: number,
    initialDate?: string,
    endDate?: string,
}