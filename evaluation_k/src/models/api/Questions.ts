export interface Questions {
    question: {
        text: string
        difficulty?: number
        answers_attributes: [
            {
                correct: boolean
                text: string
            }
        ]
    }
}