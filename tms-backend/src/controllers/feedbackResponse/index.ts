import { Request, Response } from "express";
import FeedbackResponseModel from "../../models/feedbackResponse";
import TeacherPointModel from "../../models/teacherPoint";
import FeedbackModel from "../../models/feedback";
import { getProjection, resClientData } from "../../utils";
import ClassTeacherPointModel from "../../models/classTeacherPoint";
import TeacherModel from "../../models/teacher";

const feedbackResponseController = {
    sendResponseFromForm: async (req: Request, res: Response) => {
        try {
            const dataResponse = req.body;
            const insertResponse = await FeedbackResponseModel.create(dataResponse);
            await TeacherPointModel.create({
                classId: dataResponse.codeClass,
                feedbackResponseId: insertResponse._id,
                groupNumber: dataResponse.groupNumber,
                point: dataResponse.teacherPoint,
                teacherId: dataResponse.teacherId,
            });
            const checkExistedCalcTcPClass = await ClassTeacherPointModel.findOne({
                feedbackId: dataResponse.feedbackId,
                timeCollect: dataResponse.timeCollect
            });
            // calc teacherpoint for class
            if (checkExistedCalcTcPClass) {
                const countResponse = await FeedbackResponseModel.find({
                    codeClass: checkExistedCalcTcPClass.classId,
                    timeCollect: checkExistedCalcTcPClass.timeCollect,
                });
                let totalPoint = 0;
                countResponse.forEach((item) => {
                    totalPoint += ((item.pointMT + item.pointST) / 2);
                });
                checkExistedCalcTcPClass.teacherPoint = (totalPoint / countResponse.length);
                await checkExistedCalcTcPClass.save();
            }
            // clac teacherPoint for teacher
            const findAllFeedbackResponse = await TeacherPointModel.find({
                teacherId: dataResponse.teacherId
            });
            let teacherPointForTeacher = 0;
            findAllFeedbackResponse.forEach((item) => {
                teacherPointForTeacher += item.point;
            });
            const findTeacher = await TeacherModel.findById(dataResponse.teacherId);
            if (findTeacher) {
                findTeacher.teacherPoint = (teacherPointForTeacher / findAllFeedbackResponse.length);
                await findTeacher.save();
            }
            resClientData(req,res, 201, {});
        } catch (error: any) {
            resClientData(req,res, 500, null, error.message);
        }
    },
    getListRecordResponse: async (req: Request, res: Response) => {
        try {
            // with filter
            /**
             * sortBy:{
             * type: ASC|DESC,
             * field: string
             * }
             */
            const {
                fields,
                currentPage,
                recordOnPage,

                codeClass,
                timeCollect,

                // month,
                // year,
                // phoneNumber,
                // course,
                // codeClass,
                // timeCollectFeedback,
                // sortBy,

            } = req.query;
            if (codeClass && timeCollect) {
                const recordFeedback = await FeedbackModel.findOne({
                    codeClass: codeClass,
                    time: Number(timeCollect) || 1
                });
                if (!recordFeedback) {
                    resClientData(req,res, 200, {
                        list: [],
                        totalPage: null,
                        currentPage: null,
                        recordOnPage: null
                    });
                } else {
                    const listResponseFeedback = await FeedbackResponseModel.find({
                        feedbackId: recordFeedback?._id,
                    }).sort({
                        createdAt: -1
                    })
                        .populate('course codeClass groupNumber feedbackId', { ...fields && getProjection(...fields as Array<string>) })
                    resClientData(req,res, 200, {
                        list: listResponseFeedback,
                        totalPage: null,
                        currentPage: null,
                        recordOnPage: null
                    });
                }
            } else {
                const totalRecord = await FeedbackResponseModel.countDocuments({});
                const listResponse = await FeedbackResponseModel.find({}, { ...fields && getProjection(...fields as Array<string>) }).sort({
                    createdAt: -1
                })
                    .skip((Number(recordOnPage) * Number(currentPage)) - Number(recordOnPage)).limit(Number(recordOnPage))
                    .populate('course codeClass groupNumber feedbackId', { ...fields && getProjection(...fields as Array<string>) });
                resClientData(req,res, 200, {
                    list: listResponse,
                    totalPage: Math.ceil(totalRecord / Number(recordOnPage)),
                    currentPage: Number(currentPage) || '',
                    recordOnPage: Number(recordOnPage || '')
                });
            }
        } catch (error: any) {
            resClientData(req,res, 500, null, error.message);
        }
    },
    getListRecordResponseByTeacherId: async (req: Request, res: Response) => {
        try {
            const { teacherId, currentPage, recordOnPage, fields } = req.query;
            const listResponse = await TeacherPointModel.find({
                teacherId
            }, { ...fields && getProjection(...fields as Array<string>) })
                .sort({
                    createdAt: -1
                })
                .skip((Number(recordOnPage) * Number(currentPage)) - Number(recordOnPage)).limit(Number(recordOnPage))
                .populate('classId feedbackResponseId groupNumber', { ...fields && getProjection(...fields as Array<string>) });
            resClientData(req,res, 200, listResponse);
        } catch (error: any) {
            resClientData(req,res, 500, null, error.message);
        }
    }
};
export default feedbackResponseController;