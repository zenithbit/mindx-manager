import { ComponentPage, KEY_ICON, PositionTe, ROLE_USER } from "@/global/enum";
import { SiderRoute } from "@/global/interface";
import CombineRoute from "@/global/route";

const siderByRole: Record<ROLE_USER, Array<SiderRoute>> = {
  TE: [
    {
      title: "Tổng quan",
      route: CombineRoute["TE"]["OVERVIEW"],
      keyIcon: "OV",
      indexroute: CombineRoute["TE"]["OVERVIEW"],
      noReplaceTitle: true,
      positionTE: PositionTe.LEADER
    },
    {
      title: "Tuyển dụng",
      route: 'RECRUITMENT',
      keyIcon: "RCM",
      indexroute: 'RECRUITMENT',
      notRouting: true,
      children: [
        {
          title: "Tuyển dụng",
          route: CombineRoute["TE"]["RECRUITMENT"],
          indexroute: CombineRoute["TE"]["RECRUITMENT"],
        },
        {
          title: "Chi tiết ứng viên",
          route: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
          indexroute: CombineRoute["TE"]["RECRUITMENT_DETAIL_CANDIDATE"],
          hasBackPage: true,
          hide: true
        },
        {
          title: "Lịch phỏng vấn",
          route: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
          indexroute: CombineRoute["TE"]["CALENDAR_INTERVIEW"],
        },
        {
          title: "Tạo hồ sơ ứng viên",
          route: CombineRoute["TE"]["RECRUITMENT_CREATE_CANDIDATE"],
          indexroute: CombineRoute["TE"]["RECRUITMENT_CREATE_CANDIDATE"],
          hide: true,
          hasBackPage: true
        },
      ]
    },
    {
      title: "Giáo viên",
      route: "TEACHER",
      indexroute: "TEACHER",
      keyIcon: "TC",
      children: [
        {
          route: CombineRoute["TE"]["MANAGER"]["TEACHER"],
          indexroute: CombineRoute["TE"]["MANAGER"]["TEACHER"],
          title: "Danh sách",
        },
        {
          route: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
          indexroute: CombineRoute["TE"]["MANAGER"]["DETAILTEACHER"],
          title: "Chi tiết giáo viên",
          hide: true,
          hasBackPage: true,
          component: ComponentPage.TEACHER_DETAIL
        },
        {
          route: CombineRoute["TE"]["MANAGER"]["REQUEST_ONLEAVE"],
          indexroute: CombineRoute["TE"]["MANAGER"]["REQUEST_ONLEAVE"],
          title: "Thông tin off",
        },
      ]
    },
    {
      title: "Lớp học",
      route: CombineRoute["TE"]["MANAGER"]["CLASS"],
      indexroute: CombineRoute["TE"]["MANAGER"]["CLASS"],
      keyIcon: "HTS"
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      indexroute: CombineRoute["TE"]["MANAGER"]["DETAILCLASS"],
      hide: true,
      hasBackPage: true,
      component: ComponentPage.DETAILCLASS,
    },
    {
      title: "Lưu trữ",
      route: "STORAGE",
      indexroute: "STORAGE",
      keyIcon: "FD",
      notRouting: true,
      children: [
        {
          title: "Tài liệu",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["DOCUMENT"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["DOCUMENT"],
        },
        {
          title: "Khoá học",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE"],
        },
        {
          title: "Chi tiết khoá học",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE_DETAIL"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["COURSE_DETAIL"],
          hide: true,
          hasBackPage: true,
          component: ComponentPage.COURSE_DETAIL
        },
        {
          title: "Bộ trắc nghiệm",
          route: CombineRoute["TE"]["MANAGER"]["STORAGE"]["TEST_COURSE"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STORAGE"]["TEST_COURSE"],
          hide: true,
          hasBackPage: true
        }
      ]
    },
    {
      title: "Cơ sở",
      route: "LOCATION",
      indexroute: "LOCATION",
      keyIcon: "LOCATION",
      children: [
        {
          title: "Khu vực",
          route: CombineRoute["TE"]["AREA"],
          indexroute: CombineRoute["TE"]["AREA"],
        },
        {
          title: "Danh sách",
          route: CombineRoute["TE"]["LOCATION"],
          indexroute: CombineRoute["TE"]["LOCATION"],
        },
      ]
    },
    {
      title: "Giờ học",
      keyIcon: "TIMESCHEDULE",
      route: CombineRoute["TE"]["TIMESCHEDULE"],
      indexroute: CombineRoute["TE"]["TIMESCHEDULE"],
    },
    {
      title: "Feedback",
      keyIcon: "MS",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      indexroute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
    },
    {
      title: "Mẫu mail",
      keyIcon: "MAIL",
      route: CombineRoute["TE"]["MANAGER"]["TEMPLATE_MAIL"],
      indexroute: CombineRoute["TE"]["MANAGER"]["TEMPLATE_MAIL"],
      positionTE: PositionTe.LEADER
    },
    {
      title: "TE",
      keyIcon: "EMPLOYEE",
      route: "",
      indexroute: "",
      children: [
        {
          title: "Danh sách",
          route: CombineRoute["TE"]["MANAGER"]["STAFF"],
          indexroute: CombineRoute["TE"]["MANAGER"]["STAFF"],
        },
        {
          title: "Báo cáo",
          route: CombineRoute["TE"]["MANAGER"]["REPORT"],
          indexroute: CombineRoute["TE"]["MANAGER"]["REPORT"],
        },
        {
          title: "Thông tin TE",
          route: CombineRoute['TE']['MANAGER']['STAFF_INFO'],
          showIcon: false,
          indexroute: CombineRoute['TE']['MANAGER']['STAFF_INFO'],
          hide: true,
          component: ComponentPage.TE_STAFF,
          hasBackPage: true,
          noReplaceTitle: true
        },
      ]
    },
    {
      title: "Thông tin cá nhân",
      keyIcon: "IF",
      route: CombineRoute["TE"]["MY_INFO"],
      indexroute: CombineRoute["TE"]["MY_INFO"],
      hide: true
    }
  ],
  TEACHER: [
    {
      title: "Thông tin giáo viên",
      route: CombineRoute["TEACHER"]["TEACHERINFO"],
      keyIcon: KEY_ICON.TC,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["TEACHERINFO"],
      component: ComponentPage.TEACHERS,
    },
    {
      title: "Lớp học",
      route: CombineRoute["TEACHER"]["CLASS"],
      keyIcon: KEY_ICON.HTS,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["CLASS"],
      component: ComponentPage.MANAGER_CLASS,
    },
    {
      title: "Chi tiết lớp học",
      route: CombineRoute["TEACHER"]["DETAILCLASS"],
      indexroute: CombineRoute["TEACHER"]["DETAILCLASS"],
      hide: true,
      keyIcon: KEY_ICON.HTS,
      component: ComponentPage.DETAILCLASS,
    },
    {
      title: "Khoá Học",
      route: CombineRoute["TEACHER"]["COURSE"],
      keyIcon: KEY_ICON.CR,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["COURSE"],
      component: ComponentPage.MANAGER_COURSE,
    },
    {
      title: "Chi tiết",
      route: CombineRoute["TEACHER"]["COURSE_DETAIL"],
      indexroute: CombineRoute["TEACHER"]["COURSE_DETAIL"],
      component: ComponentPage.COURSE_DETAIL,
      hide: true,
    },
    {
      title: "Cơ sở",
      route: CombineRoute["TEACHER"]["LOCATION"],
      keyIcon: KEY_ICON.LOCATION,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["LOCATION"],
      component: ComponentPage.LOCATION,
    },
    {
      title: "Lịch",
      route: CombineRoute["TEACHER"]["CALENDAR"],
      keyIcon: KEY_ICON.CL,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["CALENDAR"],
      component: ComponentPage.CALENDAR,
    },
    {
      title: "Feedback",
      route: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      indexroute: CombineRoute["TE"]["MANAGER"]["FEEDBACK"],
      hide: true,
      component: ComponentPage.MANAGER_FEEDBACK,
    },
    {
      title: "Tài liệu chung",
      route: CombineRoute["TEACHER"]["GENERAL_DOCUMENT"],
      keyIcon: KEY_ICON.IF,
      showIcon: true,
      indexroute: CombineRoute["TEACHER"]["GENERAL_DOCUMENT"],
      component: ComponentPage.DOCUMENT,
    },
  ],
  COMMON: []
};
export { siderByRole };
