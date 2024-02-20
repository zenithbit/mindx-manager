import { ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const TeacherDetailClassPage = CreatePage('ManagerClass/Detail', ROLE_USER.TC, ContainerPage);
export default TeacherDetailClassPage;