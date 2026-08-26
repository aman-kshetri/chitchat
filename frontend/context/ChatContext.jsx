import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});

    const {socket, axios} = useContext(AuthContext);

    // Function to get all users from the backend
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users", {
                headers: { token: localStorage.getItem("token") },
            });
            if (data.success) {
                setUsers(data.users);
                setUnseenMessages(data.unseenMessages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to get messages for a specific user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`, {
                headers: { token: localStorage.getItem("token") },
            });
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to send a message to a specific user
    const sendMessage = async (messageData) => {
        try {
            if (!selectedUser?._id) {
                toast.error("Select a user before sending a message.");
                return;
            }

            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData, {
                headers: { token: localStorage.getItem("token") },
            });
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage]);
                setUnseenMessages((prev) => ({ ...prev, [selectedUser._id]: 0 }));
                await getUsers();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Function to subscribe to messages for selected user
    const subscribeToMessages = () => {
        if (!socket) return;

        socket.off("newMessage");
        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${selectedUser._id}`, null, {
                    headers: { token: localStorage.getItem("token") },
                });
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages,
                    [newMessage.senderId]: (prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1),
                }));
            }
        });
    };

    useEffect(() => {
        subscribeToMessages();
    }, [socket, selectedUser]);

    // Function to unsubscribe from messages for selected user


    return (
    <ChatContext.Provider value={{
        messages,
        users,
        selectedUser,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
        getUsers,
        getMessages,
        sendMessage,
        subscribeToMessages,
    }}>
    {children}
</ChatContext.Provider>);
};
