"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CheckCircle, Clock, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dados de exemplo - substitua por dados reais do seu banco de dados
const pedidos = [
  {
    id: 1,
    cliente: "Maria Silva",
    data: "2024-03-20",
    status: "pendente",
    total: 120.00,
    itens: [
      { nome: "Bolo de Chocolate", quantidade: 2, preco: 45.00 },
      { nome: "Torta de Morango", quantidade: 1, preco: 30.00 },
    ],
  },
  {
    id: 2,
    cliente: "João Santos",
    data: "2024-03-19",
    status: "entregue",
    total: 75.00,
    itens: [
      { nome: "Bolo de Chocolate", quantidade: 1, preco: 45.00 },
      { nome: "Torta de Morango", quantidade: 1, preco: 30.00 },
    ],
  },
]

const statusColors = {
  pendente: "text-yellow-500",
  entregue: "text-green-500",
  cancelado: "text-red-500",
}

const statusIcons = {
  pendente: Clock,
  entregue: CheckCircle,
  cancelado: XCircle,
}

export default function PedidosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const handleStatusChange = (id: number, novoStatus: string) => {
    // Implementar lógica de atualização de status
    toast({
      title: "Sucesso",
      description: "Status do pedido atualizado com sucesso!",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pedidos</h1>
        <p className="text-muted-foreground">Gerencie os pedidos dos seus clientes</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar pedidos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pedidos.map((pedido) => {
              const StatusIcon = statusIcons[pedido.status as keyof typeof statusIcons]
              return (
                <div
                  key={pedido.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Pedido #{pedido.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Cliente: {pedido.cliente}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Data: {new Date(pedido.data).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`h-5 w-5 ${statusColors[pedido.status as keyof typeof statusColors]}`} />
                      <span className={`font-medium ${statusColors[pedido.status as keyof typeof statusColors]}`}>
                        {pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Itens do Pedido:</h4>
                    <div className="space-y-2">
                      {pedido.itens.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>
                            {item.quantidade}x {item.nome}
                          </span>
                          <span>R$ {(item.quantidade * item.preco).toFixed(2)}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-medium pt-2 border-t">
                        <span>Total</span>
                        <span>R$ {pedido.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t">
                    {pedido.status === "pendente" && (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => handleStatusChange(pedido.id, "cancelado")}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(pedido.id, "entregue")}
                        >
                          Marcar como Entregue
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 