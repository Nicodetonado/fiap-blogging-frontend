# FIAP Blog - Frontend

Sistema de blogging desenvolvido em React para professores da rede pública, proporcionando uma interface gráfica robusta, intuitiva e eficiente para gerenciamento de conteúdo educacional.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca para construção da interface
- **Vite** - Build tool e dev server
- **React Router DOM** - Roteamento da aplicação
- **Styled Components** - Estilização CSS-in-JS
- **React Hook Form** - Gerenciamento de formulários
- **Yup** - Validação de schemas
- **Axios** - Cliente HTTP para comunicação com API
- **React Hot Toast** - Notificações toast
- **Lucide React** - Ícones modernos
- **Context API** - Gerenciamento de estado global

## 📋 Funcionalidades

### Páginas Implementadas

1. **Página Principal (Home)**
   - Lista de todos os posts disponíveis
   - Campo de busca para filtrar posts por palavras-chave
   - Exibição de título, autor, data e tags de cada post
   - Design responsivo e cards interativos

2. **Página de Leitura de Post**
   - Exibição completa do conteúdo do post
   - Metadados do post (autor, data, tempo de leitura)
   - Sistema de tags
   - Navegação de volta para a lista

3. **Página de Criação de Postagens**
   - Formulário completo para criação de posts
   - Validação em tempo real
   - Sistema de tags dinâmico
   - Contador de caracteres
   - Acesso restrito a professores

4. **Página de Edição de Postagens**
   - Carregamento automático dos dados do post
   - Formulário pré-preenchido
   - Mesmas funcionalidades da criação
   - Acesso restrito a professores

5. **Página Administrativa**
   - Lista completa de todas as postagens
   - Estatísticas dos posts
   - Ações de editar, visualizar e excluir
   - Busca e filtros
   - Acesso restrito a professores

6. **Sistema de Autenticação**
   - Login para professores
   - Proteção de rotas
   - Gerenciamento de sessão
   - Credenciais de demonstração

## 🏗️ Arquitetura da Aplicação

### Estrutura de Pastas

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.jsx      # Layout principal da aplicação
│   └── ProtectedRoute.jsx # Componente de proteção de rotas
├── contexts/           # Contextos React para estado global
│   ├── AuthContext.jsx # Contexto de autenticação
│   └── PostContext.jsx # Contexto de gerenciamento de posts
├── pages/              # Páginas da aplicação
│   ├── Home.jsx        # Página principal
│   ├── Login.jsx       # Página de login
│   ├── PostDetail.jsx  # Detalhes do post
│   ├── CreatePost.jsx  # Criação de post
│   ├── EditPost.jsx    # Edição de post
│   └── Admin.jsx       # Painel administrativo
├── services/           # Serviços de comunicação com API
│   ├── api.js          # Configuração do Axios
│   ├── authService.js  # Serviços de autenticação
│   └── postService.js  # Serviços de posts
├── utils/              # Utilitários
├── hooks/              # Hooks customizados
└── styles/             # Estilos globais
```

### Gerenciamento de Estado

A aplicação utiliza **Context API** para gerenciamento de estado global:

- **AuthContext**: Gerencia autenticação, usuário logado e permissões
- **PostContext**: Gerencia lista de posts, operações CRUD e busca

### Comunicação com API

- **Axios** configurado com interceptors para autenticação automática
- Tratamento de erros centralizado
- Timeout e retry automático
- Headers de autenticação automáticos

## 🎨 Design e UX

### Características do Design

- **Design System Consistente**: Cores, tipografia e espaçamentos padronizados
- **Gradientes Modernos**: Uso de gradientes para elementos principais
- **Cards Interativos**: Hover effects e transições suaves
- **Ícones Intuitivos**: Lucide React para consistência visual
- **Responsividade**: Design adaptável para mobile e desktop

### Acessibilidade

- Navegação por teclado
- Contraste adequado de cores
- Labels descritivos
- Estados de loading e erro
- Feedback visual para ações

## 🔧 Setup e Instalação

### Pré-requisitos

- Node.js 16+ 
- npm ou yarn
- Backend da API rodando na porta 3000

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd fiap-blogging-frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp env.example .env
   ```
   
   Edite o arquivo `.env` com suas configurações:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_APP_NAME=FIAP Blog
   VITE_APP_DESCRIPTION=Sistema de blogging para professores da rede pública
   ```

4. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige problemas do linter

## 🔐 Autenticação

### Credenciais de Demonstração

- **Email**: professor@fiap.com
- **Senha**: 123456

### Sistema de Permissões

- **Visitantes**: Podem visualizar posts
- **Professores**: Podem criar, editar e excluir posts
- **Rotas Protegidas**: `/create-post`, `/edit-post/:id`, `/admin`

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a diferentes tamanhos de tela:

- **Desktop**: Layout completo com sidebar e cards
- **Tablet**: Layout adaptado com navegação otimizada
- **Mobile**: Design mobile-first com navegação simplificada

## 🚀 Deploy

### Build de Produção

```bash
npm run build
```

O build será gerado na pasta `dist/` e pode ser servido por qualquer servidor web estático.

### Variáveis de Ambiente para Produção

Certifique-se de configurar as variáveis de ambiente adequadas para o ambiente de produção:

```env
VITE_API_URL=https://sua-api.com
VITE_APP_NAME=FIAP Blog
VITE_APP_DESCRIPTION=Sistema de blogging para professores da rede pública
```

## 🧪 Testes

Para executar os testes (quando implementados):

```bash
npm test
```

## 📝 API Integration

### Endpoints Utilizados

- `GET /posts` - Lista todos os posts
- `GET /posts/search?q=termo` - Busca posts
- `GET /posts/:id` - Busca post por ID
- `POST /posts` - Cria novo post
- `PUT /posts/:id` - Atualiza post
- `DELETE /posts/:id` - Deleta post

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

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

Desenvolvido pela equipe do Tech Challenge - FIAP

## 📞 Suporte

Para suporte ou dúvidas, entre em contato através dos canais oficiais da FIAP.
