import * as yup from 'yup';

const loginSchemaValidate = yup.object({
    body: yup.object({
        email: yup.string().email('Bạn cần nhập đúng định dạng email!').required('Bạn cần nhập email!'),
        password: yup.string().required('Bạn cần nhập mật khẩu!')
    }),
});

const createAccount = yup.object({
    body: yup.object({
        confirmPassword: yup.string().required('Bạn xác nhận mật khẩu!').oneOf([yup.ref('password')], 'Mật khẩu không khớp!'),
        password: yup.string().required('Bạn cần nhập mật khẩu!'),
        email: yup.string().email('Bạn cần nhập đúng định dạng email!').required('Bạn cần nhập email!'),
    }),
});

const resetPasswordAccount = yup.object({
    query: yup.object({
        otp: yup.string().required('Bạn cần gửi mã OTP!'),
        id: yup.string().required('Không có id tài khoản!'),
    }),
});

export {
    loginSchemaValidate,
    createAccount,
    resetPasswordAccount
}