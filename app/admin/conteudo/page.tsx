"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Dados de exemplo - substitua por dados reais do seu banco de dados
const conteudos = [
  {
    id: 1,
    titulo: "Sobre Nós",
    slug: "sobre-nos",
    conteudo: "Somos uma confeitaria especializada em bolos e doces artesanais...",
    metaDescricao: "Conheça a história da Doces do Céu",
  },
  {
    id: 2,
    titulo: "Política de Privacidade",
    slug: "privacidade",
    conteudo: "Esta política de privacidade descreve como coletamos...",
    metaDescricao: "Política de privacidade da Doces do Céu",
  },
]

export default function ConteudoPage() {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState<{
    titulo: string
    conteudo: string
    metaDescricao: string
  } | null>(null)
  const { toast } = useToast()

  const handleEdit = (conteudo: typeof conteudos[0]) => {
    setEditingId(conteudo.id)
    setEditData({
      titulo: conteudo.titulo,
      conteudo: conteudo.conteudo,
      metaDescricao: conteudo.metaDescricao,
    })
  }

  const handleSave = () => {
    // Implementar lógica de salvamento
    toast({
      title: "Sucesso",
      description: "Conteúdo salvo com sucesso!",
    })
    setEditingId(null)
    setEditData(null)
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conteúdo</h1>
        <p className="text-muted-foreground">Gerencie o conteúdo do seu site</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Páginas do Site</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {conteudos.map((conteudo) => (
              <div
                key={conteudo.id}
                className="border rounded-lg p-6 space-y-4"
              >
                {editingId === conteudo.id ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`titulo-${conteudo.id}`}>Título</Label>
                      <Input
                        id={`titulo-${conteudo.id}`}
                        value={editData?.titulo}
                        onChange={(e) =>
                          setEditData((prev) =>
                            prev ? { ...prev, titulo: e.target.value } : null
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`conteudo-${conteudo.id}`}>Conteúdo</Label>
                      <Textarea
                        id={`conteudo-${conteudo.id}`}
                        value={editData?.conteudo}
                        onChange={(e) =>
                          setEditData((prev) =>
                            prev ? { ...prev, conteudo: e.target.value } : null
                          )
                        }
                        className="min-h-[200px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`meta-${conteudo.id}`}>
                        Meta Descrição
                      </Label>
                      <Input
                        id={`meta-${conteudo.id}`}
                        value={editData?.metaDescricao}
                        onChange={(e) =>
                          setEditData((prev) =>
                            prev
                              ? { ...prev, metaDescricao: e.target.value }
                              : null
                          )
                        }
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                      <Button onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-medium">{conteudo.titulo}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(conteudo)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground">
                        {conteudo.conteudo.substring(0, 200)}...
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Meta descrição: {conteudo.metaDescricao}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 