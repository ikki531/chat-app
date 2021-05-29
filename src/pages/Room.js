import React, { useState, useEffect, useContext } from "react";
import firebase from "../config/firebase";
import { AuthContext } from "../AuthService";

const Room = () => {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState("");

  // 通知を表示する許可を得る
  // Notification.requestPermission().then(function (result) {
  //   console.log(result);
  // });

  // Roomコンポーネントがレンダリングされた後に、データを取得します。
  // snapshotイベントは、対象のコレクション(今回はmessages)に変更があるたびに発生するため、リアルタイムでアプリケーションにデータを反映できます。
  useEffect(() => {
    firebase
      .firestore()
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });

        // 内部データを確かめる
        console.log(messages);

        setMessages(messages);
      });
  }, []);

  const user = useContext(AuthContext); // useContextを用いて、ログイン中のユーザーオブジェクトを取得してください。

  // メッセージとユーザー名をfirebase(collection)に追加する
  const handleSubmit = (e) => {
    e.preventDefault();

    let valueReplace = value.replace(/\s+/g, "");

    if (valueReplace === "") {
      alert("文字を入力してください。");
      return;
    }

    firebase.firestore().collection("messages").add({
      content: value,
      user: user.displayName,
      timestamp: new Date(),
      // key: messages.index,
    });
    setValue("");

    // 通知（通知APIの使用）
    // new Notification("chatapp", {
    //   body: "新着メッセージがあります",
    // });
  };

  const exportMessages = () => {
    // console.log(messages);
    // メモ（手書きのファイル＃１１回の授業）見る↓（if文が必要な理由）
    if (messages !== null) {
      return messages.map((message, index) => (
        <li key={index}>
          {message.content} : {message.user}
        </li>
      ));
    }
  };

  return (
    <>
      <h1>Room</h1>
      <ul>{exportMessages()}</ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">送信</button>
      </form>
      <button onClick={() => firebase.auth().signOut()}>Logout</button>
    </>
  );
};

export default Room;
