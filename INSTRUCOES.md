# Instruções de Uso - FIAP Blog Frontend

## 🚀 Como Executar o Projeto

### 1. Pré-requisitos
- Node.js 16+ instalado
- Backend da API rodando na porta 3000
- npm ou yarn

### 2. Instalação e Configuração

```bash
# 1. Navegue para o diretório do projeto
cd fiap-blogging-frontend

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
# Copie o arquivo de exemplo e edite conforme necessário
cp env.example .env

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

### 3. Acesse a Aplicação
- **URL**: http://localhost:5173
- **Login**: professor@fiap.com
- **Senha**: 123456

## 📱 Funcionalidades Disponíveis

### Para Visitantes (Não Autenticados)
- ✅ Visualizar lista de posts na página principal
- ✅ Buscar posts por palavras-chave
- ✅ Ler posts completos
- ✅ Visualizar metadados (autor, data, tags)

### Para Professores (Autenticados)
- ✅ Todas as funcionalidades de visitantes
- ✅ Criar novos posts
- ✅ Editar posts existentes
- ✅ Deletar posts
- ✅ Acessar painel administrativo
- ✅ Visualizar estatísticas dos posts

## 🔧 Scripts Disponíveis

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

## 🎨 Estrutura de Navegação

### Rotas Públicas
- `/` - Página principal com lista de posts
- `/post/:id` - Visualização de post específico
- `/login` - Página de login

### Rotas Protegidas (Apenas Professores)
- `/create-post` - Criar novo post
- `/edit-post/:id` - Editar post existente
- `/admin` - Painel administrativo

## 🔐 Sistema de Autenticação

### Credenciais de Teste
- **Email**: professor@fiap.com
- **Senha**: 123456

### Fluxo de Autenticação
1. Acesse `/login`
2. Digite as credenciais
3. Após login, você será redirecionado para a página solicitada
4. O sistema mantém a sessão ativa
5. Use o botão "Sair" para fazer logout

## 📝 Como Criar um Post

1. **Faça login** como professor
2. **Clique em "Novo Post"** no menu ou acesse `/create-post`
3. **Preencha os campos**:
   - Título (obrigatório, 3-200 caracteres)
   - Autor (obrigatório, 2-100 caracteres)
   - Conteúdo (obrigatório, mínimo 10 caracteres)
   - Tags (opcional, adicione pressionando Enter)
4. **Clique em "Publicar Post"**
5. **O post será criado** e você será redirecionado para a página principal

## ✏️ Como Editar um Post

1. **Acesse o painel administrativo** (`/admin`)
2. **Clique no ícone de editar** (lápis) do post desejado
3. **Modifique os campos** necessários
4. **Clique em "Salvar Alterações"**
5. **Você será redirecionado** para o painel administrativo

## 🗑️ Como Deletar um Post

1. **Acesse o painel administrativo** (`/admin`)
2. **Clique no ícone de deletar** (lixeira) do post desejado
3. **Confirme a ação** no diálogo que aparecer
4. **O post será removido** permanentemente

## 🔍 Funcionalidade de Busca

### Na Página Principal
- Digite palavras-chave no campo de busca
- A busca é feita em tempo real (debounce de 300ms)
- Busca por título, conteúdo e tags
- Limpe o campo para ver todos os posts

### No Painel Administrativo
- Busca similar à página principal
- Inclui filtros adicionais por autor
- Mostra estatísticas dos posts

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Desktop**: Layout completo com navegação horizontal
- **Tablet**: Layout adaptado com elementos otimizados
- **Mobile**: Design mobile-first com navegação simplificada

## 🎯 Dicas de Uso

### Para Professores
- Use tags relevantes para facilitar a busca
- Mantenha títulos descritivos e atrativos
- O tempo de leitura é calculado automaticamente
- Posts são publicados imediatamente após criação

### Para Desenvolvedores
- Use `npm run lint` antes de fazer commit
- Formate o código com `npm run format`
- Teste em diferentes tamanhos de tela
- Verifique a integração com a API

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

## 📞 Suporte

Para problemas técnicos ou dúvidas:
1. Verifique a documentação no README.md
2. Consulte os logs do console do navegador
3. Entre em contato com a equipe de desenvolvimento
