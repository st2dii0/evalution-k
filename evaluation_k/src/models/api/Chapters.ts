import { Question, Answers_Attributes } from './Question';

export interface Chapter {
        id: number
        field_id: number
        level_id: number
        chapter_id: number
        name: string
        number?: number
        created_at: Date
        updated_at: Date
        questions?: Question[]
        chapters?: [
                {
                        id: number
                        field_id: number
                        level_id: number
                        chapter_id: number
                        name: string
                        number?: number
                        created_at: Date
                        updated_at: Date
                }
        ]
}