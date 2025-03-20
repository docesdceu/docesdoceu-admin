"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Image as ImageIcon, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dados de exemplo - substitua por dados reais do seu banco de dados
const midias = [
  {
    id: 1,
    nome: "bolo-chocolate.jpg",
    url: "/bolo-chocolate.jpg",
    tipo: "image/jpeg",
    tamanho: "2.5 MB",
    dataUpload: "2024-03-20",
  },
  {
    id: 2,
    nome: "torta-morango.jpg",
    url: "/torta-morango.jpg",
    tipo: "image/jpeg",
    tamanho: "1.8 MB",
    dataUpload: "2024-03-19",
  },
]

export default function MidiaPage() {
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setIsUploading(true)
    try {
      // Implementar lógica de upload
      toast({
        title: "Sucesso",
        description: "Arquivo enviado com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao enviar arquivo",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      // Implementar lógica de exclusão
      toast({
        title: "Sucesso",
        description: "Arquivo excluído com sucesso!",
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao excluir arquivo",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mídia</h1>
        <p className="text-muted-foreground">Gerencie seus arquivos de mídia</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Biblioteca de Mídia</CardTitle>
            <div>
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
                disabled={isUploading}
              />
              <Button asChild>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {isUploading ? "Enviando..." : "Upload"}
                </label>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {midias.map((midia) => (
              <div
                key={midia.id}
                className="border rounded-lg p-4 space-y-4"
              >
                <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
                  <img
                    src={midia.url}
                    alt={midia.nome}
                    className="object-cover w-full h-full"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleDelete(midia.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium truncate">{midia.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {midia.tamanho} • {new Date(midia.dataUpload).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 