"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Mail, Phone, MapPin, ShoppingBag } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SearchIcon } from '@heroicons/react/24/outline'

// Dados de exemplo - substitua por dados reais do seu banco de dados
const clientes = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria@email.com",
    telefone: "(11) 99999-9999",
    endereco: "Rua das Flores, 123 - Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
    totalPedidos: 5,
    valorTotal: 450.00,
    ultimoPedido: "2024-03-20",
  },
  {
    id: 2,
    nome: "João Santos",
    email: "joao@email.com",
    telefone: "(11) 98888-8888",
    endereco: "Av. Principal, 456 - Vila Nova",
    cidade: "São Paulo",
    estado: "SP",
    cep: "04567-890",
    totalPedidos: 3,
    valorTotal: 280.00,
    ultimoPedido: "2024-03-19",
  },
]

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleViewPedidos = (id: number) => {
    // Implementar lógica para visualizar pedidos do cliente
    toast({
      title: "Visualizar Pedidos",
      description: "Funcionalidade em desenvolvimento",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar clientes..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <Button variant="outline">Exportar</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endereço
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total de Pedidos
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="https://via.placeholder.com/40"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {cliente.nome}
                        </div>
                        <div className="text-sm text-gray-500">
                          Cliente desde 2024
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.email}</div>
                    <div className="text-sm text-gray-500">{cliente.telefone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {cliente.endereco}
                    </div>
                    <div className="text-sm text-gray-500">
                      {cliente.cidade} - {cliente.estado}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.totalPedidos} pedidos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" size="sm" className="mr-2">
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleViewPedidos(cliente.id)}>
                      Ver Histórico
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
} 