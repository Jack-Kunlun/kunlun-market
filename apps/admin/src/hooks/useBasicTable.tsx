import type { TableColumnsType, TableProps } from "antd";
import { Table } from "antd";
import React, { useEffect, useReducer } from "react";

interface TableDateResponse<T> {
  data: T[];
  total: number;
}

interface UseBasicTableProps<T> {
  columns: TableColumnsType<T>;
  fetchTableData: (params: PagingParameter) => Promise<TableDateResponse<T>>;
}

type BasicTableProps<T> = Omit<TableProps<T>, "columns" | "pagination" | "dataSource" | "loading">;

type BasicTablePagination<T> = Omit<TableProps<T>["pagination"], "current" | "pageSize" | "onChange">;

interface PaginationInfo {
  current: number;
  pageSize: number;
}

interface BasicTableState<T> {
  loading: boolean;
  tableData: TableDateResponse<T>;
  pagination: PaginationInfo;
}

type BasicTableAction<T> = {
  type: "TOGGLE_LOADING" | "SET_PAGINATION" | "SET_TABLE_DATA";
  payload: Partial<BasicTableState<T>>;
};

/**
 * @description 基础表格
 * @param columns 表格列配置
 * @param fetchTableData 获取表格数据的方法
 *
 * TODO: 目前很简陋，后续完善
 * TODO: 支持table选择（多选/单选）
 */
export const useBasicTable = <T extends object>({ columns, fetchTableData }: UseBasicTableProps<T>) => {
  const initialState: BasicTableState<T> = {
    loading: false,
    pagination: {
      current: 1,
      pageSize: 10,
    },
    tableData: {
      data: [],
      total: 0,
    },
  };

  const basicTableReducer = (state: BasicTableState<T>, action: BasicTableAction<T>) => {
    const { type, payload } = action;

    switch (type) {
      case "TOGGLE_LOADING":
        return { ...state, loading: payload.loading } as BasicTableState<T>;
      case "SET_PAGINATION":
        return { ...state, pagination: payload.pagination } as BasicTableState<T>;
      case "SET_TABLE_DATA":
        return { ...state, tableData: payload.tableData } as BasicTableState<T>;
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(basicTableReducer, initialState);

  const setLoading = (loading: boolean) => {
    dispatch({
      type: "TOGGLE_LOADING",
      payload: {
        loading,
      },
    });
  };

  const paginationOnChange = (page: number, pageSize: number) => {
    dispatch({ type: "SET_PAGINATION", payload: { pagination: { current: page, pageSize } } });
  };

  const getTableData = async () => {
    try {
      setLoading(true);

      const res = await fetchTableData({ current: state.pagination.current, pageSize: state.pagination.pageSize });

      if (!res) {
        throw "暂无数据";
      }

      dispatch({ type: "SET_TABLE_DATA", payload: { tableData: res } });
    } catch (error) {
      // empty
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const reload = () => {
    dispatch({ type: "SET_PAGINATION", payload: { pagination: { current: 1, pageSize: state.pagination.pageSize } } });
  };

  useEffect(() => {
    getTableData();
  }, [state.pagination]);

  const BasicTable: React.FC<BasicTableProps<T> & { pagination?: BasicTablePagination<T> }> = ({
    pagination,
    ...props
  }) => {
    return (
      <Table
        columns={columns}
        bordered
        pagination={{
          current: state.pagination.current,
          pageSize: state.pagination.pageSize,
          position: ["bottomRight"],
          showTotal: (total) => <div>{`共 ${total} 条记录`}</div>,
          pageSizeOptions: [10, 20, 50],
          total: 200,
          showQuickJumper: true,
          onChange: paginationOnChange,
          ...pagination,
        }}
        dataSource={state.tableData.data}
        loading={state.loading}
        {...props}
      />
    );
  };

  return { reload, BasicTable };
};
