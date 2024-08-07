import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: 'user' }]);
      setInputMessage('');
      // Simulate a response from support
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. A support agent will be with you shortly.", sender: 'support' }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 h-96 flex flex-col">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h3 className="font-bold">Live Chat</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex">
              <Input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow mr-2"
              />
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      ) : (
        <Button onClick={toggleChat} className="rounded-full w-16 h-16 flex items-center justify-center">
          <MessageCircle className="h-8 w-8" />
        </Button>
      )}
    </div>
  );
};

export default LiveChatWidget;
