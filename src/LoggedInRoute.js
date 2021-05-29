import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";

// ユーザーの中身を確かめる用のメソッド (第９回授業より、村泉さんのコード2:08:07より)
// const userDisplay = (user) => {
//   if (user === null) {
//     console.log("loggedInRoute# user : null");
//   } else {
//     console.log("loggedInRoute# user : " + Object.values(user));
//   }
// };

const LoggedInRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);

  // ユーザー情報が入っていればcomponentに入っているのをそのまま表示
  // 入っていなければloginページにリダイレクト
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default LoggedInRoute;
