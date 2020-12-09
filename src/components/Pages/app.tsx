import React from "react";
import { Route, Switch } from "react-router-dom";
import { useUserInfo } from "../../common/hooks/useUserInfo";
import { Folders } from "./folders";
import { Tasks } from "./tasks";
import { Top } from "./top";

export const App = () => {
  //state
  const [userInfo] = useUserInfo("CEvyiSVHk0UEz092sWuq");

  return (
    <Switch>
      <Route exact path={"/"} component={Top}></Route>
      <Route
        exact
        path={"/folders"}
        render={() => <Folders userInfo={userInfo} />}
      ></Route>
      <Route exact path={"/tasks"} render={() => <Tasks />}></Route>
    </Switch>
  );
};
