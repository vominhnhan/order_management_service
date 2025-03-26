# Sử dụng image Node.js phiên bản 23
FROM node:23

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn
COPY . .

# Mở port 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]