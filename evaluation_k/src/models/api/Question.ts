export interface Answers_Attributes {
    id: number
    correct: boolean
    text: string
}

export interface Question {
    id: number
    chapter_id?: number
    text: string
    difficulty?: number
    answers?: Answers_Attributes[]
    answers_attributes?: Answers_Attributes[]
    created_at?: Date
    updated_at?: Date
}