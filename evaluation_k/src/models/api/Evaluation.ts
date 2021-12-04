export interface Evaluation {
    student_name: string,
    school_uuid?: string // "Snw_mS1bnirK2taMhW-2qw", not working yet
    school_id?: number,
    user_id?: number,
    choices_attributes: [
        {
            answer_id: number
        }
    ]
}