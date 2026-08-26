import {useContext} from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Sidebar = () => {

  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);

  const {logout, onlineUsers} = useContext(AuthContext);
  const [input, setInput] = useState("");

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const filteredUsers = input ? users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())) : users;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <img src={assets.logo} alt="logo" className="max-w-40" />
          <div ref={menuRef} className="relative group">
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="block"
              aria-label="Open menu"
            >
              <img
                src={assets.menu_icon}
                alt="menu"
                className="max-h-5 cursor-pointer"
              />
              <span className="absolute right-0 top-full mt-1 hidden whitespace-nowrap text-xs group-hover:block">
                More
              </span>
            </button>
            <div
              className={`absolute right-0 top-full z-10 mt-2 w-32 rounded-md border border-gray-500 bg-[#282142] p-2 shadow-lg ${menuOpen ? "visible opacity-100" : "invisible opacity-0"} transition-opacity`}
            >
              <p
                onClick={() => navigate("/profile")}
                className="cursor-pointer text-sm"
              > {" "} Edit Profile
              </p>
              <hr className="my-2 border-t border-gray-500" />
              <p onClick={()=> logout()} className="cursor-pointer text-sm"> Logout</p>
            </div>
          </div>
        </div>
        <div>
          <img src={assets.search_icon} alt="Search" className="w-3" />
          <input onChange={(e) => setInput(e.target.value)} value={input}
            type="text"
            placeholder="Search user..."
            className="bg-transparent outline-none text-white placeholder-[#c8c8c8] flex-1"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {filteredUsers.map((user) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={user._id}
            className={`relative flex items-center gap-2 p-2 pl-4 cursor-pointer ${selectedUser?._id === user._id ? "bg-[#1c28ac]/50" : ""}`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col">
              <p>{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-xs text-[#ec0f0f]">Online</span>
              ) : (
                <span className="text-xs text-[#ec0f0f]">Offline</span>
              )}
              {unseenMessages[user._id] > 0 && (
                <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                  {unseenMessages[user._id]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
