# 📦 Guia de Deploy no Render

## ✅ Pré-requisitos
- Conta no [Render.com](https://render.com)
- Repositório GitHub com seu projeto
- Node.js 18+ instalado (localmente)

## 🚀 Passo a Passo

### 1️⃣ Preparar o repositório local
```bash
# Verificar status do git
git status

# Adicionar todos os arquivos
git add .

# Commit das mudanças
git commit -m "Configurar deploy para Render"

# Push para o GitHub
git push origin main
```

### 2️⃣ Conectar ao Render
1. Acesse [https://dashboard.render.com](https://dashboard.render.com)
2. Clique em **"New +"** → **"Blueprint"**
3. Selecione seu repositório GitHub
4. O Render detectará automaticamente o arquivo `render.yaml`
5. Clique em **"Apply"**

### 3️⃣ Configurar Variáveis de Ambiente
Na página do serviço, acesse **"Environment"** e adicione:

| Variável | Valor | Descrição |
|----------|-------|-----------|
| `API_KEY` | `projetoamods` | Chave da API |
| `NODE_ENV` | `production` | Ambiente |
| `DATABASE_URL` | *(automático)* | Conexão do PostgreSQL |

### 4️⃣ Implantação
- O Render fará o build automaticamente
- Você verá os logs em tempo real
- A URL será gerada quando estiver pronto (exemplo: `https://readflow-api.onrender.com`)

## 🔗 Testar a API
```bash
# Teste a rota raiz
curl https://seu-app.onrender.com/

# Deve retornar: {"message": "🚀 API funcionando"}
```

## 🛠️ Troubleshooting

### Build falha com erro de Prisma
- Certifique-se que `schema.prisma` existe em `prisma/`
- Verifique se DATABASE_URL está configurada

### Erro de conexão ao banco
- A DATABASE_URL é criada automaticamente quando o PostgreSQL é provisionado
- Aguarde 2-3 minutos após o primeiro deploy

### Variáveis de ambiente não são lidas
- Verifique se estão no painel do Render (não no `.env`)
- Redeploy após adicionar variáveis

## 📝 Variáveis de Ambiente Necessárias
```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/db
API_KEY=projetoamods
PORT=3000 (automático)
```

## ✨ Sucesso!
Se você vê a mensagem "🚀 API funcionando" na URL gerada, está pronto! 🎉

---

**Dúvidas?** Consulte a documentação oficial: [https://render.com/docs](https://render.com/docs)
