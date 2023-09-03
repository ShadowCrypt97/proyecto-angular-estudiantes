import { Course } from "../../cursos/models/course.model"
import { Student } from "../../estudiantes/models/student.model"
import { Subject } from "../../materias/models/subejct.model"

export interface Inscription {
    id: number,
    studentId: number,
    courseId: number,
    subjectId: number
}

export interface CreateInscription {
    studentId: number,
    courseId: number,
    subjectId: number
}

export interface UpdateInscription {
    studentId?: number,
    courseId?: number,
    subjectId?: number
}

export interface InscriptionExpanded extends Inscription {
    student: Student,
    course: Course,
    subject: Subject
}