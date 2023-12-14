# Back-end e-commerce sederhana menggunakan Node.js, Prisma, Express, dan PostgreSQL.

Studi kasus aplikasi e-commerce B2C (Business-to-Consumer) dapat mencakup berbagai aspek, termasuk manajemen produk, data pengguna, otentikasi pengguna, keranjang belanja, pemrosesan pembayaran, dan lainnya.<br>

> **Objektif** <br>
> Mencapai integrasi penuh dan keseluruhan antara aplikasi end-user, Admin Panel, pembangunan API, dan konsumsi API.

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

> [!NOTE]
>
> - Jika autentikasi diperlukan, sertakan header: { 'access-token': 'YOUR_ACCESS_TOKEN' }.

<hr>
<hr>
<hr>
<hr>

#### **Contoh request**

```javascript
// Simpan access token ke dalam local storage setelah login
const accessToken = "YOUR_ACCESS_TOKEN"; // Gantilah dengan access token yang valid
localStorage.setItem("access-token", accessToken);

// Lakukan permintaan API menggunakan access token dari local storage
const apiUrl = "http://example.com/api/products/123";

// Ambil access token dari local storage
const storedAccessToken = localStorage.getItem("access-token");

// Cek apakah access token tersedia sebelum melakukan permintaan
if (storedAccessToken) {
  // Lakukan permintaan API dengan menyertakan access token
  fetch(apiUrl, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "access-token": storedAccessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Delete successful:", data);
    })
    .catch((error) => {
      console.error("Error deleting:", error.message);
    });
} else {
  console.error("Access token not available. User may not be logged in.");
}
```

#### **Response**

```javascript
{
  status: 'success',
  message: 'Successfully deleted',
  data: {
    "name": "Modern college eyeglass",
    "price": 65000,
    "description": "This is blablabla..."
  }
}
```

<hr>
<hr>
<hr>
<hr>

### **Sistem Login**

| Method | Path             | Request                 | Response               |
| ------ | ---------------- | ----------------------- | ---------------------- |
| POST   | `/user/register` | { `email`, `password` } | User account register. |
| POST   | `/user/login`    | { `email`, `password` } | User account login.    |

### **Pengelolaan Produk:**

| Method | Path                | Request                               | Response                  | Auth  |
| ------ | ------------------- | ------------------------------------- | ------------------------- | ----- |
| GET    | `/api/products`     | -                                     | Get semua data produk     | -     |
| GET    | `/api/products/:id` | -                                     | Get produk berdasarkan ID | -     |
| POST   | `/api/products`     | { `name`, `price`, `description` }    | Create produk             | admin |
| PUT    | `/api/products/:id` | { `name?`, `price?`, `description?` } | Update produk             | admin |
| DELETE | `/api/products/:id` | -                                     | Delete produk             | admin |

### **Pengelolaan Pengguna:**

| Method | Path                   | Request                   | Response                    | Auth     |
| ------ | ---------------------- | ------------------------- | --------------------------- | -------- |
| GET    | `/api/admin/users`     | -                         | Get semua data pengguna     | admin    |
| GET    | `/api/users/:id`       | -                         | Get pengguna berdasarkan ID | customer |
| GET    | `/api/admin/users/:id` | -                         | Get pengguna berdasarkan ID | admin    |
| POST   | `/api/admin/users`     | { `email`, `password` }   | Create pengguna             | admin    |
| PUT    | `/api/users/:id`       | { `email?`, `password?` } | Update pengguna             | customer |
| PUT    | `/api/admin/users/:id` | { `email?`, `password?` } | Update pengguna             | admin    |
| DELETE | `/api/admin/users/:id` | -                         | Delete pengguna             | admin    |

### **Pengelolaan Pesanan:**

| Method | Path                          | Request                                                  | Response                            | Auth     |
| ------ | ----------------------------- | -------------------------------------------------------- | ----------------------------------- | -------- |
| POST   | `/api/orders`                 | { `orderItems`: [{ `quantity`, `price`, `productId` }] } | Create pesanan                      | customer |
| POST   | `/api/admin/orders`           | { `orderItems`: [{ `quantity`, `price`, `productId` }] } | Create pesanan                      | admin    |
| GET    | `/api/orders/:id`             | -                                                        | Get pesanan berdasarkan ID pesanan  | customer |
| GET    | `/api/admin/orders/:id`       | -                                                        | Get pesanan berdasarkan ID pesanan  | admin    |
| GET    | `/api/orders/users/:id`       | -                                                        | Get pesanan berdasarkan ID pengguna | customer |
| GET    | `/api/admin/orders/users/:id` | -                                                        | Get pesanan berdasarkan ID pengguna | admin    |
| PUT    | `/api/admin/orders/:id`       | { `status` }                                             | Update pesanan                      | admin    |
| DELETE | `/api/admin/orders/:id`       | -                                                        | Delete pesanan                      | admin    |

### **Pembayaran:**

| Method | Path                 | Request                                  | Response           | Auth     |
| ------ | -------------------- | ---------------------------------------- | ------------------ | -------- |
| POST   | `/api/payment`       | { `orderId`, `amount`, `paymentMethod` } | Approve pembayaran | customer |
| POST   | `/api/admin/payment` | { `orderId`, `amount`, `paymentMethod` } | Approve pembayaran | admin    |

### **Pencarian dan Filter:**

| Method | Path                               | Request | Response               | Auth |
| ------ | ---------------------------------- | ------- | ---------------------- | ---- |
| GET    | `/api/products/search?q=:query`    | -       | Search produk          | -    |
| GET    | `/api/products/category/:category` | -       | Search kategori produk | -    |

### **Manajemen Keranjang Belanja:**

| Method | Path                          | Request                     | Response                           | Auth     |
| ------ | ----------------------------- | --------------------------- | ---------------------------------- | -------- |
| GET    | `/api/cart`                   | -                           | Get semua keranjang belanja        | costumer |
| POST   | `/api/cart/add`               | { `productId`, `quantity` } | Insert produk ke keranjang belanja | costumer |
| PUT    | `/api/cart/update/:productId` | { `quantity` }              | Update produk di keranjang belanja | costumer |
| DELETE | `/api/cart/remove/:productId` | -                           | Delete produk di keranjang belanja | costumer |
