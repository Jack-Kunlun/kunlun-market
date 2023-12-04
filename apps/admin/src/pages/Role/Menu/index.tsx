import { PlusOutlined } from "@ant-design/icons";
import { Card, Spin, Tree, Row, Col, Input, message, Space, Divider, Button, Tooltip, Form, Select } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import dayjs from "dayjs";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { getMenuList, MenuItem } from "@/apis/role";
import DynamicIcon from "@/components/DynamicIcon";
import type { IconName } from "@/components/DynamicIcon";
import { IconSelect } from "@/components/IconSelect";

const { Search } = Input;

type MenuDataNode = Omit<MenuItem, "children">;

const formatList = (list: MenuItem[], searchValue: string, handleAdd: (menu: MenuDataNode) => void, level = 0) => {
  return list.map((item) => {
    const { menuName, path, children } = item;

    const titleString = () => {
      if (searchValue) {
        const index = menuName.indexOf(searchValue);
        const beforeStr = menuName.slice(0, Math.max(0, index));
        const afterStr = menuName.slice(index + searchValue.length);

        return (
          <span>
            {beforeStr}
            <span className="text-original">{searchValue}</span>
            {afterStr}
          </span>
        );
      }

      return <span>{menuName}</span>;
    };

    const title = (
      <div className="w-full h-full flex items-center group hover:cursor-pointer">
        <span className="text-2xl">{level === 0 && children ? "📁" : "📄"}</span>
        <div className="flex-1 px-smm">{titleString()}</div>
        <div className="invisible group-hover:visible pr-sm">
          <Tooltip title="增加菜单">
            <PlusOutlined
              onClick={(e) => {
                handleAdd(item);
                e.stopPropagation();
                e.preventDefault();
              }}
            />
          </Tooltip>
        </div>
      </div>
    );

    const node: DataNode = {
      key: path,
      title,
      // icon: <span className="text-2xl">{level === 0 && children ? "📁" : "📄"}</span>,
      children: [],
    };

    if (children && children.length > 0) {
      node.children = formatList(children, searchValue, handleAdd, level + 1);
    }

    return node;
  });
};

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

  const [status, setStatus] = useState<"add" | "edit" | "detail">("detail");

  const [selectMenu, setSelectMenu] = useState<MenuDataNode>();

  const handleAdd = (menu: MenuDataNode) => {
    setSelectMenu(menu);
    setStatus("add");
  };

  const treeData = useMemo(() => {
    return formatList(menuList, searchValue, handleAdd);
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

  const onDrop: TreeProps["onDrop"] = (info) => {
    // 当前拖拽节点的 key
    // const dragKey = info.dragNode.key;
    const dragPos = info.dragNode.pos.split("-");

    // 放置目标节点的 key
    // const dropKey = info.node.key;
    // 放置位置
    const dropPos = info.node.pos.split("-");
    // 具体排序
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const menu = [...menuList];

    if (dragPos.length === 3) {
      if (dragPos[1] !== dropPos[1]) {
        message.error("只能在同一级菜单内拖拽");

        return;
      }

      const dragMenu = menu[Number(dragPos[1])].children?.[Number(dragPos[2])];
      // const dropMenu = menu[Number(dropPos[1])].children?.[Number(dropPos[2]) || 0];

      menu[Number(dragPos[1])].children?.splice(Number(dragPos[2]), 1);
      menu[Number(dropPos[1])].children?.splice(Number(dropPos[2]) + dropPosition, 0, dragMenu);

      setMenuList(menu);
    }

    if (dragPos.length === 2) {
      const dragMenu = menu[Number(dragPos[1])];
      const dropMenu = menu[Number(dropPos[1])];

      menu[Number(dragPos[1])] = dropMenu;
      menu[Number(dropPos[1])] = dragMenu;

      setMenuList(menu);
    }
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeys, _) => {
    const menu = currentMenuList.current.find((item) => item.path === selectedKeys[0]);

    setStatus("detail");
    setSelectMenu(menu);
  };

  useEffect(() => {
    fetchMenuList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Card className="w-full">
        <Row>
          <Col span={8}>
            <Search style={{ marginBottom: 8 }} placeholder="Search" allowClear onSearch={(value) => onSearch(value)} />
            <Tree
              showLine
              showIcon
              blockNode
              draggable={{ icon: false }}
              treeData={treeData}
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onDrop={onDrop}
              onSelect={onSelect}
            />
          </Col>
          <Col span={16}>
            <div className="px-xl">
              {status === "add" && (
                <Form labelCol={{ span: 4 }} labelAlign="left" wrapperCol={{ span: 12 }}>
                  <div className="flex items-center justify-between mb-md">
                    <div className="text-[20px] font-semibold">新增菜单</div>
                    <Space>
                      <Button type="primary">保存</Button>
                    </Space>
                  </div>

                  <Form.Item name="menuName" label="菜单名称" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="path" label="菜单路径" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="menuCode" label="菜单编码" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="icon" label="图标" rules={[{ required: true }]}>
                    <IconSelect />
                  </Form.Item>
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                </Form>
              )}
              {status === "detail" && selectMenu && (
                <>
                  <div className="flex items-center justify-between mb-md">
                    <div className="text-[20px] font-semibold">菜单详情</div>
                    <Space>
                      <Button type="primary" ghost>
                        修改
                      </Button>
                      <Button type="primary" danger>
                        删除
                      </Button>
                    </Space>
                  </div>

                  <div className="flex py-sm">
                    <div>菜单名称：</div>
                    <div>{selectMenu.menuName}</div>
                  </div>
                  <Divider className="my-smm" />
                  <div className="flex py-sm">
                    <div>菜单路径：</div>
                    <div>{selectMenu.path}</div>
                  </div>
                  <Divider className="my-smm" />
                  <div className="flex py-sm">
                    <div>菜单编码：</div>
                    <div>{selectMenu.menuCode}</div>
                  </div>
                  <Divider className="my-smm" />
                  <div className="flex py-sm">
                    <div>菜单状态：</div>
                    <div>{selectMenu.status === 1 ? "启用" : "禁用"}</div>
                  </div>
                  {selectMenu.icon && (
                    <>
                      <Divider className="my-smm" />
                      <div className="flex py-sm">
                        <div>图标：</div>
                        <div>
                          <DynamicIcon iconName={selectMenu.icon as IconName} />
                        </div>
                      </div>
                    </>
                  )}
                  <Divider className="my-smm" />
                  <div className="flex py-sm">
                    <div>父节点名称：</div>
                    <div>{selectMenu.menuName}</div>
                  </div>
                  <Divider className="my-smm" />
                  <div className="flex py-sm">
                    <div>创建人：</div>
                    <div>{selectMenu.createBy}</div>
                  </div>
                  <Divider className="my-smm" />
                  <div className="flex py-sm">
                    <div>创建时间：</div>
                    <div>{dayjs(selectMenu.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                  </div>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Card>
    </Spin>
  );
};

export default MenuPage;
