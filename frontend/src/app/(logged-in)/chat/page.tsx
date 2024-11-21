"use client";

import React, { useState } from "react";

interface Group {
  id: number;
  name: string;
  description: string;
}

interface Message {
  id: number;
  sender: string;
  time: string;
  content: string;
}

interface User {
  id: number;
  name: string;
}

const ChatPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, name: "Running Club", description: "Great job everyone!" },
    { id: 2, name: "Marathon Training", description: "Don't forget the long run this week!" },
    { id: 3, name: "Local Runners", description: "Anyone up for a group run?" },
  ]);

  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newGroupName, setNewGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const users: User[] = [
    { id: 1, name: "Alice Runner" },
    { id: 2, name: "Bob Jogger" },
    { id: 3, name: "Charlie Sprinter" },
    { id: 4, name: "Diana Marathon" },
  ];

  // select group
  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setMessages([
      // Mock data
      { id: 1, sender: "Victor Sarut", time: "2:30 PM", content: "Great run today! Keep it up!" },
      { id: 2, sender: "Yasuhito Komano", time: "2:35 PM", content: "Thanks! I'm trying to reach my monthly goal of 80km. Already at 56.7km!" },
    ]);
  };

  // Send message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      content: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage(""); //clear message
  };

  // Create New Group
  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      alert("Please enter a group name.");
      return;
    }

    const newGroup: Group = {
      id: groups.length + 1,
      name: newGroupName,
      description: `Created with ${selectedUsers.length} members`,
    };

    setGroups([...groups, newGroup]); //add group
    setNewGroupName("");
    setSelectedUsers([]);
    setIsModalOpen(false);
  };

  // select and Unselect User in modal
  const toggleUserSelection = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

   // Delete Group
   const handleDeleteGroup = (groupId: number) => {
    setGroups(groups.filter((group) => group.id !== groupId));

    if (selectedGroup?.id === groupId) {
      setSelectedGroup(null);
      setMessages([]);
    }
  };

  return (
    <div className="flex h-screen p-6">
      {/* Chat Groups Section */}
      <div className="w-1/3 border-r pr-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat Groups</h2>
          <button
            onClick={() => setIsModalOpen(true)} // เปิด Modal
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
                <div key={msg.id}>
                  <p className="text-sm font-semibold">
                    {msg.sender} <span className="text-xs text-gray-500">{msg.time}</span>
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
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-1">Users</label>
              <div className="space-y-2">
                {users.map((user) => (
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
