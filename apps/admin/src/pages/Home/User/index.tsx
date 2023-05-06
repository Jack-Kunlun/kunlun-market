import React from "react";
import { Link } from "react-router-dom";

export const UserPage: React.FC = () => {
  return (
    <div>
      UserPage
      <br />
      <Link to="/login">go to Login</Link>
    </div>
  );
};
