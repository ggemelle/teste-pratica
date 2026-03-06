# 🛠️ Teste Pratica — Sistema de Gestão de Técnicos

<p align="center">
  <img src="frontend/src/assets/MPS.png" alt="TechManager Logo" width="100"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/SQL_Server-2019-CC2927?style=for-the-badge&logo=microsoft-sql-server&logoColor=white" />
</p>

<p align="center">
  Sistema web completo para gestão de técnicos de assistência técnica, desenvolvido com React, Node.js, Express e SQL Server.
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Rodando o Projeto](#-rodando-o-projeto)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Rotas da API](#-rotas-da-api)
- [Autor](#-autor)

---

## 💡 Sobre o Projeto

Esse projeto é um sistema de gestão desenvolvido para facilitar o cadastro e controle de técnicos de uma empresa de assistência técnica. A aplicação permite realizar todas as operações básicas de um CRUD (Create, Read, Update, Delete) com uma interface moderna e intuitiva, fiel ao design original do protótipo em Adobe XD.

---

## ✅ Funcionalidades

- 🔐 **Autenticação** — Login seguro com credenciais de administrador
- 📋 **Listagem** — Tabela com todos os técnicos cadastrados com efeito zebra
- 🔍 **Busca** — Filtro em tempo real por nome, e-mail ou cidade
- ➕ **Cadastro** — Formulário com validação completa dos campos
- ✏️ **Edição** — Edição dos dados com campos pré-preenchidos
- 🗑️ **Exclusão** — Exclusão com modal de confirmação (soft delete)
- 🔔 **Feedback visual** — Toast notifications para todas as ações
- 🚫 **Validação de duplicatas** — Impede cadastro de e-mail ou telefone repetido

---

## 🚀 Tecnologias

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | Interface visual |
| CSS Modules | — | Estilização isolada |
| React Icons | 4 | Ícones da interface |

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | 18 | Ambiente de execução |
| Express | 4 | Framework HTTP |
| mssql | 10 | Conexão com SQL Server |
| cors | 2 | Liberação de requisições cross-origin |
| dotenv | 16 | Variáveis de ambiente |

### Banco de Dados
| Tecnologia | Uso |
|---|---|
| SQL Server | Armazenamento dos dados |

---

## 🏗️ Arquitetura

O projeto segue a arquitetura em **3 camadas**:

```
┌─────────────────────────────────────────────────────┐
│              Frontend (React)                        │
│              porta 3000                              │
│   Interface visual — o que o usuário vê              │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP / JSON
                       ▼
┌─────────────────────────────────────────────────────┐
│              Backend (Node.js + Express)             │
│              porta 3001                              │
│   API REST — regras de negócio e validações          │
└──────────────────────┬──────────────────────────────┘
                       │ SQL Queries
                       ▼
┌─────────────────────────────────────────────────────┐
│              Banco de Dados (SQL Server)             │
│   Armazenamento permanente dos dados                 │
└─────────────────────────────────────────────────────┘
```

### Padrão de projeto — Backend

```
Routes → Controllers → Repositories → Database
  ↑           ↑
Rotas      Validations
```

- **Routes** — definem os endpoints da API
- **Controllers** — coordenam a lógica de negócio
- **Validations** — validam os dados recebidos
- **Repositories** — executam as queries SQL
- **Database** — gerencia a conexão com o SQL Server

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) v18 ou superior
- [SQL Server](https://www.microsoft.com/pt-br/sql-server/) 2019 ou superior
- [Git](https://git-scm.com/)

---

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/ggemelle/teste-pratica
cd teste-pratica
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Instale as dependências do Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuração

### Banco de Dados

Execute o script abaixo no SQL Server para criar o banco e a tabela:

```sql
CREATE DATABASE pratica-db;
GO

USE pratica-db;
GO

CREATE TABLE technicians (
  id         INT           IDENTITY(1,1) PRIMARY KEY,
  full_name  VARCHAR(255)  NOT NULL,
  email      VARCHAR(255)  NOT NULL,
  phone      VARCHAR(20)   NOT NULL,
  cep        VARCHAR(9)    NOT NULL,
  uf         CHAR(2)       NOT NULL,
  city       VARCHAR(255)  NOT NULL,
  deleted    BIT           NOT NULL DEFAULT 0,
  created_at DATETIME      NOT NULL DEFAULT GETDATE(),
  updated_at DATETIME      NOT NULL DEFAULT GETDATE()
);
```

### Variáveis de Ambiente

Na pasta `backend`, copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Banco de Dados
DB_SERVER=localhost
DB_DATABASE=pratica-db
DB_USER=sa
DB_PASSWORD=sua_senha_aqui

# Administrador
ADMIN_EMAIL=seu_email_aqui
ADMIN_PASSWORD=sua_senha_aqui
```

---

## ▶️ Rodando o Projeto

### Backend

```bash
cd backend
npm start
```

O servidor estará rodando em: `http://localhost:3001`

### Frontend

```bash
cd frontend
npm start
```

A aplicação estará disponível em: `http://localhost:3000`

---

## 📁 Estrutura de Pastas

```
techmanager/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js         # Conexão com SQL Server
│   │   ├── controllers/
│   │   │   ├── authController.js   # Lógica de autenticação
│   │   │   └── technicianController.js  # Lógica dos técnicos
│   │   ├── repositories/
│   │   │   └── technicianRepository.js  # Queries SQL
│   │   ├── routes/
│   │   │   ├── authRoutes.js       # Rotas de autenticação
│   │   │   └── technicianRoutes.js # Rotas dos técnicos
│   │   ├── validations/
│   │   │   └── technicianValidation.js  # Validação dos dados
│   │   └── server.js               # Entrada do servidor
│   ├── .env                        # Variáveis de ambiente
│   ├── .env.example                # Modelo das variáveis
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── assets/                 # Imagens e ícones
    │   ├── components/
    │   │   ├── TechnicianFormModal.jsx   # Modal de cadastro/edição
    │   │   ├── TechnicianFormModal.module.css
    │   │   ├── DeleteConfirmModal.jsx    # Modal de exclusão
    │   │   ├── DeleteConfirmModal.module.css
    │   │   ├── CancelConfirmModal.jsx    # Modal de cancelamento
    │   │   ├── CancelConfirmModal.module.css
    │   │   ├── Toast.jsx                 # Notificações
    │   │   └── Toast.module.css
    │   ├── pages/
    │   │   ├── LoginPage.jsx        # Tela de login
    │   │   ├── LoginPage.module.css
    │   │   ├── Technicians.jsx      # Tela principal
    │   │   └── Technicians.module.css
    │   ├── services/
    │   │   └── api.js               # Comunicação com o backend
    │   └── App.js                   # Raiz da aplicação
    └── package.json
```

---

## 🔌 Rotas da API

### Autenticação

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/login` | Realiza o login do administrador |

**Body:**
```json
{
  "email": "admin@email.com",
  "password": "12345678"
}
```

### Técnicos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/technicians` | Lista todos os técnicos |
| `POST` | `/api/technicians` | Cadastra um novo técnico |
| `PUT` | `/api/technicians/:id` | Atualiza um técnico |
| `DELETE` | `/api/technicians/:id` | Remove um técnico |

**Body (POST/PUT):**
```json
{
  "full_name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 9 1234-5678",
  "cep": "12345-678",
  "city": "São Paulo",
  "uf": "SP"
}
```

### Validações aplicadas

| Campo | Regra |
|---|---|
| Nome | Obrigatório, mínimo 3 caracteres |
| E-mail | Obrigatório, deve conter @, único no sistema |
| Telefone | Obrigatório, formato `(11) 9 1234-5678`, único no sistema |
| CEP | Obrigatório, formato `12345-678` |
| Cidade | Obrigatório |
| UF | Obrigatório, 2 letras maiúsculas |

---

## 👤 Autor

Feito por **[Gabriel de Souza Gemelle Leal]**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-gemelle/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ggemelle)