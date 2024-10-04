# backend/Dockerfile

# 使用 Node.js 官方镜像
FROM node:18.17.1

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制后端代码
COPY . .

# 公开后端应用的端口（例如 3200)
EXPOSE 3200

# 启动后端应用
CMD ["npm", "start"]
