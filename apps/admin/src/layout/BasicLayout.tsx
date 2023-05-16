import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Dropdown, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import React, { FC, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { menuRoute } from "@/routes";

const { Header, Content, Sider } = Layout;

const routeList = new Map<string, { path: string; title: string }>();

interface Routes {
  /**
   * 名称
   */
  title: string;
  /**
   * 地址
   */
  path: string;
  /**
   * 组件
   */
  element?: FC;
  /**
   * 重定向地址
   */
  redirect?: string;
  /**
   * 是否校验权限, false或不存在时不校验, true为校验, 子路由会继承父路由的 auth 属性
   */
  auth?: boolean;
  /**
   * 子路由
   */
  children?: Routes[];
  /**
   * 图标
   */
  icon?: FC;
  /**
   * 路由的key，唯一值，请勿重复
   */
  key: string;
  /**
   * 不需要懒加载
   */
  unnecessaryLazy?: boolean;
}

const formatMenu = (routes: Routes[], level = 0) => {
  const menus: MenuProps["items"] = [];

  routes.forEach((route) => {
    const menuItem: any = {
      key: route.key,
      icon: route.icon ? React.createElement(route.icon) : route.icon,
      label: route.title,
      path: route.path,
    };

    if (route.children && route.children.length > 0) {
      menuItem.children = formatMenu(route.children, level + 1);
    }

    routeList.set(route.key, { path: route.path, title: route.title });

    menus.push(menuItem);
  });

  return menus;
};

const items: MenuProps["items"] = [
  {
    label: "设置",
    key: "0",
  },
  {
    type: "divider",
  },
  {
    label: "退出登陆",
    key: "1",
  },
];

export const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const [keyPath, setKeyPath] = useState<string[]>(["UserIndex", "User"]);

  const menus = formatMenu(menuRoute);

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "1":
        localStorage.clear();
        navigate("/login");
        break;
      default:
        break;
    }
  };

  const breadcrumbItems = useMemo(() => {
    return [...keyPath].reverse().map((key) => ({ title: routeList.get(key)?.title }));
  }, [keyPath]);

  return (
    <Layout className="w-full h-full">
      <Header className="bg-neutral-700 flex justify-between items-center px-lg">
        <span className="text-white text-md font-semibold">header</span>
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <Avatar style={{ backgroundColor: "#87d068" }} size={40} icon={<UserOutlined />} />
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={256} className="!bg-white overflow-auto p-smm" collapsible collapsed={collapsed} trigger={null}>
          <Button
            shape="circle"
            type="primary"
            className="absolute bottom-10px right-15px"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            mode="inline"
            defaultSelectedKeys={[keyPath[0]]}
            defaultOpenKeys={[keyPath[1]]}
            style={{ height: "100%", borderRight: 0 }}
            items={menus}
            onClick={(info) => {
              setKeyPath(info.keyPath);

              if (!routeList.has(info.key)) {
                return;
              }

              navigate(routeList.get(info.key)?.path as string);
            }}
          />
        </Sider>
        <Layout>
          <Breadcrumb className="p-sm bg-blue-200" items={breadcrumbItems} />
          <Content className="flex-1 bg-gray-50 p-md m-0">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
