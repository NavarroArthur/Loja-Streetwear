# Template Loja de Roupas

Um template moderno e responsivo para loja de roupas, desenvolvido com HTML, CSS e JavaScript puro.

## 🎨 Características

- **Design Moderno**: Interface limpa e elegante com gradientes e animações suaves
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Carrinho de Compras**: Sistema completo de carrinho com sidebar
- **Filtros de Produtos**: Filtre produtos por categoria
- **Busca de Produtos**: Funcionalidade de busca em tempo real
- **Menu Mobile**: Menu hambúrguer para dispositivos móveis
- **Animações Suaves**: Transições e animações CSS para melhor UX

## 📁 Estrutura de Arquivos

```
TEMPLATE LOJA ROUPA/
│
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interatividade
├── package.json        # Configuração npm (opcional)
├── run.bat             # Executar site (Windows - direto)
├── run-server.bat      # Executar com servidor (Windows)
├── run.sh              # Executar com servidor (Linux/Mac)
└── README.md           # Este arquivo
```

## 🚀 Como Executar o Site

### ⚡ Método Rápido (Windows)

**Opção 1: Abrir diretamente**
- Clique duas vezes em `run.bat` - abre o site no navegador

**Opção 2: Com servidor local**
- Clique duas vezes em `run-server.bat` - inicia um servidor local na porta 8000
- Acesse: `http://localhost:8000`

### 🖥️ Método Manual

**Windows:**
```bash
# Abrir diretamente
start index.html

# Ou com servidor Python
python -m http.server 8000
```

**Linux/Mac:**
```bash
# Dar permissão de execução
chmod +x run.sh

# Executar
./run.sh

# Ou manualmente
python3 -m http.server 8000
```

### 📦 Com Node.js (Opcional)

Se você tem Node.js instalado:
```bash
npm start
```

Isso iniciará um servidor local na porta 8000 e abrirá automaticamente no navegador.

## ✨ Funcionalidades

### Navegação
- Menu fixo no topo da página
- Links de navegação suave para seções
- Menu responsivo para mobile

### Seções

1. **Hero Section**: Banner principal com call-to-action
2. **Categorias**: Grid de categorias de produtos
3. **Produtos**: Lista de produtos com filtros e busca
4. **Sobre**: Seção informativa sobre a loja
5. **Contato**: Formulário de contato e informações

### Produtos
- Cards de produtos com imagens, preços e badges
- Filtros por categoria (Todos, Camisetas, Calças, Casacos)
- Busca em tempo real
- Adicionar produtos ao carrinho

### Carrinho de Compras
- Sidebar lateral com lista de produtos
- Contador de itens no header
- Remover itens do carrinho
- Cálculo automático do total

## 🎨 Personalização

### Cores
As cores principais podem ser alteradas no arquivo `styles.css` através das variáveis CSS:

```css
:root {
    --primary-color: #1a1a1a;
    --secondary-color: #f5f5f5;
    --accent-color: #e91e63;
    --text-color: #333;
    --text-light: #666;
}
```

### Produtos
Os produtos podem ser editados no arquivo `script.js` no array `products`:

```javascript
const products = [
    {
        id: 1,
        name: "Nome do Produto",
        category: "camisetas",
        price: 79.90,
        oldPrice: 99.90,
        image: "👕",
        badge: "Novo"
    },
    // ...
];
```

### Conteúdo
Todo o conteúdo textual pode ser editado diretamente no arquivo `index.html`.

## 📱 Responsividade

O template é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout completo com múltiplas colunas
- **Tablet**: Grid adaptativo
- **Mobile**: Layout em coluna única, menu hambúrguer

## 🔧 Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e Flexbox/Grid)
- JavaScript (ES6+)
- Google Fonts (Inter)

## 📝 Notas

- Este é um template frontend puro, sem backend
- O carrinho de compras funciona apenas no lado do cliente (localStorage pode ser adicionado)
- As imagens dos produtos usam emojis como placeholder - substitua por imagens reais
- O formulário de contato não envia dados (requer backend para funcionar)

## 🌐 Deploy no Render

O projeto está configurado para deploy no Render. Siga os passos abaixo:

### Passo 1: Preparar o Repositório
1. Certifique-se de que todos os arquivos estão no repositório Git
2. O arquivo `render.yaml` já está configurado

### Passo 2: Criar Serviço no Render
1. Acesse [render.com](https://render.com) e faça login
2. Clique em "New +" e selecione "Static Site"
3. Conecte seu repositório Git (GitHub, GitLab ou Bitbucket)
4. Configure o serviço:
   - **Name**: `trap-street-store` (ou outro nome de sua escolha)
   - **Build Command**: Deixe em branco (site estático)
   - **Publish Directory**: `.` (ponto - raiz do projeto)
5. Clique em "Create Static Site"

### Passo 3: Deploy Automático
- O Render detectará automaticamente o arquivo `render.yaml`
- O deploy será feito automaticamente após cada push no repositório
- Você receberá uma URL: `https://seu-projeto.onrender.com`

### Alternativa: Deploy Manual via Dashboard
Se preferir configurar manualmente:
1. Tipo: Static Site
2. Build Command: (vazio)
3. Publish Directory: `.`
4. Headers: Configurados automaticamente pelo `render.yaml`

### Arquivos Criados
- ✅ `render.yaml` - Configuração do Render
- ✅ `.gitignore` - Arquivos ignorados pelo Git

## 🚀 Próximos Passos

Para transformar isso em uma aplicação completa, você pode:

1. Adicionar um backend para persistência de dados
2. Integrar com um sistema de pagamento
3. Adicionar autenticação de usuários
4. Implementar um sistema de gerenciamento de produtos
5. Adicionar imagens reais dos produtos
6. Integrar com APIs de entrega
7. Adicionar avaliações de produtos

## 📄 Licença

Este é um template livre para uso pessoal e comercial.

---

Desenvolvido com ❤️ para criar uma experiência de compra moderna e agradável.

