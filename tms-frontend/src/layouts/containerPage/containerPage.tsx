import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import ResizeObserver from "react-resize-observer";
import { useRouter } from "next/router";
import Image from "next/image";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { ComponentPage, KEY_ICON, PositionTe, ROLE_USER } from "@/global/enum";
import { Obj, SiderRoute, State } from "@/global/interface";
import CombineRoute from "@/global/route";
import { MapIconKey } from "@/global/icon";
import { getLabelPositionTe } from "@/global/init";
import { logout } from "@/utils";
import { useGetListCourse } from "@/utils/hooks";
import useGetDataRoute from "@/utils/hooks/getDataRoute";
import { AppDispatch, RootState } from "@/store";
import {
  PayloadRoute,
  initDataRoute,
} from "@/store/reducers/global-reducer/route";
import PageHeader from "@/components/PageHeader";
import { siderByRole } from "./tab";
import Loading from "@/components/loading";
import Empty from "@/components/Empty";
import logo from "@/assets/imgs/mindx.png";
import { Layout } from "antd";
const { Sider, Content } = Layout;
import styles from "@/styles/ContainerPage.module.scss";

interface Props {
  children: React.ReactElement;
}
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  route: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key: route,
    icon,
    children,
    label,
  } as Obj as MenuItem;
}
export const findRoute = (
  listRoute: SiderRoute[],
  currentRoute: string
): any => {
  if (listRoute)
    for (const element of listRoute) {
      if (element.indexroute === currentRoute) {
        return element;
      }
      if (element.children && element.children.length > 0) {
        // Gọi đệ quy để kiểm tra trong children
        const foundInChildren = findRoute(element.children, currentRoute);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }
  return null;
};
const ContainerPage = (props: Props) => {
  const getRolePage = (props.children.type as Obj).Role as ROLE_USER;
  const [loadingForCheckRole, setLoadingForCheckRole] = useState<boolean>(true);
  const crrUser = useSelector(
    (state: RootState) => (state.crrUserInfo as State).state
  );
  const siderRef = useRef(null);
  const [siderSize, setSiderSize] = useState<number>(0);
  const [containerSize, setContainerSize] = useState<number>(0);
  const crrRole = (crrUser.response as Obj)?.data?.roleAccount as ROLE_USER;
  const course = useGetListCourse();
  const mappingTab = siderByRole[crrRole];
  const items: MenuItem[] = mappingTab?.map((item) => {
    return !item.hide
      ? getItem(
          item.title,
          item.route,
          MapIconKey[item.keyIcon as KEY_ICON],
          item.children?.map((child) => {
            if (!child.hide) {
              return getItem(
                child.title,
                child.route,
                MapIconKey[child.keyIcon as KEY_ICON]
              );
            } else return null;
          })
        )
      : null;
  });
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const routeStore = useGetDataRoute();

  const getCourseTe = (course.listCourse?.data as Array<Obj>)?.find((item) => {
    return (
      ((crrUser.response as Obj)?.data?.courseId?._id as string) === item._id
    );
  });
  const badgeMoreAction: MenuProps["items"] = [
    {
      key: "LOG_OUT",
      label: "Đăng xuất",
      onClick() {
        logout();
      },
    },
    ...(crrRole !== ROLE_USER.TC
      ? [
          {
            key: "PERSONAL_INFO",
            label: "Cá nhân",
            onClick() {
              router.push("/te/my-info");
            },
          },
        ]
      : []),
  ];
  const refRoute = useRef<PayloadRoute>({
    payload: {
      route: mappingTab?.[0]?.route,
      title: mappingTab?.[0]?.title as React.ReactElement,
      icon: mappingTab?.[0]?.keyIcon as KEY_ICON,
      component: mappingTab?.[0]?.component,
    },
  });
  useEffect(() => {
    if (refRoute.current.payload.route !== router.route) {
      const findTabRoute = findRoute(mappingTab, router.route);
      if (router.route === "/") {
        refRoute.current.payload = {
          route: "/",
          title: "Chào mừng đến với hệ thống",
          hasBackPage: false,
          component: ComponentPage.WELCOME,
        };
      } else {
        if (findTabRoute) {
          refRoute.current.payload = {
            route: findTabRoute.indexroute,
            title: findTabRoute.title as React.ReactElement,
            icon: findTabRoute.keyIcon as KEY_ICON,
            replaceTitle: findTabRoute.noReplaceTitle
              ? (findTabRoute.label as React.ReactElement)
              : (routeStore?.replaceTitle as React.ReactElement),
            hasBackPage:
              findTabRoute.hasBackPage ??
              (findTabRoute.noReplaceTitle ? false : true),
            moreData: findTabRoute.noReplaceTitle
              ? undefined
              : routeStore?.moreData,
            component: findTabRoute.component,
          };
        } else {
          refRoute.current.payload = {
            route: CombineRoute["EMPTY"],
            title: "Lỗi" as unknown as React.ReactElement,
            replaceTitle: "Lỗi" as unknown as React.ReactElement,
            hasBackPage: false,
            moreData: undefined,
            component: undefined,
          };
        }
      }
    }
    dispatch(initDataRoute(refRoute.current));
  }, [router.route]);
  useEffect(() => {
    if (!course.listCourse && getRolePage === ROLE_USER.TE) {
      course.queryListCourse();
    }
  }, [course.listCourse]);
  useEffect(() => {
    if (crrRole) {
      if (getRolePage !== ROLE_USER.COMMON && getRolePage !== crrRole) {
        router.push("/404");
      } else {
        setLoadingForCheckRole(false);
      }
    }
  }, [crrUser]);
  if (loadingForCheckRole) return <Loading isCenterScreen onFirstLoad />;
  return (
    <div className={styles.containerPage}>
      <ResizeObserver
        onResize={(rect) => {
          setContainerSize(rect.width);
        }}
      />
      <Sider
        ref={siderRef}
        collapsed={collapsed}
        className={`${styles.navTab} ${styles.bgWhite} customCollapseSider`}
        onCollapse={(value) => setCollapsed(value)}
      >
        <ResizeObserver
          onResize={(rect) => {
            setSiderSize(rect.width);
          }}
        />
        <div
          className={styles.toggleBar}
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
        </div>
        <div className={styles.logo}>
          <Image src={logo} alt="" className={styles.imgLogo} />
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={(info) => {
            const getRoute = info.key;
            const currentRoute = findRoute(mappingTab, getRoute);
            if (currentRoute) {
              router.push(currentRoute.route);
            }
          }}
        />
        <div className={styles.badge}>
          <Avatar
            size="large"
            src={(crrUser.response as Obj)?.data?.img as string}
          />
          {!collapsed && (
            <div className={styles.user}>
              <p>
                {((crrUser.response as Obj)?.data?.teName as string) ||
                  ((crrUser.response as Obj)?.data?.fullName as string)}
              </p>
              <span className={styles.role}>
                {((crrUser.response as Obj)?.data?.roleAccount as ROLE_USER) ===
                ROLE_USER.TE
                  ? `${
                      getLabelPositionTe[
                        (crrUser.response as Obj)?.data
                          ?.positionTe as PositionTe
                      ]
                    }${
                      getCourseTe?.courseName
                        ? ` ${getCourseTe?.courseName}`
                        : ""
                    }`
                  : ((crrUser.response as Obj)?.data?.roleAccount as ROLE_USER)}
              </span>
            </div>
          )}
          <Dropdown
            menu={{ items: badgeMoreAction }}
            trigger={["click"]}
            placement="top"
          >
            <span className={styles.moreAction}>
              {MapIconKey[KEY_ICON.DOT3VT]}
            </span>
          </Dropdown>
        </div>
      </Sider>
      <div
        className={`${styles.mainColumn} ${
          collapsed ? styles.inCollapsed : ""
        }`}
        style={{ maxWidth: containerSize - Math.floor(siderSize) - 50 }}
      >
        <PageHeader />
        <div className={`${styles.mainChild} ${styles.bgWhite}`}>
          {routeStore?.route === "/empty" ? <Empty /> : props.children}
        </div>
      </div>
    </div>
  );
};

export default ContainerPage;
