# 📱 Frontend de Blogging para Professores - Tech Challenge

Interface React moderna e responsiva para criação e gerenciamento de posts educacionais, desenvolvida com Design System consistente e integração completa com a API REST.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura da Aplicação](#arquitetura-da-aplicação)
- [Setup Inicial](#setup-inicial)
- [Guia de Uso](#guia-de-uso)
- [Design System](#design-system)
- [Integração com API](#integração-com-api)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## 🎯 Visão Geral

Esta aplicação React fornece uma interface gráfica robusta, intuitiva e eficiente para professores da rede pública criarem e gerenciarem posts educacionais.

### Funcionalidades Principais:
- ✅ **Interface moderna** com Design System consistente
- ✅ **CRUD completo** de posts educacionais
- ✅ **Sistema de busca** em tempo real com debounce
- ✅ **Autenticação** para professores
- ✅ **Design responsivo** para mobile e desktop
- ✅ **Validação robusta** de formulários
- ✅ **Notificações** elegantes
- ✅ **Integração completa** com API REST
- ✅ **Sistema de tags** para organização de posts
- ✅ **Performance otimizada** com hooks memoizados

## 🏗️ Arquitetura da Aplicação

### Estrutura do Projeto:
```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Componentes base (Button, Input, Card)
│   ├── forms/           # Componentes de formulário
│   └── Layout.jsx       # Layout principal
├── contexts/            # Contextos React
│   ├── AuthContext.jsx  # Gerenciamento de autenticação
│   └── PostContext.jsx  # Gerenciamento de posts
├── pages/               # Páginas da aplicação
│   ├── Home.jsx         # Lista de posts
│   ├── PostDetail.jsx   # Detalhes do post
│   ├── CreatePost.jsx   # Criação de post
│   ├── EditPost.jsx     # Edição de post
│   ├── Admin.jsx        # Painel administrativo
│   └── Login.jsx        # Página de login
├── services/            # Serviços de API
│   ├── api.js           # Configuração Axios
│   ├── authService.js   # Serviços de autenticação
│   └── postService.js   # Serviços de posts
├── hooks/               # Hooks customizados
│   ├── useApi.js        # Hook para chamadas API
│   ├── useForm.js       # Hook para formulários
│   └── usePosts.js      # Hook para posts
├── styles/              # Sistema de design
│   ├── theme.js         # Tema centralizado
│   ├── GlobalStyles.js  # Estilos globais
│   └── index.js         # Exportações
└── utils/               # Utilitários
    └── validation.js    # Validações
```

### Padrão Arquitetural:
- **Component-Based Architecture** - Componentes reutilizáveis
- **Context API** - Gerenciamento de estado global
- **Custom Hooks** - Lógica reutilizável
- **Service Layer** - Abstração da comunicação com API
- **Design System** - Consistência visual

### Tecnologias:
- **Frontend**: React 18 + Vite
- **Roteamento**: React Router DOM
- **Estilização**: Styled Components
- **Formulários**: React Hook Form + Yup
- **HTTP Client**: Axios
- **Notificações**: React Hot Toast
- **Ícones**: Lucide React

## 🚀 Setup Inicial

### Pré-requisitos:
- Node.js 16+ instalado
- Backend da API rodando na porta 3000
- npm ou yarn

### Instalação:

```bash
# 1. Clone o repositório
git clone https://github.com/Nicodetonado/fiap-blogging-frontend.git
cd fiap-blogging-frontend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp env.example .env

# 4. Inicie o servidor de desenvolvimento
npm run dev

# 5. Acesse a aplicação
# http://localhost:5173
```

### Variáveis de Ambiente:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=FIAP Blog
VITE_APP_DESCRIPTION=Sistema de blogging para professores
```

### Verificação do Setup:

```bash
# Teste se a aplicação está funcionando
curl http://localhost:5173

# Deve retornar a página HTML da aplicação
```

## 📖 Guia de Uso

### Credenciais de Demonstração

- **Email**: professor@fiap.com
- **Senha**: 123456

### Funcionalidades por Tipo de Usuário

#### Para Visitantes (Não Autenticados)
- ✅ Visualizar lista de posts na página principal
- ✅ Buscar posts por palavras-chave
- ✅ Ler posts completos
- ✅ Visualizar metadados (autor, data, tags)

#### Para Professores (Autenticados)
- ✅ Todas as funcionalidades de visitantes
- ✅ Criar novos posts
- ✅ Editar posts existentes
- ✅ Deletar posts
- ✅ Acessar painel administrativo
- ✅ Visualizar estatísticas dos posts

### Rotas da Aplicação

#### Rotas Públicas
- `/` - Página principal com lista de posts
- `/post/:id` - Visualização de post específico
- `/login` - Página de login

#### Rotas Protegidas (Apenas Professores)
- `/create-post` - Criar novo post
- `/edit-post/:id` - Editar post existente
- `/admin` - Painel administrativo

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build e Deploy
npm run build        # Gera build de produção
npm run preview      # Preview do build de produção

# Qualidade de Código
npm run lint         # Executa ESLint
npm run lint:fix     # Corrige problemas do ESLint
npm run format       # Formata código com Prettier
npm run format:check # Verifica formatação
```

## 🎨 Design System

### Cores Principais

- **Primary**: Vermelho (#C8102E) - elementos principais
- **Secondary**: Grafite (#475569) - elementos secundários  
- **Gray**: Tons de cinza para textos e backgrounds
- **Success**: Verde para feedback positivo
- **Error**: Vermelho para feedback negativo
- **Warning**: Amarelo para avisos

### Escala de Cores

Cada cor tem 10 tons: `lightest`, `lighter`, `light`, `medium`, `base`, `main`, `dark`, `darker`, `darkest`, `deep`

### Componentes Base

#### Button
```jsx
<Button variant="primary">Primário</Button>
<Button variant="secondary">Secundário</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Perigo</Button>
```

#### Input
```jsx
<Input
  label="Nome"
  placeholder="Digite seu nome"
  error="Campo obrigatório"
  fullWidth
/>
```

#### Card
```jsx
<Card hoverable>
  <Card.Header>
    <Card.Title>Título</Card.Title>
  </Card.Header>
  <Card.Content>
    Conteúdo
  </Card.Content>
</Card>
```

### Hooks Customizados

#### useForm
```jsx
const { values, errors, handleChange, validateForm } = useForm(
  initialValues,
  validationRules
);
```

#### useApi
```jsx
const { loading, error, execute } = useApi();
```

## 🔌 Integração com API

### Endpoints Utilizados

- `GET /api/posts` - Lista todos os posts
- `GET /api/posts/search?q=termo` - Busca posts
- `GET /api/posts/:id` - Busca post por ID
- `POST /api/posts` - Cria novo post
- `PUT /api/posts/:id` - Atualiza post
- `DELETE /api/posts/:id` - Deleta post

### Estrutura de Dados

```javascript
// Post
{
  _id: string,
  title: string,
  content: string,
  author: string,
  tags: string[],
  isPublished: boolean,
  readTime: number,
  createdAt: string,
  updatedAt: string
}
```

### Configuração Axios

```javascript
// Interceptors automáticos para:
// - Autenticação (Bearer token)
// - Tratamento de erros
// - Timeout e retry
// - Headers padrão
```

## 🛠️ Tecnologias Utilizadas

### Frontend Core
- **React 18** - Biblioteca para construção da interface
- **Vite** - Build tool e dev server moderno
- **React Router DOM** - Roteamento da aplicação

### Estilização e UI
- **Styled Components** - CSS-in-JS com tema centralizado
- **Lucide React** - Ícones modernos e consistentes
- **React Hot Toast** - Notificações elegantes

### Formulários e Validação
- **React Hook Form** - Gerenciamento eficiente de formulários
- **Yup** - Validação de schemas robusta

### Comunicação e Estado
- **Axios** - Cliente HTTP com interceptors
- **Context API** - Gerenciamento de estado global
- **Custom Hooks** - Lógica reutilizável

### Qualidade e Desenvolvimento
- **ESLint** - Linting de código
- **Prettier** - Formatação de código
- **Vite** - Hot Module Replacement

## 📊 Estatísticas do Projeto

- **Páginas**: 6 páginas principais
- **Componentes**: 15+ componentes reutilizáveis
- **Hooks**: 5 hooks customizados
- **Rotas**: 8 rotas (3 públicas, 5 protegidas)
- **Design System**: Cores, tipografia e espaçamentos padronizados
- **Responsividade**: Mobile-first design
- **Acessibilidade**: Navegação por teclado e contraste adequado

## 🔄 Melhorias Recentes

### Sistema de Design Centralizado
- ✅ **CSS inline removido** - Todo CSS movido para o sistema de design
- ✅ **Componentes estilizados** - 50+ componentes reutilizáveis
- ✅ **Consistência visual** - Alinhamento perfeito entre elementos
- ✅ **Largura padronizada** - Formulários alinhados com containers (800px)

### Performance e Estabilidade
- ✅ **Hooks memoizados** - useCallback em todas as funções do contexto
- ✅ **Debounce otimizado** - Busca sem loops infinitos (300ms)
- ✅ **Validação simplificada** - Sistema de validação mais robusto
- ✅ **Sistema de tags** - Adicionar/remover tags com Enter

### Correções de Bugs
- ✅ **Loop infinito na busca** - Corrigido com memoização adequada
- ✅ **Botão de publicar** - Funcionamento correto do formulário
- ✅ **Adicionar tags** - Sistema de tags totalmente funcional
- ✅ **Validação de formulários** - Mensagens de erro claras

## 🚨 Solução de Problemas

### Erro de Conexão com API
- Verifique se o backend está rodando na porta 3000
- Confirme a URL da API no arquivo `.env`
- Verifique se não há bloqueios de CORS

### Problemas de Autenticação
- Limpe o localStorage do navegador
- Verifique se as credenciais estão corretas
- Confirme se o backend está processando autenticação

### Erros de Build
- Execute `npm install` para reinstalar dependências
- Verifique se todas as dependências estão atualizadas
- Execute `npm run lint:fix` para corrigir problemas de código

---

**Tech Challenge PÓS-FULLSTACK 2025 - FIAP** 🚀