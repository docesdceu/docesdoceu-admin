'use client';

import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchIcon } from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
      return;
    }

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.close();
    };
  }, [status, router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'admin',
      timestamp: new Date(),
    };

    socket.emit('message', message);
    setNewMessage('');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Lista de Conversas */}
      <Card className="w-80 border-r rounded-none">
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar conversas..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          <div className="p-4 hover:bg-gray-50 cursor-pointer border-b">
            <div className="flex items-center">
              <div className="h-10 w-10 flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://via.placeholder.com/40"
                  alt=""
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    João Silva
                  </h3>
                  <span className="text-xs text-gray-500">10:30</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Olá, gostaria de fazer um pedido...
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Área de Mensagens */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 rounded-none">
          <div className="h-full flex flex-col">
            {/* Cabeçalho do Chat */}
            <div className="p-4 border-b">
              <div className="flex items-center">
                <div className="h-10 w-10 flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://via.placeholder.com/40"
                    alt=""
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    João Silva
                  </h3>
                  <p className="text-sm text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Mensagens */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-end">
                <div className="bg-primary text-white rounded-lg py-2 px-4 max-w-[70%]">
                  <p className="text-sm">Olá! Como posso ajudar?</p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg py-2 px-4 max-w-[70%]">
                  <p className="text-sm">Gostaria de fazer um pedido de brigadeiros.</p>
                </div>
              </div>
            </div>

            {/* Input de Mensagem */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Enviar</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 