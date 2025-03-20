import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  HomeIcon, 
  ShoppingCartIcon, 
  UserGroupIcon, 
  ChatBubbleLeftRightIcon,
  CakeIcon
} from '@heroicons/react/24/outline';

interface AdminLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Pedidos', href: '/admin/pedidos', icon: ShoppingCartIcon },
  { name: 'Clientes', href: '/admin/clientes', icon: UserGroupIcon },
  { name: 'Chat', href: '/admin/chat', icon: ChatBubbleLeftRightIcon },
  { name: 'Produtos', href: '/admin/produtos', icon: CakeIcon },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-lg">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800">Doces do Céu</h1>
            <p className="text-sm text-gray-600">Painel Administrativo</p>
          </div>
          <nav className="mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 