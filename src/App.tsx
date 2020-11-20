import React from "react";
import { useUserInfo } from "./common/context/AppContext";

export const App = () => {
  //state
  const [userInfo, setUserInfo] = useUserInfo("CEvyiSVHk0UEz092sWuq");

  React.useEffect(() => {
    console.log("App -> userInfo", userInfo);
  }, [userInfo]);

  return <div>{userInfo.name}</div>;
};
