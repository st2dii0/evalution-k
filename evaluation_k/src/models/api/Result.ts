export interface Result {
    id: number,
    student_name: string,
    school_id?: number | null,
    user_id: number,
    choices: [
        {
            id: number,
            answer_id: number,
            evaluation_id: number,
            answer: {
                id: number,
                question_id: number,
                correct: boolean,
                text: string,
                question: {
                    id: number,
                    chapter_id: number,
                    text: string
                    difficulty: number,
                    chapter: {
                        id: number,
                        field_id: number,
                        level_id: number,
                        chapter_id: number | null,
                        name: string,
                        number: number,
                    }
                }
            }
        }
    ]
}