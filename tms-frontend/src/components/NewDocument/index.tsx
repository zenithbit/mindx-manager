import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CloseOutlined,
  FolderOpenOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import { Breadcrumb, TabsProps } from "antd";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Obj } from "@/global/interface";
import {
  useComparePositionTE,
  useGetListFile,
  useGetListFolder,
} from "@/utils/hooks";
import Expand from "@/icons/Expand";
import Tabs from "../Tabs";
import NewDocument from "./NewDocument";
import { mapNodeParentByPath } from "./config";
import styles from "@/styles/Document.module.scss";

const ContainerDocument = () => {
  const listFolder = useGetListFolder();
  const listFile = useGetListFile();
  const getListFolder = (listFolder.data.response?.data as Obj[]) || [];
  const getListFile = (listFile.data.response?.data as Obj[]) || [];
  const mappingListData = [...getListFolder, ...getListFile];
  const hasRoleMg = useComparePositionTE("ASSISTANT", "HR", "LEADER", "QC");
  const [currentNode, setCurrentNode] = useState<string>("");
  const handle = useFullScreenHandle();
  const getCurrentNode = useMemo(() => {
    return mapNodeParentByPath(currentNode, mappingListData);
  }, [currentNode, getListFolder, getListFile]) as Obj[];
  const tabs: TabsProps["items"] = [
    {
      key: "ALL",
      label: "Tất cả",
    },
    {
      key: "BIN",
      label: "Thùng rác",
    },
  ];
  const [tab, setTab] = useState<string>(tabs[0].key);
  useEffect(() => {
    listFolder.query({
      query: {
        isDeleted: tab === "BIN" ? 1 : 0,
      },
    });
    listFile.query({
      query: {
        isDeleted: tab === "BIN" ? 1 : 0,
      },
    });
  }, [tab]);
  return (
    <FullScreen
      handle={handle}
      className={`${styles.containerDocument} ${!hasRoleMg && styles.anRole} ${
        handle.active && styles.isFullScreen
      }`}
    >
      <div
        className={styles.expand}
        onClick={() => {
          if (!handle.active) {
            handle.enter();
          } else {
            handle.exit();
          }
        }}
      >
        {handle.active ? <CloseOutlined /> : <FullscreenOutlined />}
      </div>
      {hasRoleMg && (
        <Tabs
          notAllowContent
          listItemTab={tabs}
          onClickTab={(key) => {
            setTab(key);
          }}
        />
      )}
      <div className={styles.breadCumb}>
        <Breadcrumb
          items={getCurrentNode.map((item) => {
            return {
              title: (
                <span className={styles.flexIconBreadCumb}>
                  {item?.type === "FOLDER" && <FolderOpenOutlined />}
                  {item?.name}
                </span>
              ),
            };
          })}
        />
      </div>
      <NewDocument
        listNode={getCurrentNode}
        onBin={hasRoleMg && tab === "BIN"}
        setCurrentNode={setCurrentNode}
      />
    </FullScreen>
  );
};

export default ContainerDocument;
