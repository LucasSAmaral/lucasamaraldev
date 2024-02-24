# Use a imagem oficial do Node.js como base
FROM node:18.17.0-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todos os arquivos do diretório atual para o diretório de trabalho no contêiner
COPY . .

# Construa o aplicativo Next.js para produção
RUN npm run build

# Exponha a porta 3000 para que o aplicativo Next.js possa ser acessado externamente
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
