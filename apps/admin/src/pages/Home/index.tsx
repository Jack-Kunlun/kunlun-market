import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
  return (
    <div>
      HomePage
      <br />
      <Link to="/home/user">go to /home/user</Link>
    </div>
  );
};
