import { ROLE_USER } from "@/global/enum";
import CreatePage from "@/utils/hocs/ProviderPage";
import ContainerPage from "@/layouts/containerPage/containerPage";

const TeacherCoursePage = CreatePage('ManagerCourse', ROLE_USER.TC, ContainerPage);

export default TeacherCoursePage;