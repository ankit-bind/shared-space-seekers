
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  messages: Message[];
}

const Messages = () => {
  const { toast } = useToast();
  
  // Mock conversations data - would be fetched from Supabase in a real app
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      userId: "101",
      name: "Sarah Johnson",
      lastMessage: "Is the room still available?",
      lastMessageTime: "2025-04-23T10:23:00",
      unread: true,
      messages: [
        {
          id: "msg1",
          senderId: "101",
          content: "Hi there! I saw your listing for the apartment in Brooklyn.",
          timestamp: "2025-04-23T10:20:00"
        },
        {
          id: "msg2",
          senderId: "101",
          content: "Is the room still available?",
          timestamp: "2025-04-23T10:23:00"
        }
      ]
    },
    {
      id: "2",
      userId: "102",
      name: "Michael Chen",
      lastMessage: "Thanks for the info. I'm interested in viewing the place.",
      lastMessageTime: "2025-04-22T16:45:00",
      unread: false,
      messages: [
        {
          id: "msg3",
          senderId: "current-user",
          content: "The room is $800 per month with utilities included.",
          timestamp: "2025-04-22T16:40:00"
        },
        {
          id: "msg4",
          senderId: "102",
          content: "Thanks for the info. I'm interested in viewing the place.",
          timestamp: "2025-04-22T16:45:00"
        }
      ]
    }
  ]);
  
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");
  
  const handleSelectConversation = (conversation: Conversation) => {
    // Mark as read when selected
    if (conversation.unread) {
      setConversations(convs => 
        convs.map(c => 
          c.id === conversation.id ? {...c, unread: false} : c
        )
      );
    }
    setSelectedConversation(conversation);
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message to Supabase
    const newMsg: Message = {
      id: `msg${Date.now()}`,
      senderId: "current-user",
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    // Update the conversation with the new message
    setConversations(convs => 
      convs.map(c => {
        if (c.id === selectedConversation.id) {
          return {
            ...c,
            messages: [...c.messages, newMsg],
            lastMessage: newMessage,
            lastMessageTime: newMsg.timestamp
          };
        }
        return c;
      })
    );
    
    // Update the selected conversation
    setSelectedConversation(prev => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, newMsg],
        lastMessage: newMessage,
        lastMessageTime: newMsg.timestamp
      };
    });
    
    setNewMessage("");
    
    toast({
      title: "Message Sent",
      description: "This is a demo message. Actual functionality requires Supabase integration.",
    });
  };
  
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
  };
  
  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Messages</h1>
        <p className="text-gray-600 mt-1">Chat with potential flatmates</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-[calc(100%-5rem)]">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <Input 
                placeholder="Search conversations..." 
                className="mb-4"
              />
              
              {conversations.length === 0 ? (
                <div className="text-center py-6 text-gray-500">
                  No conversations yet
                </div>
              ) : (
                <div className="space-y-1">
                  {conversations.map(conversation => (
                    <button
                      key={conversation.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation?.id === conversation.id 
                          ? "bg-flatmate-soft-blue"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleSelectConversation(conversation)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <div className="h-10 w-10 rounded-full bg-flatmate-soft-purple flex items-center justify-center">
                            <span className="font-medium text-sm">
                              {conversation.name.split(" ").map(n => n[0]).join("")}
                            </span>
                          </div>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{conversation.name}</p>
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              {formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          <p className={`text-sm truncate ${
                            conversation.unread ? "font-medium" : "text-gray-500"
                          }`}>
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread && (
                          <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Message Area */}
          <div className="hidden md:flex flex-col flex-1 h-full">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b border-gray-200 flex items-center">
                  <Avatar>
                    <div className="h-10 w-10 rounded-full bg-flatmate-soft-purple flex items-center justify-center">
                      <span className="font-medium text-sm">
                        {selectedConversation.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  </Avatar>
                  <div className="ml-3">
                    <h3 className="font-medium">{selectedConversation.name}</h3>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConversation.messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${
                        message.senderId === "current-user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.senderId === "current-user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 text-right ${
                          message.senderId === "current-user" 
                            ? "text-primary-foreground/70" 
                            : "text-gray-500"
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button onClick={handleSendMessage}>Send</Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Select a conversation to start messaging
              </div>
            )}
          </div>
          
          {/* Mobile: No conversation selected message */}
          <div className="flex md:hidden items-center justify-center flex-1 text-gray-500 p-4">
            Select a conversation to view messages
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
