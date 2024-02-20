import { arrayToTree } from 'performant-array-to-tree';
import { Obj } from "@/global/interface";

const findNearestParent = (tree: Obj[], key: string, parent: Obj | null = null): Obj | null => {
    for (const node of tree) {
        if (node.key === key) {
            return parent;
        }
        if (node.children) {
            const result = findNearestParent(node.children, key, node);
            if (result) {
                return result;
            }
        }
    }
    return null;
};
const listToTreeFnc = (listData: Obj[]) => {
    const newList: Obj[] = [...listData];
    for (let i = 0; i < newList.length; i++) {
        const e = newList[i];
        if (e.parent) {
            const checkHasParentInArray = newList.some(item => item._id === e.parent);
            if (!checkHasParentInArray) {
                delete e.parent
            }
        }
    }
    const tree = arrayToTree(newList, {
        id: '_id',
        parentId: 'parent',
        dataField: null,
    });
    return tree
}
const findRootNodeByPath = (listData: Obj[], childNodeKey: string): Obj | null | undefined => {
    const findNode = listData.find((item) => item._id === childNodeKey);
    if (findNode) {
        const findRootNode = listData.find((item) => {
            return String(findNode.path).includes(item.path) && String(item.path).split('/').length === 1;
        });
        return findRootNode as Obj;
    }
    return null;
}

const findCurrentNode = (nodeKey: string, listData: Obj[]) => {
    const crrNode = listData.findIndex(item => item.key === nodeKey || item._id === nodeKey);
    return listData[crrNode];
}

const mapNodeParentByPath = (nodeKey: string, listData: Obj[]): Obj[] => {
    const currentNode = findCurrentNode(nodeKey, listData);
    if (currentNode) {
        const listParent = String(currentNode.path).split('/')
        const getListParent = listParent.map((item) => {
            const dataParent = listData.find((data) => data._id === item);
            return dataParent;
        }).filter((item) => item);
        return getListParent as Obj[] || [];
    }
    return [];
}
export { findNearestParent, findCurrentNode, listToTreeFnc, findRootNodeByPath, mapNodeParentByPath };