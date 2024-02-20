import ContainerPage from '@/layouts/containerPage/containerPage';
import { ROLE_USER } from '@/global/enum';
import CreatePage from '@/utils/hocs/ProviderPage';

const OverView = CreatePage('OverView', ROLE_USER.TE, ContainerPage);

export default OverView;