# Doces do Céu - Painel Administrativo

Este é o painel administrativo do Doces do Céu, desenvolvido com Next.js, TypeScript e Tailwind CSS.

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma (PostgreSQL)
- NextAuth.js
- Socket.IO

## Pré-requisitos

- Node.js 18+
- PostgreSQL
- Conta no Vercel
- Conta no Supabase (para banco de dados em produção)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/docesdoceu-admin.git
cd docesdoceu-admin
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
npm run prisma:seed
```

## Deploy no Vercel

1. Crie uma conta no [Vercel](https://vercel.com)

2. Crie um projeto no [Supabase](https://supabase.com) e obtenha a URL de conexão

3. Configure as variáveis de ambiente no Vercel:
   - DATABASE_URL: URL do banco de dados do Supabase
   - NEXTAUTH_URL: URL do seu site no Vercel
   - NEXTAUTH_SECRET: Chave secreta gerada
   - ADMIN_EMAIL: Email do administrador
   - ADMIN_PASSWORD: Senha do administrador
   - NEXT_PUBLIC_SOCKET_URL: URL do seu site no Vercel

4. Faça o deploy:
```bash
npm run deploy
```

## Estrutura do Projeto

```
docesdoceu-admin/
├── app/
│   ├── admin/
│   │   ├── chat/
│   │   ├── customers/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── orders/
│   │   └── products/
│   ├── api/
│   │   ├── auth/
│   │   └── socket/
│   └── layout.tsx
├── components/
│   ├── admin/
│   │   ├── chat/
│   │   ├── customers/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── orders/
│   │   └── products/
│   └── ui/
├── lib/
│   └── socket.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
├── styles/
├── types/
└── utils/
```

## Funcionalidades

- Autenticação de administradores
- Dashboard com métricas
- Gerenciamento de produtos
- Gerenciamento de pedidos
- Gerenciamento de clientes
- Chat em tempo real

## Credenciais de Acesso

- Email: admin@docesdoceu.com
- Senha: admin123

## Suporte

Para suporte, entre em contato através do email: suporte@docesdoceu.com 