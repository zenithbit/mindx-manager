import { ROLE_USER } from "@/global/enum";
import ContainerPage from "@/layouts/containerPage/containerPage";
import CreatePage from "@/utils/hocs/ProviderPage";

const MyInfoPage = CreatePage("TEs/DetailTe/PersonalInfo", ROLE_USER.TE, ContainerPage);

export default MyInfoPage