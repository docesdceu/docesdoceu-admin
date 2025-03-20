"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dados de exemplo - substitua por dados reais do seu banco de dados
const configuracoes = {
  nomeEmpresa: "Doces do Céu",
  email: "contato@docesdoceu.com",
  telefone: "(11) 99999-9999",
  endereco: "Rua das Flores, 123 - Centro",
  cidade: "São Paulo",
  estado: "SP",
  cep: "01234-567",
  horarioFuncionamento: "Segunda a Sábado: 9h às 18h",
  redesSociais: {
    instagram: "@docesdoceu",
    facebook: "docesdoceu",
    whatsapp: "11999999999",
  },
  configuracoesEntrega: {
    raioEntrega: 10,
    valorMinimo: 50,
    taxaEntrega: 10,
  },
}

export default function ConfiguracoesPage() {
  const [formData, setFormData] = useState(configuracoes)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Implementar lógica de salvamento
      toast({
        title: "Sucesso",
        description: "Configurações salvas com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar configurações",
        variant: "destructive",
      })
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: string
  ) => {
    const { name, value } = e.target
    if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [name]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do seu site</p>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                <Input
                  id="nomeEmpresa"
                  name="nomeEmpresa"
                  value={formData.nomeEmpresa}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  name="cep"
                  value={formData.cep}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="horarioFuncionamento">Horário de Funcionamento</Label>
              <Input
                id="horarioFuncionamento"
                name="horarioFuncionamento"
                value={formData.horarioFuncionamento}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  name="instagram"
                  value={formData.redesSociais.instagram}
                  onChange={(e) => handleChange(e, "redesSociais")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  name="facebook"
                  value={formData.redesSociais.facebook}
                  onChange={(e) => handleChange(e, "redesSociais")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.redesSociais.whatsapp}
                  onChange={(e) => handleChange(e, "redesSociais")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Configurações de Entrega</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="raioEntrega">Raio de Entrega (km)</Label>
                <Input
                  id="raioEntrega"
                  name="raioEntrega"
                  type="number"
                  value={formData.configuracoesEntrega.raioEntrega}
                  onChange={(e) => handleChange(e, "configuracoesEntrega")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valorMinimo">Valor Mínimo do Pedido</Label>
                <Input
                  id="valorMinimo"
                  name="valorMinimo"
                  type="number"
                  value={formData.configuracoesEntrega.valorMinimo}
                  onChange={(e) => handleChange(e, "configuracoesEntrega")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxaEntrega">Taxa de Entrega</Label>
                <Input
                  id="taxaEntrega"
                  name="taxaEntrega"
                  type="number"
                  value={formData.configuracoesEntrega.taxaEntrega}
                  onChange={(e) => handleChange(e, "configuracoesEntrega")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="submit">
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </form>
    </div>
  )
} 