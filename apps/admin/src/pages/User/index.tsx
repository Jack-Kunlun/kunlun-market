import { Button, Space, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { FC } from "react";
import { UserInfo, getUserPage } from "@/apis/user";
import { useBasicTable } from "@/hooks/useBasicTable";

const tableColumns: TableColumnsType<UserInfo> = [
  {
    title: "ID",
    dataIndex: "id",
    align: "center",
    width: 80,
  },
  {
    title: "用户名",
    align: "center",
    dataIndex: "username",
  },
  {
    title: "真实姓名",
    align: "center",
    dataIndex: "realName",
  },
  {
    title: "手机号",
    dataIndex: "phone",
  },
  {
    title: "邮箱",
    dataIndex: "email",
  },
  {
    title: "状态",
    dataIndex: "status",
    align: "center",
    render: (status) => {
      switch (status) {
        case 0:
          return <Tag color="warning">禁用</Tag>;
        case 1:
          return <Tag color="success">正常</Tag>;
        case 2:
          return <Tag color="error">锁定</Tag>;
        default:
          return "";
      }
    },
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "创建人",
    align: "center",
    dataIndex: "createBy",
    render: (createBy) => {
      if (createBy === 0) {
        return "自行注册";
      }

      return createBy;
    },
  },
  {
    title: "操作",
    dataIndex: "action",
    fixed: "right",
    align: "center",
    render: () => {
      return (
        <Space>
          <Button type="primary">编辑</Button>
          <Button type="primary" danger>
            删除
          </Button>
        </Space>
      );
    },
  },
];

const fetchTableData = async (params: PagingParameter) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await getUserPage(params);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const UserPage: FC = () => {
  const { BasicTable, reload } = useBasicTable({ columns: tableColumns, fetchTableData });

  return (
    <div className="full bg-white py-sm px-lg">
      <div className="my-sm">
        <Button onClick={reload}>新增</Button>
      </div>
      <BasicTable rowKey="id" />
    </div>
  );
};

export default UserPage;
