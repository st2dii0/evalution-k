export interface Chapter {
        id: number
        field_id: number
        level_id: number
        chapter_id: number
        name: string
        number?: number
        created_at: Date
        updated_at: Date
        questions?: [
                {
                     id: number
                     chapter_id: number
                     text: string
                     difficulty: number
                     created_at: Date
                     updated_at: Date
                }
        ],
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