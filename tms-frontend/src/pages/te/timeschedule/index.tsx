import { ROLE_USER } from "@/global/enum";
import CreatePage from "@/utils/hocs/ProviderPage";
import ContainerPage from "@/layouts/containerPage/containerPage";

const TimeSchedule = CreatePage('Timeschedule', ROLE_USER.TE, ContainerPage);

export default TimeSchedule;