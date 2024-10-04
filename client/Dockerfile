# client/Dockerfile

# 使用 Node.js 官方镜像
FROM node:18.17.1

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 并安装依赖
COPY package*.json ./
RUN npm install

# 复制前端代码
COPY . .

# 构建前端应用
RUN npm run build

# 使用 NGINX 运行应用
FROM nginx:alpine

# 复制 NGINX 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制 React 应用 build 生成的文件到 NGINX 的默认静态文件目录
COPY --from=build /app/build /usr/share/nginx/html

# 暴露 5173 端口
EXPOSE 5173

# 启动 NGINX
CMD ["nginx", "-g", "daemon off;"]

