import { uuid } from "@/utils";

const data = [
    {
        key: uuid(),
        codeClass: 'TC-C4EJS141',
        collection: [
            {
                timeCollect: 1,
                date: new Date(),
                rateCollect: 70,
                total: 100,
                numberCountCollect: 56,
                done: true,
                enabled: true
            },
            {
                timeCollect: 2,
                date: new Date(),
                total: 100,
                numberCountCollect: 30,
                rateCollect: 30,
                done: true,
                enabled: true
            },
        ]
    }
];
export {
    data
}