import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { getGeminiResponse } from '../lib/gemini';
import { useStudentStore } from '../store/studentStore';

const Chat = () => {
  const { studentData } = useStudentStore();
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !studentData) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(userMessage, studentData);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Yanıt alınamadı:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white shadow-md'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white shadow-md rounded-lg p-4">
              <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Mesajınızı yazın..."
            className="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white rounded-lg px-4 py-2 hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;