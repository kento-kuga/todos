import React from "react";
import { Route, Switch } from "react-router-dom";
import { TasksContextProvider } from "../../common/context/tasks-context";
import { useUserInfo } from "../../common/hooks/common/useUserInfo";
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
      <Route
        exact
        path={"/tasks"}
        render={() => (
          <TasksContextProvider>
            <Tasks />
          </TasksContextProvider>
        )}
      ></Route>
    </Switch>
  );
};
