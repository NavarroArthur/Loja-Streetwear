# 🚀 Como Usar o Site

## ⚡ Início Rápido (Mais Fácil!)

### 🪟 Windows - Método Mais Simples:

**Opção 1: Abrir diretamente**
- **Clique duas vezes em `run.bat`** 
- O site abrirá automaticamente no seu navegador!

**Opção 2: Com servidor local (Recomendado)**
- **Clique duas vezes em `run-server.bat`**
- O servidor iniciará na porta 8000
- Acesse: `http://localhost:8000`

### 🐧 Linux/Mac:
```bash
chmod +x run.sh
./run.sh
```

## 📖 Métodos Manuais (Alternativos)

### Opção 1: Abrir diretamente no navegador
1. Vá até a pasta do projeto
2. Clique duas vezes no arquivo **`index.html`**
3. O site abrirá no seu navegador padrão

### Opção 2: Usar um servidor local (Recomendado)

#### Com Python (Windows/Mac/Linux):
```bash
# Python 3
python -m http.server 8000

# Ou
python3 -m http.server 8000
```
Depois acesse: `http://localhost:8000`

#### Com Node.js:
```bash
# Instale o http-server globalmente (uma vez)
npm install -g http-server

# Depois execute
http-server
```

#### Com PHP:
```bash
php -S localhost:8000
```

## 📁 Estrutura dos Arquivos

```
TEMPLATE LOJA ROUPA/
├── index.html          # Página principal do site
├── styles.css          # Estilos CSS do site
├── script.js           # JavaScript com todas as funcionalidades
├── README.md           # Documentação completa
└── COMO-USAR.md        # Este arquivo
```

## ✅ Funcionalidades do Site

- ✅ Navegação completa entre seções
- ✅ Carrinho de compras funcional
- ✅ Filtros de produtos por categoria
- ✅ Busca de produtos em tempo real
- ✅ Menu mobile responsivo
- ✅ Design moderno e responsivo
- ✅ Animações suaves

## 🎨 Personalizar o Site

### Alterar o nome da loja:
Edite `index.html` linha 18:
```html
<h1>Seu Nome Aqui</h1>
```

### Alterar produtos:
Edite `script.js` no array `products` (linha ~3)

### Alterar cores:
Edite `styles.css` nas variáveis CSS (linha ~6):
```css
:root {
    --primary-color: #1a1a1a;
    --accent-color: #e91e63;
    /* ... */
}
```

## 🌐 Publicar o Site

### Opções gratuitas:
1. **Netlify**: Arraste a pasta para netlify.com
2. **Vercel**: Conecte via GitHub
3. **GitHub Pages**: Faça upload para um repositório GitHub
4. **Firebase Hosting**: Use Firebase Hosting

### Hospedagem tradicional:
- Qualquer serviço de hospedagem web
- Apenas faça upload dos arquivos via FTP

## 📱 Testar Responsividade

1. Abra o site no navegador
2. Pressione `F12` para abrir DevTools
3. Clique no ícone de dispositivo móvel
4. Teste diferentes tamanhos de tela

## 🐛 Problemas Comuns

**CSS não carrega?**
- Verifique se o arquivo `styles.css` está na mesma pasta
- Verifique o caminho no HTML: `<link rel="stylesheet" href="styles.css">`

**JavaScript não funciona?**
- Verifique se o arquivo `script.js` está na mesma pasta
- Abra o Console do navegador (F12) para ver erros

**Imagens não aparecem?**
- Atualmente usa emojis como placeholder
- Substitua pelos caminhos das suas imagens

---

**Pronto para usar!** 🎉

Seu site está completo e funcional. Basta abrir o `index.html` no navegador!

