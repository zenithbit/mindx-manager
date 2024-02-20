import { ROLE_USER } from "@/global/enum";
import CreatePage from "@/utils/hocs/ProviderPage";
import ContainerPage from "@/layouts/containerPage/containerPage";

const WelcomePage = CreatePage('Welcome', ROLE_USER.COMMON, ContainerPage);
export default WelcomePage;
