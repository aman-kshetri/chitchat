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
    <div className="h-full flex flex-col border-r border-white/20 bg-[#0f0f2f]/30">
      <div className="flex items-center justify-between px-3 py-3">
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

      <div className="mx-3 mb-3 flex items-center gap-2 rounded-full border border-gray-500 px-3 py-2">
        <img src={assets.search_icon} alt="Search" className="w-3 h-3" />
        <input onChange={(e) => setInput(e.target.value)} value={input}
          type="text"
          placeholder="Search user..."
          className="w-full bg-transparent outline-none text-white placeholder-[#c8c8c8]"
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.map((user) => (
          <div
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages((prev) => ({ ...prev, [user._id]: 0 }));
            }}
            key={user._id}
            className={`relative flex items-center gap-3 p-3 px-4 cursor-pointer ${selectedUser?._id === user._id ? "bg-[#1c28ac]/50" : ""}`}
          >
            <img
              src={user?.profilePic || assets.avatar_icon}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-sm font-medium">{user.fullName}</p>
              {onlineUsers.includes(user._id) ? (
                <span className="text-xs text-[#ec0f0f]">Online</span>
              ) : (
                <span className="text-xs text-[#ec0f0f]">Offline</span>
              )}
            </div>
            {unseenMessages[user._id] > 0 && (
              <p className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/50 text-[10px]">
                {unseenMessages[user._id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
