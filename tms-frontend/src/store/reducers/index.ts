import message from './global-reducer/message';
import test from './test.reducer';
import queryGetTokenUser from './auth-get-token.reducer';
import getCrrUserInfo from './user-info.reducer';
import courses from './course.reducer';
import registerPreTeacher from './registerPreTeacher.reducer';
import getDataRoute from './global-reducer/route';
import listClass from './class/listClass.reducer';
import listCourse from './course/listCourse.reducer';
import detailCourse from './course/detailCourse.reducer';
import createCourse from './course/createCourse.reducer';
import createLevelCourse from './course/createLevelCourse.reducer';
import updateLevelCourse from './course/updateLevelCourse.reducer';
import updateCourse from './course/updateCourse.reducer';
import timeSchedule from './timeschedule/timeSchedule.reducer';
import createClass from './class/createClass.reducer';
import bookTeacher from './class/bookTeacher.reducer';
import addRequestBookTeacher from './class/addRequestBookTeacher.reducer';
import detailClass from './class/detailClass.reducer';
import handleTeacherInRecordBT from './class/handleTeacherInRecordBT.reducer';
import locations from './location/localtion.reducer';
import searchTeacher from './searchTeacher.reducer';
import classSession from './class/classSesesion.reducer';
import classTeacherPoint from './class/classTeacherPoint.reducer';
import updateClassBasicInfor from './class/updateClassBasicInfor.reducer';
import listTeacher from './teacher/listTeacher.reducer';
import teacherRegisterCourse from './teacher/teacherRegisterCourse.reducer';
import detailTeacher from './teacher/detailTeacher.reducer';
import teacherSchedule from './teacher/teacherSchedule.reducer';
import getClassTeacherRegister from './teacher/getClassTeacherRegister.reducer';
import preTeacher from './teacher/preTeacher.reducer';
import acceptPreTeacher from './teacher/acceptPreTeacher.reducer';
import attendanceTeacherInClassSession from './class/attendanceTeacherInClassSession.reducer';
import listClassActionFeedback from './feedback/listClass.reducer';
import updateClassForFeedback from './feedback/updateClassForFeedback.reducer';
import listClassInFormFeedback from './feedback/listClassInGetFeedback.reducer';
import listGroupClassInFormFeedback from './feedback/listGroupInFormFeedback.reducer';
import responseFeedback from './feedback/responseFeedback.reducer';
import listResponseFeedback from './feedback/listResponseFeedback.reducer';
import listResponseFeedbackForTeacher from './feedback/listResponseFeedbackForTeacher.reducer';
import recruitment from './recruitment/recruitment.reducer';
import detailCandidate from './recruitment/detailCandidate.reducer';
import updateCandidate from './recruitment/updateCandidate.reducer';
import createCandidate from './recruitment/createCandidate.reducer';
import roundProcess from './recruitment/roundProcessCandidate.reducer';
import roundComments from './recruitment/roundComment.reducer';
import createComment from './recruitment/createComment.reducer';
import updateDataRoundProcessCandidate from './recruitment/updateDataRound.reducer';
import createDataRoundProcess from './recruitment/createDataRoundProcess.reducer';
import getAllTe from './te/getTe.reducer';
import mailTemplate from './mailTemplate/mailTemplate.reducer';
import createMailTemplate from './mailTemplate/createMailTemplate.reducer';
import updateMailTemplate from './mailTemplate/updateMailTemplate.reducer';
import mailer from './mailer.reducer';
import checkCandidateInfo from './candidateOnboard/checkCandidateInfo.reducer';
import getRoundClautid from './candidateOnboard/getRoundClautid.reducer';
import registerClautid from './candidateOnboard/registerClautid.reducer';
import createFeedbackClautid from './candidateOnboard/createFeedbackClautid.reducer';
import getFeedbackClautid from './candidateOnboard/getFeedbackClautid.reducer';
import updateClassClautid from './candidateOnboard/updateClassClautid.reducer';
import getCalendarTest from './candidateOnboard/getCalendarTest.reducer';
import generateAttendanceTeacher from './class/generateAttendanceTeacher.reducer';
import area from './location/area.reducer';
import createArea from './location/createArea.reducer';
import updateArea from './location/updateArea.reducer';
import updateLocation from './location/updateLocation.reducer';
import createLocation from './location/createLocation.reducer';
import predictCandidate from './recruitment/predictcandidate.reducer';
import updateTeacher from './teacher/updateTeacher.reducer';
import updateTeacherRegisterCourse from './teacher/updateTeacherRegisterCourse.reducer';
import resetPassword from './account/resetPassword.reducer';
import requestOtpRP from './account/requestOtpResetpassword.reducer';
import drawer from './global-reducer/drawer';
import propsPassRoute from './global-reducer/propsRoute';
import getListDocument from './document/getListDocument.reducer';
import createDocument from './document/createDocument.reducer';
import deleteDocument from './document/deleteDocument.reducer';
import updateDocument from './document/updateDocument.reducer';
import getTeById from './te/getTeById.reducer';
import updateTe from './te/updateTe.reducer';
import getDetailDoc from './document/getDetailDoc.reducer';
import createFolder from './folder/createFolder.reducer';
import updateFolder from './folder/updateFolder.reducer';
import listFolder from './folder/getListFolder.reducer';
import deleteFolder from './folder/deleteFolder.reducer';
import createFile from './file/createFile.reducer';
import deleteFile from './file/deleteFile.reducer';
import listFile from './file/getListFile.reducer';
import updateFile from './file/updateFile.reducer';
import socketConnection from './socket/socketConnection.reducer';
import listCollectionQuiz from './test/getListCollectionTest.reducer';
import createCollectionQuiz from './test/createCollectionQuiz.reducer';
import saveRoomQuizzTest from './test/saveRoomQuizzTest.reducer';
import createQuestion from './test/createQuestion.reducer';
import getListQuestion from './test/getListQuestion.reducer';
import studentJoinRoomQuizz from './test/studentJoinRoomQuizz.reducer';
import quizzTestSocket from './socket/socketQuizzTest.reducer';
import createRequestOnLeave from './requestOnLeave/createRequestOnLeave.reducer';
import listRequestOnLeave from './requestOnLeave/listRequestOnLeave.reducer';

const rootReducer = {
    test: test,
    message: message,
    token: queryGetTokenUser,
    crrUserInfo: getCrrUserInfo,
    courses: courses,
    registerPreTeacher,
    getDataRoute,
    listClass,
    timeSchedule,
    listCourse,
    createClass,
    locations,
    bookTeacher,
    addRequestBookTeacher,
    detailClass,
    searchTeacher,
    handleTeacherInRecordBT,
    classSession,
    updateClassBasicInfor,
    listTeacher,
    teacherRegisterCourse,
    teacherSchedule,
    attendanceTeacherInClassSession,
    listClassActionFeedback,
    updateClassForFeedback,
    listClassInFormFeedback,
    listGroupClassInFormFeedback,
    responseFeedback,
    listResponseFeedback,
    detailTeacher,
    getClassTeacherRegister,
    preTeacher,
    acceptPreTeacher,
    listResponseFeedbackForTeacher,
    classTeacherPoint,
    recruitment,
    detailCandidate,
    createCandidate,
    createCourse,
    detailCourse,
    createLevelCourse,
    updateCourse,
    updateLevelCourse,
    roundProcess,
    roundComments,
    createComment,
    updateDataRoundProcessCandidate,
    createDataRoundProcess,
    getAllTe,
    mailTemplate,
    createMailTemplate,
    updateMailTemplate,
    mailer,
    checkCandidateInfo,
    getRoundClautid,
    registerClautid,
    createFeedbackClautid,
    getFeedbackClautid,
    updateClassClautid,
    getCalendarTest,
    generateAttendanceTeacher,
    area,
    createArea,
    updateArea,
    updateLocation,
    createLocation,
    updateCandidate,
    predictCandidate,
    updateTeacher,
    updateTeacherRegisterCourse,
    resetPassword,
    requestOtpRP,
    drawer,
    propsPassRoute,
    getListDocument,
    createDocument,
    deleteDocument,
    updateDocument,
    getTeById,
    updateTe,
    getDetailDoc,
    createFolder,
    listFolder,
    createFile,
    listFile,
    updateFolder,
    updateFile,
    deleteFolder,
    deleteFile,
    socketConnection,
    listCollectionQuiz,
    createCollectionQuiz,
    createQuestion,
    getListQuestion,
    quizzTestSocket,
    saveRoomQuizzTest,
    studentJoinRoomQuizz,
    createRequestOnLeave,
    listRequestOnLeave
};
export default rootReducer;