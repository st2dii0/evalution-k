export interface Answers_Attributes {
    correct: boolean
    text: string
}

export interface Question {
    id: string
    chapter_id?: number
    text: string
    difficulty?: number
    answers_attributes: Answers_Attributes[]
    created_at?: Date
    updated_at?: Date
}