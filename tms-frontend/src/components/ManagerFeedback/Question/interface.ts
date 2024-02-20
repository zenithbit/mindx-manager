export interface ListQuestion {
    title: string;
    questions?: Question[]
}
export interface Question {
    questionTitle: string;
    typeQuesttion: TypeQuestion;
    isRequired: boolean;
}
export interface TypeQuestion {
    typeText?: TypeTextQuestion;
    typeInput?: TypeInput;
    limitLengthText?: number;
}
export enum TypeTextQuestion {
    LONG = 'LONG',
    SHORT = 'SHORT'
}
export enum TypeInput {
    RADIO = 'RADIO',
    CHECKBOX = 'CHECKBOX',
    DROPDOWN = 'DROPDOWN'
}