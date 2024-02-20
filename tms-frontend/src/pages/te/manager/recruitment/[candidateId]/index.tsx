import CreatePage from '@/utils/hocs/ProviderPage';
import { ROLE_USER } from '@/global/enum';
import ContainerPage from '@/layouts/containerPage/containerPage';

const DetailCandidate = CreatePage('ManagerRecruitment/DetailCandidate', ROLE_USER.TE, ContainerPage);
export default DetailCandidate;