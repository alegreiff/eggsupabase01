import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../utils/context/AppContext";

const Chat = () => {
  const { _cu: currentUser, _sp: supabase, _s: session } = useAppContext();
  const [messages, setMessages] = useState([]);
  const [editingUserName, setEditingUserName] = useState(false);
  const [users, setUsers] = useState({});
  const message = useRef("");
  const newUsername = useRef("");

  useEffect(() => {
    const getMessages = async () => {
      let { data: messages, error } = await supabase
        .from("message")
        .select("*")
        .order("created_at", { ascending: true });

      setMessages(messages);
    };
    getMessages();

    const setupMessagesSubscription = async () => {
      await supabase
        .from("message")
        .on("INSERT", (payload) => {
          setMessages((currentMessages) =>
            [].concat(currentMessages, payload.new)
          );
        })
        .subscribe();
    };
    setupMessagesSubscription();

    const setupUsersSubscription = async () => {
      await supabase
        .from("usuarios")
        .on("UPDATE", (payload) => {
          setUsers((users) => {
            const user = users[payload.new.id];
            if (user) {
              return Object.assign({}, users, {
                [payload.new.id]: payload.new,
              });
            } else {
              return users;
            }
          });
        })
        .subscribe();
    };
    setupUsersSubscription();
  }, []);

  const sendMessage = async (evt) => {
    evt.preventDefault();
    const content = message.current.value;

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
    const username = newUsername.current.value;
    await supabase
      .from("usuarios")
      .insert([{ ...currentUser, username }], { upsert: true });
    newUsername.current.value = "";
    setEditingUserName(false);
  };

  useEffect(() => {
    const getUsersFromSupabase = async (users, userIds) => {
      const usersToGet = Array.from(userIds).filter((userId) => !users[userId]);
      if (Object.keys(users).length && usersToGet.length === 0) return users;
      const { data } = await supabase
        .from("usuarios")
        .select("id, username, correo")
        .in("id", usersToGet);

      const newUsers = {};
      data.forEach((user) => (newUsers[user.id] = user));

      return Object.assign({}, users, newUsers);
    };

    const getUsers = async () => {
      const userIds = new Set(messages.map((message) => message.user_id));
      const newUsers = await getUsersFromSupabase(users, userIds);
      setUsers(newUsers);
    };
    getUsers();
  }, [users, messages, supabase]);
  const username = (user_id) => {
    const user = users[user_id];
    if (!user) return "loading";
    return user.username ? user.username : user.correo;
  };

  return (
    <div>
      <Container maxW="2xl" bg="blue.600" centerContent>
        <Box padding="4" bg="blue.400" color="black" maxW="md">
          <h3>Supabase CHAT</h3>
          <h4>
            Welcome,
            {currentUser?.username
              ? currentUser?.username
              : session?.user.email}
          </h4>

          <div>
            {editingUserName ? (
              <form onSubmit={setUsername}>
                <input
                  type="text"
                  placeholder="new username"
                  required
                  ref={newUsername}
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
            <div key={message.id}>
              <span>{username(message.user_id)} </span>
              {message.content}
            </div>
          ))}
          <form onSubmit={sendMessage}>
            <FormControl>
              <FormLabel>Nuevo mensaje</FormLabel>
              <Input
                type="text"
                placeholder="Escríbeme"
                required
                ref={message}
              />
              <FormHelperText>Sé breve</FormHelperText>
            </FormControl>
            <Button type="submit" colorScheme="orange">
              Enviar mensaje
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Chat;
