import mongoose from "mongoose";
import { Collections } from "../../database";
import { Education, GENDER, LevelTechnique, ObjectTeach, ROLE_TEACHER, ResourceApply, ResultInterview, RoundProcess, StatusProcessing } from "../../global/enum";

const recruimentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    timeApply: {
        type: Date,
        required: true
    },
    courseApply: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.COURSE,
        required: true
    },
    levelTechnique: {
        type: String,
        enum: LevelTechnique,
        required: true
    },
    phoneNumber: String,
    linkFacebook: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: Date,
    roleApply: {
        type: String,
        enum: ROLE_TEACHER,
        required: true
    },
    note: String,
    resourceApply: {
        type: String,
        enum: ResourceApply,
        required: true
    },
    linkCv: {
        type: String,
        required: true
    },
    expTimeTech: {
        type: Number,
        required: true
    },
    jobPosition: {
        type: String,
        required: true
    },
    scoreJobPosition: {
        type: Number,
        required: true,
        max: 10,
        default: 0
    },
    scoreSoftsSkill: {
        type: Number,
        required: true,
        max: 5
    },
    // đã tốt nghiệp đại học
    graduatedUniversity: {
        type: Boolean,
        required: true
    },
    // học vấn? thạc sĩ, tiến sĩ, nghiên cứu sinh, kỹ sư
    education: {
        type: String,
        required: true,
        enum: Education,
    },
    // chuyên ngành it
    specializedIt: {
        type: Boolean,
        required: true
    },
    // công nghệ sử dụng
    technique: {
        type: String,
        required: true
    },
    scoreTechnique: {
        type: Number,
        required: true,
        max: 10,
        default: 0
    },
    gender: {
        type: String,
        enum: GENDER,
        default: GENDER.NA
    },
    teacherCertification: {
        type: Boolean,
        required: true
    },
    expTimeTeach: {
        type: Number,
        required: true
    },
    objectExpTeach: {
        type: String,
        required: true,
        enum: ObjectTeach
    },
    statusProcess: {
        type: String,
        enum: StatusProcessing,
        required: true
    },
    result: {
        type: String,
        enum: ResultInterview,
        default: ResultInterview.PENDING
    },
    sendMail: {
        type: Boolean,
        default: false
    },
    roundProcess: {
        type: String,
        enum: RoundProcess,
        required: true,
        default: RoundProcess.CV
    },
    fillForm: {
        type: Boolean,
        default: false
    },
    area: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.AREA,
        required: true
    },
    classifyLevel: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: Collections.COURSELEVEL
    },
    classifyRole: {
        type: String,
        enum: ROLE_TEACHER,
    },
    interviewDate: {
        type: Date
    },
    failCVDate: {
        type: Date
    }
},
    {
        timestamps: true
    }
);
const RecruitmentModel = mongoose.model(Collections.RECRUITMENT, recruimentSchema);
export default RecruitmentModel;