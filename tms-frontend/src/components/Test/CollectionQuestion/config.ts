import { Obj } from "@/global/interface";
import { uuid } from "@/utils";

const mappingListQuestionWithOption = (listQuestion: Obj[], listOption: Obj[]) => {
    const newListQuestion: Obj[] = [];
    listQuestion.forEach((question) => {
        const newQuestion: Obj = {
            ...question,
            key: question._id ?? uuid()
        };
        const newListOption: Obj[] = listOption.filter((option) => {
            return option.questionId === newQuestion._id && option.type === newQuestion.type
        }).map((item) => {
            return {
                ...item,
                key: item._id ?? uuid()
            }
        }).sort((a: Obj, b: Obj) => Number(a.order) - Number(b.order));
        newQuestion['options'] = newListOption.length !== 0 ? newListOption :
            (question.type === 'QUIZ' ? [1, 2, 3, 4].map((_, index) => {
                return {
                    content: '',
                    isCorrect: false,
                    key: uuid(),
                    order: index + 1
                }
            }) :
                [{
                    content: 'True',
                    isCorrect: false,
                    key: uuid(),
                    order: 1
                },
                {
                    content: 'False',
                    isCorrect: false,
                    key: uuid(),
                    order: 2
                },]);

        newListQuestion.push(newQuestion);
    });
    newListQuestion.sort((a, b) => a.order - b.order);
    return newListQuestion
}
export {
    mappingListQuestionWithOption
}