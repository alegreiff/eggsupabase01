import { useEffect, useState, useRef } from "react";
import useSupabase from "../utils/useSupabase";

const Chat = ({ currentUser, supabase, session }) => {
  console.log("Cha't", currentUser);
  const [messages, setMessages] = useState([]);
  const [editingUserName, setEditingUserName] = useState(false);
  const message = useRef("");
  const newUSername = useRef("");
  useEffect(() => {
    const getMessages = async () => {
      let { data: messages, error } = await supabase
        .from("message")
        .select("*");
      setMessages(messages);
      //console.log(messages);
    };
    getMessages();

    const setupMessagesSubscription = async () => {
      await supabase
        .from("message")
        .on("INSERT", (payload) => {
          setMessages((currentMessages) =>
            [].concat(currentMessages, payload.new)
          );
          console.log("SETTED", payload);
        })
        .subscribe();
    };
    setupMessagesSubscription();
  }, []);

  const sendMessage = async (evt) => {
    evt.preventDefault();
    const content = message.current.value;
    console.log(content);
    await supabase
      .from("message")
      .insert([{ content, user_id: session.user.id }]);
    message.current.value = "";
  };
  const logout = () => {
    supabase.auth.signOut();
  };
  const setUsername = async (evt) => {
    evt.preventDefault();
    const username = newUSername.current.value;
    await supabase
      .from("usuarios")
      .insert([{ ...currentUser, username }], { upsert: true });
    newUSername.current.value = "";
    setEditingUserName(false);
  };

  return (
    <div>
      <h3>Supabase CHAT</h3>
      <h4>
        Welcome,{" "}
        {currentUser?.username ? currentUser.username : session.user.email}
      </h4>

      <div>
        {editingUserName ? (
          <form onSubmit={setUsername}>
            <input
              type="text"
              placeholder="new username"
              required
              ref={newUSername}
            />
            <button type="submit">Update username</button>
          </form>
        ) : (
          <div>
            <button
              onClick={() => {
                setEditingUserName(true);
              }}
            >
              Edit username
            </button>
            <button onClick={logout}>Logout</button>
          </div>
        )}
      </div>

      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
      <form onSubmit={sendMessage}>
        <input type="text" placeholder="Escríbeme" required ref={message} />
        <button type="submit">Guarda</button>
      </form>
    </div>
  );
};

export default Chat;
