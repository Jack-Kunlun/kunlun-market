import { Button } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const RolePage: React.FC = () => {
  const navigate = useNavigate();

  const goAdd = () => navigate("/role/add");

  return (
    <div className="full bg-white py-sm px-lg">
      <div className="my-sm">
        <Button onClick={goAdd}>新增</Button>
      </div>
    </div>
  );
};

export default RolePage;
