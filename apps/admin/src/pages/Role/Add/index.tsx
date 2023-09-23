import { Button } from "antd";
import React from "react";

const AddRole: React.FC = () => {
  return (
    <div className="full bg-white py-sm px-lg">
      <div className="my-sm">
        <Button>保存</Button>
      </div>
      <div>新增角色</div>
    </div>
  );
};

export default AddRole;
