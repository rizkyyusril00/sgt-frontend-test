## 📌 Summit Global Teknologi – Frontend Dashboard Technical Test

Proyek ini merupakan hasil pengerjaan technical test untuk posisi **Junior Frontend Dashboard Developer** di PT Summit Global Teknologi. Aplikasi ini dibangun menggunakan **Next.js 14** dan **Ant Design**, dengan tujuan untuk menampilkan serta melakukan pengelolaan data produk melalui API yang telah disediakan.

---

### 🚀 Teknologi yang Digunakan

- **Next.js 14 (App Router)**
- **React**
- **TypeScript**
- **Ant Design**
- Axios
- TailwindCSS

---

### ✅ Fitur Utama

| Fitur                                                   | Status |
| ------------------------------------------------------- | ------ |
| Menampilkan daftar produk (pagination + search)         | ✅     |
| Menambahkan produk baru (POST)                          | ✅     |
| Edit produk (PUT)                                       | ✅     |
| Menampilkan detail produk di modal (GET single product) | ✅     |

### 🧩 Persyaratan Sistem

Pastikan sistem telah memenuhi kebutuhan berikut:

| Software | Versi                         |
| -------- | ----------------------------- |
| Node.js  | **v18 atau v20** (disarankan) |
| npm      | v9+                           |

---

### 📦 Instalasi & Menjalankan Project

#### 1️⃣ Clone repository

\`\`\`bash
git clone https://github.com/rizkyyusril00/sgt-frontend-test.git
cd sgt-frontend-test
\`\`\`

#### 2️⃣ Install dependencies

\`\`\`bash
npm install
\`\`\`

#### 3️⃣ Buat file `.env.local` di root project

\`\`\`
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001
\`\`\`

#### 4️⃣ Jalankan backend (disediakan oleh perusahaan)

Backend harus berjalan terlebih dahulu:

\`\`\`bash
npm install
npm run dev
\`\`\`

Backend akan berjalan di:
\`\`\`
http://localhost:8001
\`\`\`

#### 5️⃣ Jalankan frontend

\`\`\`bash
npm run dev
\`\`\`

Aplikasi dapat diakses melalui:
\`\`\`
http://localhost:3000
\`\`\`

---

### 📂 Struktur Folder Utama

\`\`\`
src/
|─ app/
├─ api/ (Proxy ke backend)
└─ products/ (Dashboard)
\`\`\`

---

### 👨‍💻 Pengembang

**Muhammad Rizky Yusril Arasyhi**  
GitHub: https://github.com/rizkyyusril00

---

Jika diperlukan, saya siap menjelaskan proses pengerjaan secara lebih detail.  
Terima kasih untuk kesempatan yang diberikan 🙏
