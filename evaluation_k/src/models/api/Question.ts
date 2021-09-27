export interface Answers_Attributes {
    correct: boolean
    text: string
}

export interface Question {
    id: string,
    text: string
    difficulty?: number
    answers_attributes: Answers_Attributes[]
}