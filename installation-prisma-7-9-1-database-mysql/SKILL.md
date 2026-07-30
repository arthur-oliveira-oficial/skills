---
name: installation-prisma-7-9-1-database-mysql
description: Install, configure, upgrade, or troubleshoot Prisma ORM 7.9.1 with MySQL or MariaDB in a Node.js and TypeScript project. Use for Prisma 7 ESM setup, prisma.config.ts, the prisma-client generator, migrations, client generation, and the @prisma/adapter-mariadb driver adapter.
---

# Configurar Prisma ORM 7.9.1 com MySQL

Instalar e configurar Prisma ORM `7.9.1` com o menor impacto possível no projeto existente. Inspecionar os arquivos antes de editá-los e preservar scripts, opções do TypeScript, modelos e configurações não relacionadas.

## Verificar o ambiente

1. Ler `package.json`, `tsconfig.json`, arquivos Prisma existentes e o mecanismo usado pelo projeto para carregar variáveis de ambiente.
2. Confirmar uma versão de Node.js suportada: `^20.19.0`, `^22.12.0` ou `^24.0.0`. Preferir uma versão LTS; não exigir uma versão ímpar ou Current.
3. Confirmar TypeScript `5.4+` quando o projeto usar TypeScript.
4. Confirmar que MySQL ou MariaDB está acessível antes de executar migrações.
5. Parar e informar incompatibilidades reais em vez de substituir configurações arbitrariamente.

## Instalar as dependências

Fixar os pacotes Prisma na versão solicitada:

```bash
npm install --save-dev prisma@7.9.1
npm install @prisma/client@7.9.1 @prisma/adapter-mariadb@7.9.1 dotenv
```

Instalar `typescript`, `tsx` e `@types/node` como dependências de desenvolvimento somente se o projeto ainda precisar deles.

## Configurar ESM

Garantir `"type": "module"` em `package.json`.

Mesclar estas opções no `tsconfig.json`, sem apagar opções válidas do projeto:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true
  }
}
```

Usar outra combinação ESM compatível quando o framework ou runtime do projeto a exigir. Não converter imports ou configurações não relacionadas sem necessidade.

## Inicializar Prisma

Em um projeto sem Prisma, executar:

```bash
npx prisma init --datasource-provider mysql --output ../generated/prisma
```

Esse comando cria `prisma/schema.prisma`, `.env` e `prisma.config.ts`. Se algum deles já existir, editar e integrar manualmente em vez de reinicializar ou sobrescrever.

Configurar `prisma.config.ts` na raiz do projeto:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

O Prisma CLI 7 não carrega `.env` automaticamente. Manter `import "dotenv/config"` quando o projeto usa arquivos `.env`; respeitar outro carregador explícito já adotado pelo projeto.

## Configurar o schema

Usar o gerador ESM `prisma-client` e declarar `output`:

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "mysql"
}
```

Manter a URL de conexão em `prisma.config.ts`, não no bloco `datasource`. Preservar modelos, enums e demais opções existentes.

## Configurar as credenciais

Definir valores reais localmente e nunca commitar segredos:

```dotenv
DATABASE_URL="mysql://username:password@localhost:3306/mydb"
DATABASE_HOST="localhost"
DATABASE_PORT="3306"
DATABASE_USER="username"
DATABASE_PASSWORD="password"
DATABASE_NAME="mydb"
```

Codificar caracteres especiais do usuário e da senha na URL. Manter `DATABASE_URL` para o Prisma CLI; usar as variáveis separadas no adapter MariaDB.

## Instanciar Prisma Client

Criar ou adaptar `lib/prisma.ts`. Ajustar o caminho do import conforme a localização real do arquivo:

```ts
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const port = Number(process.env.DATABASE_PORT ?? 3306);

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  port,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
```

Não passar uma URL `prisma://` ou `prisma+postgres://` ao adapter. Ajustar limites e timeouts com base na carga e no ambiente; não tratar `connectionLimit: 5` como valor universal.

## Migrar e gerar

Antes de alterar o banco, confirmar que `DATABASE_URL` aponta para o ambiente correto.

Para desenvolvimento:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

No Prisma 7, `migrate dev` e `db push` não executam `prisma generate` automaticamente. Executar `prisma db seed` separadamente quando houver seed configurado.

Para produção, aplicar migrações existentes:

```bash
npx prisma migrate deploy
npx prisma generate
```

Não executar `migrate dev` em produção. Não criar uma migração chamada `init` se o projeto já possuir histórico; escolher um nome descritivo.

## Validar

Executar, conforme disponível no projeto:

```bash
npx prisma validate
npx prisma generate
npx tsc --noEmit
```

Usar `npx prisma studio` apenas quando o usuário quiser inspecionar dados. Relatar arquivos alterados, comandos executados e qualquer ação pendente que dependa de credenciais ou acesso ao banco.

## Restrições do Prisma 7

- Usar `prisma-client`, não adicionar novas configurações com `prisma-client-js`.
- Declarar explicitamente o `output` do client.
- Fornecer um driver adapter ao `PrismaClient` para conexão TCP direta com MySQL/MariaDB.
- Usar `@prisma/adapter-mariadb` para MySQL/MariaDB autogerenciado; avaliar `@prisma/adapter-planetscale` separadamente para PlanetScale.
- Carregar variáveis de ambiente explicitamente para o Prisma CLI.
- Manter `prisma` e `@prisma/client` na mesma versão.
