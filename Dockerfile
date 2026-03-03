# Stage 1: Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

> **Note:** If you're using Vite, the build output folder is `dist` not `build`. Change `/app/build` to `/app/dist`.

---

## Step 2: Create a `.dockerignore` file

In the same root folder, create `.dockerignore`:
```
node_modules
build
dist
.env
.git
.gitignore
README.md