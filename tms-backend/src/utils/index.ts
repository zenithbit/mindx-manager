import { Request, Response } from 'express';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { JwtVerify, Obj } from '../global/interface';
import { Education, LevelTechnique, ResourceApply, WEEKDAY } from '../global/enum';

const genRandomId = () => {
    return uuidv4()
};

const getProjection = (...fields: Array<string>) => {
    if (fields !== undefined) {
        const filedsProjection: Obj = {};
        fields.forEach((item) => {
            filedsProjection[item] = 1
        });
        return filedsProjection
    }
    return {}
}
function resClientData(req: Request, res: Response, statusCode: number, data: any, message?: string, notSendPayload?: boolean) {
    res.status(statusCode).send({
        data,
        message: message ? message : (!!data ? 'Thành công!' : 'Thất bại!'),
        status: data ? true : false,
        query: !notSendPayload ? {
            body: req.body,
            params: req.params,
            query: req.query
        } : {}
    })
}
function generateJWT(data: Obj) {
    const token = jwt.sign(data, process.env.PRIVATE_KEY_JWT as string, {
        expiresIn: 60 * Number(process.env.JWT_EXPRISE),
    });
    return { token: token };
}
function verifyJWT(token: string): JwtVerify | string {
    try {
        const verifyToken = jwt.verify(token, process.env.PRIVATE_KEY_JWT as string, (err, data) => {
            if (data) return data;
            if (err) return err.message;
        });
        return verifyToken as unknown as JwtVerify;
    } catch (error: any) {
        return "jwt " + error.message
    }
}

export const encryptPassword = (password: string, saltUser?: string) => {
    // Private key for single user
    const salt = saltUser ?? crypto.randomBytes(128).toString("hex");
    // Hashed password
    const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");

    return {
        salt: salt,
        hashedPassword: hashedPassword,
    };
};

const verifyPassword = (password: string, acc: Obj) => {
    const hashedPassword = crypto
        .pbkdf2Sync(password, acc?.salt as string, 10000, 64, "sha512")
        .toString("hex");
    return hashedPassword === acc.password;
}

const getDateOfWeekday = (date: Date, countDay: number) => {
    const newDate = date;
    newDate.setDate(newDate.getDate() + countDay);
    return newDate;
}

const getWeekDay = (dayNumber: number | undefined, toNumber?: boolean, crrWeekday?: WEEKDAY) => {
    if (!toNumber) {
        switch (dayNumber) {
            case 1:
                return WEEKDAY.T2;
            case 2:
                return WEEKDAY.T3;
            case 3:
                return WEEKDAY.T4;
            case 4:
                return WEEKDAY.T5;
            case 5:
                return WEEKDAY.T6;
            case 6:
                return WEEKDAY.T7;
            case 0:
                return WEEKDAY.CN;
            default:
                return 0
        }
    } else {
        switch (crrWeekday) {
            case WEEKDAY.T2:
                return 1;
            case WEEKDAY.T3:
                return 2;
            case WEEKDAY.T4:
                return 3;
            case WEEKDAY.T5:
                return 4;
            case WEEKDAY.T6:
                return 5;
            case WEEKDAY.T7:
                return 6;
            case WEEKDAY.CN:
                return 0;
            default:
                return 0;
        }
    }
}
const getOrderWeekday: Record<WEEKDAY, number> = {
    T2: 1,
    T3: 2,
    T4: 3,
    T5: 4,
    T6: 5,
    T7: 6,
    CN: 7
}
const formatDateToString = (date: Date) => {
    return date.toLocaleDateString("en-US");
}
const getProjectionByString = (str: string) => {
    const listField = str ? str.split(',') : [];
    const projection: Obj = {};
    listField.forEach((item) => {
        if (item) {
            projection[item] = 1;
        }
    });
    return projection;
}
const getScoreLevelTech: Record<LevelTechnique, number> = {
    INTERN: 1,
    FRESHER: 2,
    JUNIOR: 3,
    MIDDLE: 4,
    SENIOR: 5,
    LEADER: 6,
}
const getScoreResourceApply: Record<ResourceApply, number> = {
    AN: 1,
    FB: 2,
    RF: 3,
    LKD: 4,
    TCV: 3
}
const returnNumberBoolean = (field: any) => {
    return field ? 1 : 0
}
const getScoreEducation: Record<Education, number> = {
    BACHELOR: 1,
    ENGINEER: 2,
    // thạc sĩ
    MASTER: 3,
    // tiến sĩ
    DOCTOR: 4
}
const formatDateTime = (date: Date) => {
    // Lấy thông tin giờ, phút và giây
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Lấy thông tin ngày, tháng và năm
    const day = date.getDate();
    const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = date.getFullYear();

    // Chuyển đổi số liệu thành chuỗi và thêm số 0 ở trước nếu cần
    const formattedTime = [hours, minutes, seconds].map(function (unit) {
        return unit < 10 ? "0" + unit : unit;
    }).join(":");

    const formattedDate = [day, month, year].map(function (unit) {
        return unit < 10 ? "0" + unit : unit;
    }).join("-");

    // Kết hợp giờ và ngày thành định dạng cuối cùng
    const formattedDateTime = formattedTime + ", " + formattedDate;

    return formattedDateTime;
}
export {
    genRandomId,
    getProjection,
    resClientData,
    generateJWT,
    verifyJWT,
    verifyPassword,
    getDateOfWeekday,
    getWeekDay,
    formatDateToString,
    getProjectionByString,
    returnNumberBoolean,
    formatDateTime,
    getOrderWeekday,
    getScoreLevelTech,
    getScoreResourceApply,
    getScoreEducation
};