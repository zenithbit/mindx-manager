import React, { MutableRefObject, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Action, BaseInterfaceHookReducer, Obj, State } from "@/global/interface";
import { AppDispatch, RootState } from "@/store";
import { queryGetListCourse } from "@/store/reducers/course/listCourse.reducer";
import { queryGetLocations } from "@/store/reducers/location/localtion.reducer";
import { queryGetCurrentBookTeacher, updateListBookTeacher } from "@/store/reducers/class/bookTeacher.reducer";
import { clearAddRequest, queryAddRequestBookTeacher } from "@/store/reducers/class/addRequestBookTeacher.reducer";
import { clearDeatailClass, queryDetailClass } from "@/store/reducers/class/detailClass.reducer";
import { clearStateHanldeTeacherInRecordBT, queryHandleTeacherInRecordBT } from "@/store/reducers/class/handleTeacherInRecordBT.reducer";
import { ComponentPage, PositionTe, ROLE_TEACHER, RoundProcess } from "@/global/enum";
import { queryClassSession } from "@/store/reducers/class/classSesesion.reducer";
import { clearUpdatedDataClassBasicInfor, queryUpdateClassBasicInfor } from "@/store/reducers/class/updateClassBasicInfor.reducer";
import { queryGetListTeacher } from "@/store/reducers/teacher/listTeacher.reducer";
import { queryTeacherRegisterCourse } from "@/store/reducers/teacher/teacherRegisterCourse.reducer";
import { queryTeacherSchedule } from "@/store/reducers/teacher/teacherSchedule.reducer";
import { queryAttendanceTeacherInClassSession } from "@/store/reducers/class/attendanceTeacherInClassSession.reducer";
import { queryListClassFeedbackView } from "@/store/reducers/feedback/listClass.reducer";
import { clearResUpdateClassForFeedback, queryUpdateClassForFeedback } from "@/store/reducers/feedback/updateClassForFeedback.reducer";
import { queryGetListClassInFormFeedback } from "@/store/reducers/feedback/listClassInGetFeedback.reducer";
import { queryGetListGroupClassInFormFeedback } from "@/store/reducers/feedback/listGroupInFormFeedback.reducer";
import { clearResponseFeedback, queryResponseFeedback } from "@/store/reducers/feedback/responseFeedback.reducer";
import { queryGetListResponseFeedback } from "@/store/reducers/feedback/listResponseFeedback.reducer";
import { PayloadRoute, initDataRoute } from "@/store/reducers/global-reducer/route";
import { queryDetailTeacher } from "@/store/reducers/teacher/detailTeacher.reducer";
import { queryGetClassTeacherRegister } from "@/store/reducers/teacher/getClassTeacherRegister.reducer";
import { queryPreTeacher } from "@/store/reducers/teacher/preTeacher.reducer";
import { queryAcceptPreTeacher, clear as clearAcceptPreTeacher } from "@/store/reducers/teacher/acceptPreTeacher.reducer";
import { queryListResponseFeedbackForTeacher } from "@/store/reducers/feedback/listResponseFeedbackForTeacher.reducer";
import { queryClassTeacherPoint } from "@/store/reducers/class/classTeacherPoint.reducer";
import { queryGetListDataRecruitment } from "@/store/reducers/recruitment/recruitment.reducer";
import { queryDetailCandidate } from "@/store/reducers/recruitment/detailCandidate.reducer";
import { clearCreateCandidate, queryCreateCandidate } from "@/store/reducers/recruitment/createCandidate.reducer";
import { clearCreateCourse, queryCreateCourse } from "@/store/reducers/course/createCourse.reducer";
import { queryDetailCourse } from "@/store/reducers/course/detailCourse.reducer";
import { clearCreateLevelCourse, queryCreateLevelCourse } from "@/store/reducers/course/createLevelCourse.reducer";
import { clearUpdateCourse, queryUpdateCourse } from "@/store/reducers/course/updateCourse.reducer";
import { clearUpdateLevelCourse, queryUpdateLevelCourse } from "@/store/reducers/course/updateLevelCourse.reducer";
import { queryRoundProcessCandidate } from "@/store/reducers/recruitment/roundProcessCandidate.reducer";
import { queryRoundComments } from "@/store/reducers/recruitment/roundComment.reducer";
import { createHookQueryReducer } from "..";
import { clearReducerCreateComment, queryCreateComment } from "@/store/reducers/recruitment/createComment.reducer";
import { clearQueryUpdateDataRoundProcessCandidate, queryUpdateDataRoundProcessCandidate } from "@/store/reducers/recruitment/updateDataRound.reducer";
import { queryCreateDataRoundProcess } from "@/store/reducers/recruitment/createDataRoundProcess.reducer";
import { queryGetAllTe } from "@/store/reducers/te/getTe.reducer";
import { queryMailTemplate } from "@/store/reducers/mailTemplate/mailTemplate.reducer";
import { clearCreateMailTemplate, queryCreateMailTemplate } from "@/store/reducers/mailTemplate/createMailTemplate.reducer";
import { clearUpdateMailTemplate, queryUpdateMailTemplate } from "@/store/reducers/mailTemplate/updateMailTemplate.reducer";
import { clearMailer, queryMailer } from "@/store/reducers/mailer.reducer";
import { queryCheckCandidateInfo } from "@/store/reducers/candidateOnboard/checkCandidateInfo.reducer";
import { queryGetRoundCalautid } from "@/store/reducers/candidateOnboard/getRoundClautid.reducer";
import { clearRegisterClautid, queryRegisterClautid } from "@/store/reducers/candidateOnboard/registerClautid.reducer";
import { clearCreateFeedbackClautid, queryCreateFeebackClautid } from "@/store/reducers/candidateOnboard/createFeedbackClautid.reducer";
import { queryGetFeebackClautid } from "@/store/reducers/candidateOnboard/getFeedbackClautid.reducer";
import { clearQueryUpdateClassClautid, queryUpdateClassClautid } from "@/store/reducers/candidateOnboard/updateClassClautid.reducer";
import { queryGetCalendar } from "@/store/reducers/candidateOnboard/getCalendarTest.reducer";
import { clearGenerateAttendanceTeacher, queryGenerateAttendanceTeacher } from "@/store/reducers/class/generateAttendanceTeacher.reducer";
import { queryArea } from "@/store/reducers/location/area.reducer";
import { clearCreateArea, queryCreateArea } from "@/store/reducers/location/createArea.reducer";
import { clearUpdateArea, queryUpdateArea } from "@/store/reducers/location/updateArea.reducer";
import { clearUpdateLocation, queryUpdateLocation } from "@/store/reducers/location/updateLocation.reducer";
import { clearCreateLocation, queryCreateLocation } from "@/store/reducers/location/createLocation.reducer";
import { queryGetListTimeSchedule } from "@/store/reducers/timeschedule/timeSchedule.reducer";
import { clearUpdateCandidate, queryUpdateCandidate } from "@/store/reducers/recruitment/updateCandidate.reducer";
import { clearPredictCandidate, queryPredictCandidate } from "@/store/reducers/recruitment/predictcandidate.reducer";
import { queryGetListClass } from "@/store/reducers/class/listClass.reducer";
import { clearUpdateTeacher, queryUpdateTeacher } from "@/store/reducers/teacher/updateTeacher.reducer";
import { clearUpdateTeacherRegisterCourse, queryUpdateTeacherRegisterCourse } from "@/store/reducers/teacher/updateTeacherRegisterCourse.reducer";
import { clearRequestOtpRQ, queryRequestOtp } from "@/store/reducers/account/requestOtpResetpassword.reducer";
import { clearResetPassword, queryResetPassword } from "@/store/reducers/account/resetPassword.reducer";
import { OpenDrawer, closeDrawer, openDrawer } from "@/store/reducers/global-reducer/drawer";
import { clearPropsRoute, setPropsRoute } from "@/store/reducers/global-reducer/propsRoute";
import { queryListDocument } from "@/store/reducers/document/getListDocument.reducer";
import { clearCreateDocument, queryCreateDocument } from "@/store/reducers/document/createDocument.reducer";
import { clearDeleteDocument, queryDeleteDocument } from "@/store/reducers/document/deleteDocument.reducer";
import { clearUpdateDocument, queryUpdateDocument } from "@/store/reducers/document/updateDocument.reducer";
import { queryGetTeById } from "@/store/reducers/te/getTeById.reducer";
import { clearUpdateTe, queryUpdateTe } from "@/store/reducers/te/updateTe.reducer";
import { queryGetDetailDoc } from "@/store/reducers/document/getDetailDoc.reducer";
import { clearCreateFolder, queryCreateFolder } from "@/store/reducers/folder/createFolder.reducer";
import { queryListFolder } from "@/store/reducers/folder/getListFolder.reducer";
import { queryListFile } from "@/store/reducers/file/getListFile.reducer";
import { clearCreateFile, queryCreateFile } from "@/store/reducers/file/createFile.reducer";
import { clearUpdateFolder, queryUpdateFolder } from "@/store/reducers/folder/updateFolder.reducer";
import { clearUpdateFile, queryUpdateFile } from "@/store/reducers/file/updateFile.reducer";
import { clearDeleteFolder, queryDeleteFolder } from "@/store/reducers/folder/deleteFolder.reducer";
import { clearDeleteFile, queryDeleteFile } from "@/store/reducers/file/deleteFile.reducer";
import { queryListCollectionQuiz } from "@/store/reducers/test/getListCollectionTest.reducer";
import { clearCreateCollectionQuiz, queryCreateCollectionQuiz } from "@/store/reducers/test/createCollectionQuiz.reducer";
import { clearCreateQuestion, queryCreateQuestion } from "@/store/reducers/test/createQuestion.reducer";
import { queryGetlistQuestion } from "@/store/reducers/test/getListQuestion.reducer";
import { RoomTest, emitRoomQuizzTestSocket, getDataFromRoomQuizzSocket, receivedDataFromRoomQuizz } from "@/store/reducers/socket/socketQuizzTest.reducer";
import { clearSaveRoomQuizzTest, querySaveRoomQuizzTest } from "@/store/reducers/test/saveRoomQuizzTest.reducer";
import { clearStudentJoin, queryStudentJoinRoomQuizz } from "@/store/reducers/test/studentJoinRoomQuizz.reducer";
import { clearCreateRequestOnleave, queryCreateRequestOnleave } from "@/store/reducers/requestOnLeave/createRequestOnLeave.reducer";
import { queryListRequestOnLeave } from "@/store/reducers/requestOnLeave/listRequestOnLeave.reducer";

const useGetListClass = () => {
    const listClass = useSelector((state: RootState) => (state.listClass as State).state);
    return listClass;
};
const useGetTimeSchedule = createHookQueryReducer('timeSchedule', queryGetListTimeSchedule);
const useGetListCourse = () => {
    const listCourse = useSelector((state: RootState) => (state.listCourse as State).state);
    const dispatch = useDispatch<AppDispatch>();
    const queryListCourse = () => {
        dispatch(queryGetListCourse());
    }
    return {
        listCourse: listCourse.response as Obj,
        queryListCourse,
        loading: listCourse.isLoading,
        success: listCourse.success
    };
}
const useGetLocations = () => {
    const locations = useSelector((state: RootState) => (state.locations as State).state);
    const dispatch = useDispatch<AppDispatch>();
    const queryLocations = () => {
        dispatch(queryGetLocations());
    }
    return {
        locations: locations.response as Obj,
        state: locations,
        queryLocations
    }
}
const useQueryBookTeacher = (action: 'GET' | 'ADD'): {
    data?: Action;
    query?: (params: string | Array<Obj>, fields?: Array<string>) => void;
    update?: (data: Obj, action: 'PUT' | 'DELETE' | 'UPDATE') => void;
    clear?: () => void;
} => {
    const dispatch = useDispatch<AppDispatch>();
    const dataGet = useSelector((state: RootState) => (state.bookTeacher as State).state);
    const dataAdd = useSelector((state: RootState) => (state.addRequestBookTeacher as State).state);
    switch (action) {
        case 'GET':
            const queryGet = (params: string | Array<Obj>, fields?: Array<string>) => {
                const payload: Action = {
                    payload: {
                        query: {
                            params: [params as string],
                            query: {
                                fields: fields || ['_id', 'classId', 'locationId', 'locationCode', 'locationDetail', 'groupNumber', 'teacherRegister', 'fullName', 'roleRegister', 'accept', 'salaryPH']
                            }
                        }
                    }
                }
                return dispatch(queryGetCurrentBookTeacher(payload));
            }
            return { data: dataGet, query: queryGet };
        case 'ADD':
            const queryAdd = (listRequest: Array<Obj> | string) => {
                const payload: Action = {
                    payload: {
                        query: {
                            body: {
                                listRequest
                            }
                        }
                    }
                };
                return dispatch(queryAddRequestBookTeacher(payload));
            }
            const clear = () => {
                return dispatch(clearAddRequest());
            }
            const update = (data: Obj, action: 'PUT' | 'DELETE' | 'UPDATE') => {
                if (action === 'PUT') {
                    return dispatch(updateListBookTeacher(data));
                }
            }
            return {
                data: dataAdd,
                query: queryAdd,
                clear,
                update
            }
    }
}
const useDetailClass = (action: 'GET' | 'ADD' | 'UPDATE' | 'CLEAR'): BaseInterfaceHookReducer => {
    const detailClass = useSelector((state: RootState) => (state.detailClass as State).state);
    const dispatch = useDispatch<AppDispatch>();
    switch (action) {
        case 'GET':
            return {
                data: detailClass,
                query(params) {
                    const payload: Action = {
                        payload: {
                            query: {
                                params: [params as string]
                            }
                        }
                    }
                    dispatch(queryDetailClass(payload));
                },
            }
    }
    const clear = () => {
        dispatch(clearDeatailClass());
    }
    return {
        data: detailClass,
        clear: clear()
    }
}
const useHandleTeacherInRCBT = () => {
    const dataHandle = useSelector((state: RootState) => (state.handleTeacherInRecordBT as State).state);
    const dispatch = useDispatch();
    const query = (payload: Action) => {
        dispatch(queryHandleTeacherInRecordBT(payload));
    }
    const clear = () => {
        dispatch(clearStateHanldeTeacherInRecordBT());
    }
    const removeTeacher = (teacherId: string, requestId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        options: 'REMOVE',
                        idTeacher: teacherId
                    },
                    params: [requestId]
                }
            }
        }
        dispatch(queryHandleTeacherInRecordBT(payload));
    }
    const update = (teacherId: string, updateTeacherId: string, role: ROLE_TEACHER, accept: boolean, requestId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        options: 'UPDATE',
                        idTeacher: teacherId,
                        role,
                        updateTeacherId,
                        accept
                    },
                    params: [requestId]
                }
            }
        }
        dispatch(queryHandleTeacherInRecordBT(payload));
    }
    return {
        dataHandle,
        query,
        clear,
        removeTeacher,
        update
    }
}

const useClassSession = () => {
    const classSession = useSelector((state: RootState) => (state.classSession as State).state);
    const dispatch = useDispatch();

    const queryGetClassSession = (classId: string, fields?: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [classId],
                    query: {
                        fields
                    }
                }
            }
        }
        dispatch(queryClassSession(payload));
    }
    return {
        classSession,
        queryGetClassSession
    }
};

const useUpdateClassBasicInfor = () => {
    const updated = useSelector((state: RootState) => (state.updateClassBasicInfor as State).state);
    const dispatch = useDispatch();

    const handleUpdate = (payload: Action) => {
        dispatch(queryUpdateClassBasicInfor(payload));
    }
    const clear = () => {
        dispatch(clearUpdatedDataClassBasicInfor());
    }
    return {
        updated,
        handleUpdate,
        clear
    }
}

const useListTeacher = () => {
    const listTeacher = useSelector((state: RootState) => (state.listTeacher as State).state);
    const dispatch = useDispatch();
    const query = (recordOnPage?: number, currentPage?: number, query?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        recordOnPage,
                        currentPage,
                        ...query
                    }
                }
            }
        }
        dispatch(queryGetListTeacher(payload));
    }
    return {
        listTeacher,
        query
    }
}

const useTeacherRegisterCourse = () => {
    const listData = useSelector((state: RootState) => (state.teacherRegisterCourse as State).state);
    const dispatch = useDispatch();
    const query = (listTeacherId?: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        listTeacherId
                    }
                }
            }
        }
        dispatch(queryTeacherRegisterCourse(payload));
    }
    return {
        listData,
        query
    }
}

const useTeacherTimeSchedule = () => {
    const listSchedule = useSelector((state: RootState) => (state.teacherSchedule as State).state);
    const dispatch = useDispatch();
    const queryGetListTeacherSchedule = (payload: Action) => {
        dispatch(queryTeacherSchedule(payload));
    }
    return {
        listSchedule,
        queryGetListTeacherSchedule
    }
}

const useGetAttendanceTeacher = () => {
    const data = useSelector((state: RootState) => (state.attendanceTeacherInClassSession as State).state);
    const dispatch = useDispatch();
    const queryGetData = (classId: string, sessionNumber: number) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        classId,
                        sessionNumber,
                        fields: ['checked', 'classSessionId', 'classId', 'date', 'isOH', 'ran', 'sessionNumber', '_id', 'teacherId', 'fullName', 'role', 'checked', 'locationId', 'bookTeacher', 'hours']
                    }
                }
            }
        }
        dispatch(queryAttendanceTeacherInClassSession(payload));
    }
    return {
        data,
        queryGetData
    }
}

const useGetListClassFeedback = () => {
    const data = useSelector((state: RootState) => (state.listClassActionFeedback as State).state);
    const dispatch = useDispatch();
    const query = (month: number, fields?: Array<string>, filter?: Obj) => {
        if (month > 13 || month < 1) return;
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        month,
                        fields,
                        ...filter
                    }
                }
            }
        }
        dispatch(queryListClassFeedbackView(payload));
    }
    return {
        data,
        query
    }
}
const useDebounce = (state: any, delayTime?: number) => {
    const [debouncedValue, setDebouncedValue] = useState(state);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(state), delayTime || 500)
        return () => {
            clearTimeout(timer)
        }
    }, [state, delayTime]);
    return debouncedValue;
};
const useUpdateClassFeedback = () => {
    const data = useSelector((state: RootState) => (state.updateClassForFeedback as State).state);
    const dispatch = useDispatch();
    const query = (feedbackId: string, field: string, value: boolean) => {
        const payload: Action = {
            payload: {
                query: {
                    body: {
                        [field]: value,
                    },
                    params: [feedbackId]
                }
            }
        }
        dispatch(queryUpdateClassForFeedback(payload));
    }
    const clear = () => {
        dispatch(clearResUpdateClassForFeedback());
    }
    return {
        success: data.success,
        query,
        clear
    }
}

const useListClassInFormFeedback = () => {
    const data = useSelector((state: RootState) => (state.listClassInFormFeedback as State).state);
    const dispatch = useDispatch();
    const query = (courseName: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        courseName
                    }
                }
            }
        }
        dispatch(queryGetListClassInFormFeedback(payload));
    }
    return {
        data,
        query
    }
}
const useGetListGroupClassInFormFeedback = () => {
    const data = useSelector((state: RootState) => (state.listGroupClassInFormFeedback as State).state);
    const dispatch = useDispatch();
    const query = (classId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [classId]
                }
            }
        }
        dispatch(queryGetListGroupClassInFormFeedback(payload));
    };
    return {
        data,
        query
    }
}
const useResponseFeedbackForStudent = () => {
    const data = useSelector((state: RootState) => (state.responseFeedback as State).state);
    const dispatch = useDispatch();
    const query = (body: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    body
                }
            }
        }
        dispatch(queryResponseFeedback(payload));
    };
    const clear = () => {
        dispatch(clearResponseFeedback());
    }
    return {
        data,
        query,
        clear
    }
}
const useGetListFeedback = () => {
    const data = useSelector((state: RootState) => (state.listResponseFeedback as State).state);
    const dispatch = useDispatch();
    const query = (rowOnPage?: number, currentPage?: number, query?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        fields: ['_id', 'studentName', 'phoneNumber', 'course', 'courseName', 'codeClass', 'courseId', 'groupNumber', 'groupNumber', 'pointCxo', 'pointST', 'pointMT', 'pointOb', 'pointSyl', 'docDetail', 'createdAt', 'time', 'feedbackId', 'time', 'teacherRegister'],
                        recordOnPage: rowOnPage,
                        currentPage,
                        ...query
                    }
                }
            }
        };
        dispatch(queryGetListResponseFeedback(payload));
    }
    return {
        data,
        query
    }
}
const useDispatchDataRouter = () => {
    const dispatch = useDispatch();
    return (combineRoute: string, title: string, replaceTitle: React.ReactElement | string, componentPage?: ComponentPage, hasBackPage?: boolean, moreData?: Obj) => {
        const payloadRouteFeedback: PayloadRoute = {
            payload: {
                route: combineRoute,
                title: title,
                replaceTitle: replaceTitle,
                hasBackPage: !!hasBackPage,
                component: componentPage,
                moreData
            }
        };
        dispatch(initDataRoute(payloadRouteFeedback));
    }
}
const useGetTeacherDetail = () => {
    const data = useSelector((state: RootState) => (state.detailTeacher as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string, fields: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [teacherId],
                    query: {
                        fields
                    }
                }
            }
        }
        dispatch(queryDetailTeacher(payload));
    }
    return {
        data,
        query
    }
}
const useClassTeacherRegister = () => {
    const data = useSelector((state: RootState) => (state.getClassTeacherRegister as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string, fields?: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [teacherId],
                    query: {
                        fields
                    }
                }
            }
        }
        dispatch(queryGetClassTeacherRegister(payload));
    }
    return {
        data,
        query
    }
}
const useGetPreTeacher = () => {
    const data = useSelector((state: RootState) => (state.preTeacher as State).state);
    const dispatch = useDispatch();

    const query = (recordOnPage: number, currentPage: number, fields?: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        recordOnPage,
                        currentPage,
                        fields
                    }
                }
            }
        }
        dispatch(queryPreTeacher(payload));
    }
    return {
        data,
        query
    }
}
const useAcceptPreTeacher = () => {
    const data = useSelector((state: RootState) => (state.acceptPreTeacher as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [teacherId]
                }
            }
        }
        dispatch(queryAcceptPreTeacher(payload));
    }
    const clear = () => {
        dispatch(clearAcceptPreTeacher());
    }
    return {
        data,
        query,
        clear,
    }
}
const useGetListFeedbackResponseForTeacher = () => {
    const data = useSelector((state: RootState) => (state.listResponseFeedbackForTeacher as State).state);
    const dispatch = useDispatch();
    const query = (teacherId: string, fields?: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        teacherId,
                        fields
                    }
                }
            }
        };
        dispatch(queryListResponseFeedbackForTeacher(payload));
    };
    return {
        data,
        query
    }
}
const useGetClassTeacherPonit = () => {
    const data = useSelector((state: RootState) => (state.classTeacherPoint as State).state);
    const dispatch = useDispatch();
    const query = (listClassId: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        listClassId: listClassId.toString()
                    }
                }
            }
        };
        dispatch(queryClassTeacherPoint(payload));
    };
    return {
        data,
        query
    }
}
const useGetListDataRecruitment = () => {
    const data = useSelector((state: RootState) => (state.recruitment as State).state);
    const dispatch = useDispatch();
    const query = (recordOnPage?: number, currentPage?: number, fields?: string[], condition?: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        recordOnPage,
                        currentPage,
                        fields: fields ?? ['_id', 'fullName', 'courseName', 'createdAt', 'updatedAt', 'email', 'phoneNumber', 'linkFacebook', 'linkCv', 'result', 'statusProcess', 'timeApply', 'roundProcess', 'sendMail', 'color'],
                        ...condition
                    }
                }
            }
        }
        dispatch(queryGetListDataRecruitment(payload));
    }
    return {
        data,
        query
    }
}
const useGetDetailCandidate = () => {
    const data = useSelector((state: RootState) => (state.detailCandidate as State).state);
    const dispatch = useDispatch();
    const query = (params: string[], fields?: string[]) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        fields
                    },
                    params
                }
            }
        }
        dispatch(queryDetailCandidate(payload));
    }
    return {
        data,
        query
    }
}
const useCreateCandidate = () => {
    const data = useSelector((state: RootState) => (state.createCandidate as State).state);
    const dispatch = useDispatch();
    const query = (body: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    body
                }
            }
        }
        dispatch(queryCreateCandidate(payload));
    }
    const clear = () => {
        dispatch(clearCreateCandidate());
    }
    return {
        data,
        query,
        clear
    }
}
const useCreateCourse = createHookQueryReducer('createCourse', queryCreateCourse, clearCreateCourse);
const useGetDetailCourse = () => {
    const data = useSelector((state: RootState) => (state.detailCourse as State).state);
    const dispatch = useDispatch();
    const query = (courseId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    params: [courseId]
                }
            }
        }
        dispatch(queryDetailCourse(payload));
    }
    return {
        data,
        query
    }
}
const useCreateLevelCourse = () => {
    const data = useSelector((state: RootState) => (state.createLevelCourse as State).state);
    const dispatch = useDispatch();
    const query = (body: Obj) => {
        const payload: Action = {
            payload: {
                query: {
                    body
                }
            }
        }
        dispatch(queryCreateLevelCourse(payload));
    }
    const clear = () => {
        dispatch(clearCreateLevelCourse());
    }
    return {
        data,
        query,
        clear
    }
}
const useUpdateCourse = () => {
    const data = useSelector((state: RootState) => (state.updateCourse as State).state);
    const dispatch = useDispatch();
    const query = (body: Obj, courseId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    body,
                    params: [courseId],
                    headers: {
                        "Content-Type": "mutilpart/form-data"
                    }
                },
            }
        }
        dispatch(queryUpdateCourse(payload));
    }
    const clear = () => {
        dispatch(clearUpdateCourse());
    }
    return {
        data,
        query,
        clear
    }
}
const useUpdateLevelCourse = () => {
    const data = useSelector((state: RootState) => (state.updateLevelCourse as State).state);
    const dispatch = useDispatch();
    const query = (body: Obj, levelId: string) => {
        const payload: Action = {
            payload: {
                query: {
                    body,
                    params: [levelId],
                    headers: {
                        "Content-Type": "mutilpart/form-data"
                    }
                }
            }
        }
        dispatch(queryUpdateLevelCourse(payload));
    }
    const clear = () => {
        dispatch(clearUpdateLevelCourse());
    }
    return {
        data,
        query,
        clear
    }
}
const useGetDataRoundProcess = () => {
    const data = useSelector((state: RootState) => (state.roundProcess as State).state);
    const dispatch = useDispatch();
    const query = (round: RoundProcess, listCandidateId: Array<string>, getAll?: boolean, fields?: string) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        listCandidateId: listCandidateId.toString(),
                        round,
                        fields: fields ?? 'candidateId,_id,result,processed,linkMeet,time,te,teName,positionTe,courseId,mailInterviewSent,mailResultSent,courseName,codeClass,formFirst,formSecond,locationFirst,locationSecond,locationCode,timeFirst,timeSecond,timeFirstDone,timeSecondDone,codeClass,doc',
                        getAll
                    }
                },
            }
        }
        dispatch(queryRoundProcessCandidate(payload));
    }
    return {
        data,
        query
    }
}
const useGetDataRoundComments = () => {
    const data = useSelector((state: RootState) => (state.roundComments as State).state);
    const dispatch = useDispatch();
    const query = (roundId: string, fields: Array<string>) => {
        const payload: Action = {
            payload: {
                query: {
                    query: {
                        roundId,
                        fields: fields.toString()
                    }
                }
            }
        }
        dispatch(queryRoundComments(payload));
    }
    return {
        data,
        query
    }
}
const useComparePositionTE = (...positionCompare: (keyof typeof PositionTe)[]) => {
    const data = useSelector((state: RootState) => (state.crrUserInfo as State).state);
    return positionCompare.includes((data.response?.data as Obj)?.position as PositionTe);
}
const useHandleDrawer = () => {
    const data = useSelector((state: RootState) => (state.drawer as State).state);
    const dispatch = useDispatch<AppDispatch>();
    const open = (props: OpenDrawer) => {
        dispatch(openDrawer(props));
    }
    const close = () => {
        dispatch(closeDrawer());
    }
    return {
        data,
        open,
        close
    }
}
const usePropsPassRoute = () => {
    const propsPassRoute = useSelector((state: RootState) => (state.propsPassRoute as State).state);
    const dispatch = useDispatch<AppDispatch>();
    const query = (payload: Obj) => {
        dispatch(setPropsRoute(payload));
    }
    const clear = () => {
        dispatch(clearPropsRoute());
    }
    return {
        data: propsPassRoute,
        query,
        clear
    }
}
const useComponentSize = (ref: MutableRefObject<any>) => {
    const [componentSize, setComponentSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const getComponentSize = () => {
            if (ref.current) {
                const width = ref.current.offsetWidth;
                const height = ref.current.offsetHeight;
                setComponentSize({ width, height });
            }
        };
        getComponentSize();
        const handleResize = () => {
            getComponentSize();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [ref]);

    return componentSize;
};
const useQuizzTestSocket = () => {
    const quizzTest = useSelector((state: RootState) => (state.quizzTestSocket as State).state);
    const dispatch = useDispatch<AppDispatch>();

    const receveidDataFromSocket = (data: Obj) => {
        dispatch(getDataFromRoomQuizzSocket(data));
    }
    const getDataFromRoomQuizz = (room: string, callBack: Function) => {
        return receivedDataFromRoomQuizz(room, callBack)
    }
    const queryRoom = (room: string, data: RoomTest) => {
        dispatch(emitRoomQuizzTestSocket({
            room,
            data
        }));
        getDataFromRoomQuizz(room, receveidDataFromSocket)
    }

    return {
        data: quizzTest,
        queryRoom,
    }
}

const useCreateCommentsRoundProcess = createHookQueryReducer('createComment', queryCreateComment, clearReducerCreateComment);
const useUpdateDataProcessRoundCandidate = createHookQueryReducer('updateDataRoundProcessCandidate', queryUpdateDataRoundProcessCandidate, clearQueryUpdateDataRoundProcessCandidate);
const useCreateDataRoundProcess = createHookQueryReducer('createDataRoundProcess', queryCreateDataRoundProcess);
const useFindGetAllTe = createHookQueryReducer('getAllTe', queryGetAllTe);
const useGetMailTemplate = createHookQueryReducer('mailTemplate', queryMailTemplate);
const useCreateMailTemplate = createHookQueryReducer('createMailTemplate', queryCreateMailTemplate, clearCreateMailTemplate);
const useUpdateMailTemplate = createHookQueryReducer('updateMailTemplate', queryUpdateMailTemplate, clearUpdateMailTemplate);
const useMailer = createHookQueryReducer('mailer', queryMailer, clearMailer);
const useGetCandidateOnboard = createHookQueryReducer('checkCandidateInfo', queryCheckCandidateInfo);
const useGetClautidForCandidateOnboard = createHookQueryReducer('getRoundClautid', queryGetRoundCalautid);
const useRegisterClautid = createHookQueryReducer('registerClautid', queryRegisterClautid, clearRegisterClautid);
const useCreateFeedbackClautid = createHookQueryReducer('createFeedbackClautid', queryCreateFeebackClautid, clearCreateFeedbackClautid);
const useGetFeedbackClautid = createHookQueryReducer('getFeedbackClautid', queryGetFeebackClautid);
const useUpdateClassClautid = createHookQueryReducer('updateClassClautid', queryUpdateClassClautid, clearQueryUpdateClassClautid);
const useGetCalendarTest = createHookQueryReducer('getCalendarTest', queryGetCalendar);
const useGenerateAttendanceTeacher = createHookQueryReducer('generateAttendanceTeacher', queryGenerateAttendanceTeacher, clearGenerateAttendanceTeacher);
const useGetArea = createHookQueryReducer('area', queryArea);
const useCreateArea = createHookQueryReducer('createArea', queryCreateArea, clearCreateArea);
const useUpdateArea = createHookQueryReducer('updateArea', queryUpdateArea, clearUpdateArea);
const useUpdateLocation = createHookQueryReducer('updateLocation', queryUpdateLocation, clearUpdateLocation);
const useCreateLocation = createHookQueryReducer('createLocation', queryCreateLocation, clearCreateLocation);
const useUpdateCandidate = createHookQueryReducer('updateCandidate', queryUpdateCandidate, clearUpdateCandidate);
const usePredictCandidate = createHookQueryReducer('predictCandidate', queryPredictCandidate, clearPredictCandidate);
const useListClass = createHookQueryReducer('listClass', queryGetListClass);
const useUpdateDetailTeacher = createHookQueryReducer('updateTeacher', queryUpdateTeacher, clearUpdateTeacher);
const useUpdateTeacherRegisterCourse = createHookQueryReducer('updateTeacherRegisterCourse', queryUpdateTeacherRegisterCourse, clearUpdateTeacherRegisterCourse);
const useRequestOtpRP = createHookQueryReducer('requestOtpRP', queryRequestOtp, clearRequestOtpRQ);
const useResetPassword = createHookQueryReducer('resetPassword', queryResetPassword, clearResetPassword);
const useGetListDocument = createHookQueryReducer('getListDocument', queryListDocument);
const useCreateDocument = createHookQueryReducer('createDocument', queryCreateDocument, clearCreateDocument);
const useDeleteDocument = createHookQueryReducer('deleteDocument', queryDeleteDocument, clearDeleteDocument);
const useUpdateDocument = createHookQueryReducer('updateDocument', queryUpdateDocument, clearUpdateDocument);
const useGetTeById = createHookQueryReducer('getTeById', queryGetTeById);
const useUpdateTeById = createHookQueryReducer('updateTe', queryUpdateTe, clearUpdateTe);
const usetGetDetailDoc = createHookQueryReducer('getDetailDoc', queryGetDetailDoc);
const useCreateFolder = createHookQueryReducer('createFolder', queryCreateFolder, clearCreateFolder);
const useUpdateFolder = createHookQueryReducer('updateFolder', queryUpdateFolder, clearUpdateFolder);
const useGetListFolder = createHookQueryReducer('listFolder', queryListFolder);
const useGetListFile = createHookQueryReducer('listFile', queryListFile);
const useCreateFile = createHookQueryReducer('createFile', queryCreateFile, clearCreateFile);
const useUpdateFile = createHookQueryReducer('updateFile', queryUpdateFile, clearUpdateFile);
const useDeleteFolder = createHookQueryReducer('deleteFolder', queryDeleteFolder, clearDeleteFolder);
const useDeleteFile = createHookQueryReducer('deleteFile', queryDeleteFile, clearDeleteFile);
const useSocketConnection = createHookQueryReducer('socketConnection', () => { });
const useListCollectionQuiz = createHookQueryReducer('listCollectionQuiz', queryListCollectionQuiz);
const useCreateCollectionQuiz = createHookQueryReducer('createCollectionQuiz', queryCreateCollectionQuiz, clearCreateCollectionQuiz);
const useCreateQuestionQuiz = createHookQueryReducer('createQuestion', queryCreateQuestion, clearCreateQuestion);
const useGetListQuestion = createHookQueryReducer('getListQuestion', queryGetlistQuestion);
const useSaveRoomQuizzTest = createHookQueryReducer('saveRoomQuizzTest', querySaveRoomQuizzTest, clearSaveRoomQuizzTest);
const useStudentJoinRoomQuizz = createHookQueryReducer('studentJoinRoomQuizz', queryStudentJoinRoomQuizz, clearStudentJoin);
const useCreateRequestOnLeave = createHookQueryReducer('createRequestOnLeave', queryCreateRequestOnleave, clearCreateRequestOnleave);
const useListRequestOnLeave = createHookQueryReducer('listRequestOnLeave', queryListRequestOnLeave);

export {
    useGetListClass,
    useGetTimeSchedule,
    useGetListCourse,
    useGetLocations,
    useQueryBookTeacher,
    useDetailClass,
    useHandleTeacherInRCBT,
    useClassSession,
    useUpdateClassBasicInfor,
    useListTeacher,
    useTeacherRegisterCourse,
    useTeacherTimeSchedule,
    useGetAttendanceTeacher,
    useGetListClassFeedback,
    useDebounce,
    useUpdateClassFeedback,
    useListClassInFormFeedback,
    useGetListGroupClassInFormFeedback,
    useResponseFeedbackForStudent,
    useGetListFeedback,
    useDispatchDataRouter,
    useGetTeacherDetail,
    useClassTeacherRegister,
    useGetPreTeacher,
    useAcceptPreTeacher,
    useGetListFeedbackResponseForTeacher,
    useGetClassTeacherPonit,
    useGetListDataRecruitment,
    useGetDetailCandidate,
    useCreateCandidate,
    useCreateCourse,
    useGetDetailCourse,
    useCreateLevelCourse,
    useUpdateCourse,
    useUpdateLevelCourse,
    useGetDataRoundProcess,
    useGetDataRoundComments,
    useCreateCommentsRoundProcess,
    useUpdateDataProcessRoundCandidate,
    useCreateDataRoundProcess,
    useFindGetAllTe,
    useGetMailTemplate,
    useCreateMailTemplate,
    useUpdateMailTemplate,
    useMailer,
    useGetCandidateOnboard,
    useGetClautidForCandidateOnboard,
    useRegisterClautid,
    useCreateFeedbackClautid,
    useGetFeedbackClautid,
    useUpdateClassClautid,
    useGetCalendarTest,
    useGenerateAttendanceTeacher,
    useGetArea,
    useCreateArea,
    useUpdateArea,
    useUpdateLocation,
    useCreateLocation,
    useComparePositionTE,
    useUpdateCandidate,
    usePredictCandidate,
    useListClass,
    useUpdateDetailTeacher,
    useUpdateTeacherRegisterCourse,
    useRequestOtpRP,
    useResetPassword,
    useHandleDrawer,
    usePropsPassRoute,
    useGetListDocument,
    useCreateDocument,
    useDeleteDocument,
    useUpdateDocument,
    useComponentSize,
    useGetTeById,
    useUpdateTeById,
    usetGetDetailDoc,
    useCreateFolder,
    useGetListFolder,
    useGetListFile,
    useCreateFile,
    useUpdateFolder,
    useUpdateFile,
    useDeleteFolder,
    useDeleteFile,
    useSocketConnection,
    useListCollectionQuiz,
    useCreateCollectionQuiz,
    useCreateQuestionQuiz,
    useGetListQuestion,
    useQuizzTestSocket,
    useSaveRoomQuizzTest,
    useStudentJoinRoomQuizz,
    useCreateRequestOnLeave,
    useListRequestOnLeave
}