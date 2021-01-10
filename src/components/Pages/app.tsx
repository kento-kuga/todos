import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { TaskFoldersContextProvider } from "../../common/context/task-folders-context";
import { TasksProvider } from "../../common/context/tasks-context";
import { UserInfo } from "../../common/dto/user";
import { useUserInfo } from "../../common/hooks/common/user-info-hook";
import { Folders } from "./folders";
import { Tasks } from "./tasks";
import { Top } from "./top";

export const App = () => {
  //state
  const [userInfo] = useUserInfo();

  return (
    <Switch>
      <Route exact path={"/"} component={Top}></Route>
      <AuthorityRoute userInfo={userInfo} />
    </Switch>
  );
};

interface AuthorityRouteProps {
  userInfo: UserInfo | null;
}

const AuthorityRoute = (props: AuthorityRouteProps) => {
  if (props.userInfo) {
    return (
      <TaskFoldersContextProvider>
        <Route
          exact
          path={"/folders"}
          render={() => <Folders userInfo={props.userInfo} />}
        ></Route>
        <Route
          exact
          path={"/tasks"}
          render={() => (
            <TasksProvider>
              <Tasks />
            </TasksProvider>
          )}
        ></Route>
      </TaskFoldersContextProvider>
    );
  }
  return <Redirect to="/" />;
};
