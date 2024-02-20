import * as yup from 'yup';
const bookTeacherSchema = yup.object({
    body: yup.object({
        listRequest: yup.array(
            yup.object({
                classId: yup.string().required('Chưa có id lớp!'),
                locationId: yup.string().required('Chưa có id cơ sở!'),
                groupNumber: yup.string().required('Chưa có thứ tự nhóm!')
            })
        ).required('Chưa có danh sách yêu cầu cơ sở!')
    })
});
export {
    bookTeacherSchema
}