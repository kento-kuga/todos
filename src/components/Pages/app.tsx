import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthContext } from "../../common/context/auth-context";
import { TaskFoldersContextProvider } from "../../common/context/task-folders-context";
import { TasksContextProvider } from "../../common/context/tasks-context";
import { UserInfo } from "../../common/dto/user";
import { useUserInfo } from "../../common/hooks/common/user-info-hook";
import { Folders } from "./folders";
import { Tasks } from "./tasks";
import { Top } from "./top";

export const App = () => {
  //context
  const authContext = React.useContext(AuthContext);

  //state
  const [userInfo] = useUserInfo(authContext.userId);

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
      <>
        <Route
          exact
          path={"/folders"}
          render={() => (
            <TaskFoldersContextProvider>
              <Folders userInfo={props.userInfo} />
            </TaskFoldersContextProvider>
          )}
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
      </>
    );
  }
  return <Redirect to="/" />;
};
