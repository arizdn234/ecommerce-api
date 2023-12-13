
# Back-end e-commerce sederhana menggunakan Node.js, Prisma, Express, dan PostgreSQL.
Studi kasus aplikasi e-commerce B2C (Business-to-Consumer) dapat mencakup berbagai aspek, termasuk manajemen produk, data pengguna, otentikasi pengguna, keranjang belanja, pemrosesan pembayaran, dan lainnya.

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

Aplikasi akan berjalan di `http://localhost:3000`. Bisa dirubah sesuai port yang tersedia pada variabel PORT = 3000 file index.js 

# Dokumentasi
## Endpoint API

Berikut adalah beberapa endpoint API yang tersedia:

### **Sistem Login**
| Method | Path | Response |
| --- | --- | --- |
| POST | `/user/register` | User account register. |
| POST | `/user/login` | User account login. |

### **Pengelolaan Produk:**
| Method | Path | Response | Auth |
| --- | --- | --- | --- |
| GET | `/api/products` | Get semua data produk | - |
| GET | `/api/products/:id` | Get produk berdasarkan ID | - |
| POST | `/api/products` | Create produk | admin |
| PUT | `/api/products/:id` | Update produk | admin |
| DELETE | `/api/products/:id` | Delete produk | admin |

### **Pengelolaan Pengguna:**
| Method | Path | Response | Auth |
| --- | --- | --- | --- |
| GET | `/api/admin/users` | Get semua data pengguna | admin |
| GET | `/api/users/:id` | Get pengguna berdasarkan ID | customer |
| GET | `/api/admin/users/:id` | Get pengguna berdasarkan ID | admin |
| POST | `/api/admin/users` | Create pengguna | admin |
| PUT | `/api/users/:id` | Update pengguna | customer |
| PUT | `/api/admin/users/:id` | Update pengguna | admin |
| DELETE | `/api/admin/users/:id` | Delete pengguna | admin |

### **Pengelolaan Pesanan:**
| Method | Path | Response | Auth |
| --- | --- | --- | --- |
| POST | `/api/orders` | Create pesanan | customer |
| POST | `/api/admin/orders` | Create pesanan | admin |
| GET | `/api/orders/:id` | Get pesanan berdasarkan ID pesanan | customer |
| GET | `/api/admin/orders/:id` | Get pesanan berdasarkan ID pesanan | admin |
| GET | `/api/orders/users/:id` | Get pesanan berdasarkan ID pengguna | customer |
| GET | `/api/admin/orders/users/:id` | Get pesanan berdasarkan ID pengguna | admin |
| PUT | `/api/admin/orders/:id` | Update pesanan | admin |
| DELETE | `/api/admin/orders/:id` | Delete pesanan | admin |

### **Pembayaran:**
| Method | Path | Response | Auth |
| --- | --- | --- | --- |
| POST | `/api/payment` | Approve pembayaran | customer |
| POST | `/api/admin/payment` | Approve pembayaran | customer |

### **Pencarian dan Filter:**
under maintenance
  - `GET /search?q=:query`
  - `GET /products/category/:category`

### **Manajemen Keranjang Belanja:**
under maintenance
  - `GET /cart`
  - `POST /cart/add`
  - `PUT /cart/update/:productId`
  - `DELETE /cart/remove/:productId`
