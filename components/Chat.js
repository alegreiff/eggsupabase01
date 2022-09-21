import { useEffect, useState, useRef } from "react";

const Chat = ({ supabase, session }) => {
  const [messages, setMessages] = useState([]);
  const message = useRef("");

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

    /* const { data, error } = await supabase
  .from("message")
  .insert([{ some_column: "someValue", other_column: "otherValue" }]); */
  };

  return (
    <div>
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
