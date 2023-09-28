import { Card, Spin, Tree, Row, Col, Input } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { getMenuList, MenuItem } from "@/apis/role";

const { Search } = Input;

const formatList = (list: MenuItem[], searchValue: string, level = 0) => {
  return list.map((item) => {
    const { menuName, path, children } = item;

    const index = menuName.indexOf(searchValue);
    const beforeStr = menuName.slice(0, Math.max(0, index));
    const afterStr = menuName.slice(index + searchValue.length);

    const title =
      index > -1 ? (
        <span>
          {beforeStr}
          <span className="text-original">{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{menuName}</span>
      );

    const node: DataNode = {
      key: path,
      title,
      icon: <span className="text-2xl">{level === 0 && children ? "📁" : "📄"}</span>,
      children: [],
    };

    if (children && children.length > 0) {
      node.children = formatList(children, searchValue, level + 1);
    }

    return node;
  });
};

type MenuDataNode = Omit<MenuItem, "children">;

const flattenChildren = <T, K extends keyof T>(arr: T[], key: K): Omit<T, K>[] => {
  return arr.reduce<Omit<T, K>[]>((acc, cur) => {
    const { [key]: children, ...rest } = cur;

    const value = children as unknown as T[];

    const flattenedChildren = children ? flattenChildren(value, key) : [];

    return [...acc, rest, ...flattenedChildren];
  }, []);
};

const MenuPage: FC = () => {
  const [loading, setLoading] = useState(false);
  const currentMenuList = useRef<MenuDataNode[]>([]);
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const treeData = useMemo(() => {
    return formatList(menuList, searchValue);
  }, [menuList, searchValue]);

  const onExpand = (newExpandedKeys: React.Key[]) => {
    setExpandedKeys(newExpandedKeys);
    setAutoExpandParent(false);
  };

  const fetchMenuList = async () => {
    try {
      setLoading(true);
      const res = await getMenuList();

      if (res.code !== 200) {
        throw new Error(res.message);
      }

      currentMenuList.current = flattenChildren(res.data, "children");

      setMenuList(res.data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = (value: string) => {
    const newExpandedKeys = currentMenuList.current
      .map((item) => {
        if (item.menuName.includes(value)) {
          return item.path;
        }

        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);

    setExpandedKeys(newExpandedKeys as React.Key[]);
    setSearchValue(value);
    setAutoExpandParent(true);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const onDrop: TreeProps["onDrop"] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    // eslint-disable-next-line no-console
    console.log(dropKey, dragKey, dropPos, dropPosition);

    // 如果拖拽的目标节点不在当前节点的子节点中，则取消拖拽操作
    // if (!node.pos.eventKey.startsWith(draggingNode?.key || "")) {
    //   event.preventDefault();
    // }
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Card className="w-full">
        <Row>
          <Col span={6}>
            <Search style={{ marginBottom: 8 }} placeholder="Search" allowClear onSearch={(value) => onSearch(value)} />
            <Tree
              showLine
              showIcon
              blockNode
              draggable
              treeData={treeData}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onDrop={onDrop}
            />
          </Col>
          <Col span={18}>
            <div className="py-smm px-xl">
              <div>详情</div>
            </div>
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default MenuPage;
