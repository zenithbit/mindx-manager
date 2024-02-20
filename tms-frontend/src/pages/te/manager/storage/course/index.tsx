import { ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';
import ContainerPage from '@/layouts/containerPage/containerPage';

const ManagerClass = CreatePage('ManagerCourse', ROLE_USER.TE, ContainerPage);
export default ManagerClass;
