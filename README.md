
# Back-end e-commerce sederhana menggunakan Node.js, Prisma, Express, dan PostgreSQL.

## Instalasi

1. Clone repositori ini:

   ```bash
   git clone https://github.com/arizdn234/ecommerce-api.git
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd ecommerce-api
   ```

3. Instal dependensi:

   ```bash
   npm install
   ```

4. Salin file `.env.example` ke `.env` dan sesuaikan konfigurasi database:

   ```bash
   cp .env.example .env
   ```

   Isi variabel lingkungan yang sesuai, termasuk URL database PostgreSQL.

5. Jalankan migrasi database:

   ```bash
   npx prisma migrate dev
   ```

6. Jalankan aplikasi:

   ```bash
   npm start
   ```

Aplikasi akan berjalan di `http://localhost:3000`.

## Endpoint API

Berikut adalah beberapa endpoint API yang tersedia:

- **Pengelolaan Produk:**
  - `GET /products`
  - `GET /products/:id`
  - `POST /products`
  - `PUT /products/:id`
  - `DELETE /products/:id`

- **Pengelolaan Pengguna:**
  - `POST /signup`
  - `POST /login`
  - `GET /users/:id`
  - `PUT /users/:id`

- **Pengelolaan Pesanan:**
  - `POST /orders`
  - `GET /orders/:id`
  - `GET /orders/user/:userId`
  - `PUT /orders/:id`

- **Pembayaran:**
  - `POST /payment`

- **Pencarian dan Filter:**
  - `GET /search?q=:query`
  - `GET /products/category/:category`

- **Manajemen Keranjang Belanja:**
  - `GET /cart`
  - `POST /cart/add`
  - `PUT /cart/update/:productId`
  - `DELETE /cart/remove/:productId`
