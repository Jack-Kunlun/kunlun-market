import nprogress from "nprogress";
import React, { useEffect } from "react";
import "nprogress/nprogress.css";

export const NPorgress: React.FC = () => {
  useEffect(() => {
    nprogress.start();

    return () => {
      nprogress.done();
    };
  }, []);

  return <></>;
};
