import { Card } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total de Pedidos</h3>
          <p className="text-3xl font-bold text-primary mt-2">0</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Pedidos Pendentes</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">0</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Total de Clientes</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">0</p>
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-700">Produtos Ativos</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Últimos Pedidos</h2>
          <div className="text-gray-500 text-center py-8">
            Nenhum pedido recente
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Mensagens Recentes</h2>
          <div className="text-gray-500 text-center py-8">
            Nenhuma mensagem recente
          </div>
        </Card>
      </div>
    </div>
  );
} 