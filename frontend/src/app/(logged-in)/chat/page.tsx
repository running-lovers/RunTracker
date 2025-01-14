"use client";

import React, { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "@/context/userContext";


// interface
interface Group {
  id: number;
  name: string;
  description: string;
}
interface Message {
  id: number;
  sender: {
    name: string;
  };
  time: string;
  content: string;
  createdAt: string;
}
interface User {
  id: number;
  name: string;
}
//main component
const ChatPage: React.FC = () => {
  //state
  const { user } = useUser();
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);

  // const users: User[] = [
  //   { id: 1, name: "Yasuhitp" },
  //   { id: 2, name: "Kaz" },
  // ];

  // Fetch Chatrooms when component loads
  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/chatrooms");
        if (!response.ok) {
          console.error("Failed to fetch chatrooms");
          return;
        }

        const data: Group[] = await response.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    fetchChatrooms();
  }, []);

    // Fetch Following Users
  useEffect(() => {
    const fetchFollowingUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/connections/${user?.id}/following`
        );
        if (!response.ok) throw new Error("Failed to fetch following users");

        const data = await response.json();
        setFollowingUsers(data);
      } catch (error) {
        console.error("Error fetching following users:", error);
      }
    };

    if (user?.id) {
      fetchFollowingUsers();
    }
  }, [user]);

    // Connect to Socket.IO
    useEffect(() => {
      const socketConnection = io("http://localhost:8080");
      setSocket(socketConnection);
  
      // Listen for new messages
      socketConnection.on("newMessage", (message: Message) => {
        console.log("New Message Received:", message);
        setMessages((prev) => [...prev, message]);
      });

      // Listen for new groups
      socketConnection.on("newGroup", (newGroup: Group) => {
        setGroups((prev) => [...prev, newGroup]);
      });

      // Listen for deleted groups
      socketConnection.on("groupDeleted", (groupId: number) => {
        setGroups((prev) => prev.filter((group) => group.id !== groupId));
        setSelectedGroup((prev) => (prev?.id === groupId ? null : prev));
      });
  
      // Cleanup on unmount
      return () => {
        socketConnection.off("newMessage");
        socketConnection.off("newGroup");
        socketConnection.off("groupDeleted");
        socketConnection.disconnect();
      };
    }, []);

    //fetch message
    const fetchMessages = async (chatRoomId: number) => {
      try {
        const response = await fetch(`http://localhost:8080/api/messages/${chatRoomId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
    
        const data: Message[] = await response.json();
        console.log("Fetched Messages:", data);
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
  // select group
  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setMessages([]);
    fetchMessages(group.id);

    console.log(`Joining room: ${group.id}`);
    socket?.emit("joinRoom", group.id);
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedGroup) return;
  
    const newMsg = {
      content: newMessage,
      senderId: user?.id,
      chatRoomId: selectedGroup.id,
    };

    console.log("Sending message:", newMsg)

    try {
      const response = await fetch("http://localhost:8080/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
  
      if (!response.ok) {
        console.error("Failed to send message");
        return;
      }
  
      const savedMessage = await response.json();

      // setMessages((prev) => [...prev, savedMessage]);
      socket?.emit("sendMessage", savedMessage);
  
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  // Create New Group
  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      alert("Please enter a group name.");
      return;
    }
  
    const payload = {
      userId: user?.id,
      name: newGroupName,
    };
  
    try {
      const response = await fetch("http://localhost:8080/api/chatrooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        console.error("Failed to create chatroom");
        return;
      }
  
      const createdChatroom = await response.json();
      // setGroups((prev) => [...prev, createdChatroom]);
      socket?.emit("newGroup", createdChatroom);
      setNewGroupName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating chatroom:", error);
    }
  };
  

  // select and Unselect User in modal
  const toggleUserSelection = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  //Delete group
  const handleDeleteGroup = async (groupId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/chatrooms/${groupId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        console.error("Failed to delete chatroom");
        return;
      }
  
      const data = await response.json();
      socket?.emit("deleteGroup", groupId);
      if (selectedGroup?.id === groupId) {
        setSelectedGroup(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Error deleting chatroom:", error);
    }
  };


  return (
    <div className="flex h-screen p-6">
      {/* Chat Groups Section */}
      <div className="w-1/3 border-r pr-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat Groups</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-2xl font-bold text-gray-600"
          >
            +
          </button>
        </div>
        <ul className="space-y-4">
          {groups.map((group) => (
            <li
              key={group.id}
              className={`p-4 border rounded flex items-center justify-between cursor-pointer ${
                selectedGroup?.id === group.id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleSelectGroup(group)}
            >
              <div>
                <h3 className="font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.description}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGroup(group.id);
                }}
                className="text-red-500 ml-2"
                >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18.75V8.25M6 8.25V4.875C6 4.39175 6.39175 4 6.875 4H17.125C17.6082 4 18 4.39175 18 4.875V8.25M6 8.25H18M6 8.25L5.25 19.875C5.25 20.3582 5.64175 20.75 6.125 20.75H17.875C18.3582 20.75 18.75 20.3582 18.75 19.875L18 8.25M10.5 13.5V16.5M13.5 13.5V16.5"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 pl-4">
        {selectedGroup ? (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-xl font-bold">{selectedGroup.name}</h2>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex flex-col">
                  <p className="text-sm font-semibold">
                    {msg.sender?.name || "Unknown"}{" "}
                    <span className="text-xs text-gray-500">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </span>
                  </p>
                  <p className="bg-gray-100 p-2 rounded">{msg.content}</p>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center border-t pt-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-black text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a chat</p>
        )}
      </div>

      {/* Modal create new group */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Create New Chat Group</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Name</label>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            {/* list of following user  */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Users</label>
              <div className="space-y-2">
                {followingUsers.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => toggleUserSelection(user.id)}
                      className="mr-2"
                    />
                    <label htmlFor={`user-${user.id}`} className="flex items-center">
                      <div className="w-6 h-6 bg-gray-300 text-center rounded-full flex items-center justify-center mr-2">
                        {user.name.charAt(0)}
                      </div>
                      {user.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 mr-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateGroup} // create new group
                className="px-4 py-2 bg-black text-white rounded"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
