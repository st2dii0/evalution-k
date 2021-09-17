export interface Question {
    id: string,
    text: string
    difficulty?: number
    answers_attributes: [
        {
            correct: boolean
            text: string
        }
    ]
}