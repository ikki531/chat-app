import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthService";
import { Link, Redirect } from "react-router-dom";
import firebase from "../config/firebase";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    // submit発生時にページのリロードが起こってしまうのを防ぐ
    // preventDefaultメソッドを実行することで、ブラウザの標準の挙動をキャンセルすることが出来る
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      // ログインフォームをsubmitした際のもの。
      .then(() => {
        history.push("/"); // "/"に遷移
      })
      .catch((err) => {
        alert("E-mailまたはPasswordが違います。");
        console.log(err);
      });
  };

  const user = useContext(AuthContext);

  // すでにログイン状態である場合にも、 / にリダイレクト。
  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
        <br></br>
        <Link to="/signup">新規登録ページ</Link>
      </form>
    </>
  );
};

export default Login;
