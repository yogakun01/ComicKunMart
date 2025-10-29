Perfect 👍

Berarti kita lanjut dengan asumsi:

* ✅ Proyek kamu **ComicKunMart** adalah aplikasi mobile daftar belanja
* ✅ Dibuat dengan **Expo React Native**, **Zustand** untuk state management, dan **Expo Router** untuk navigasi
* ✅ Nama tetap: **ComicKunMart**

Berikut versi **README final** yang sudah disesuaikan sepenuhnya dengan proyek kamu 👇

---

````markdown
# 🛍️ ComicKunMart — Aplikasi Daftar Belanja (Expo React Native)

**ComicKunMart** adalah aplikasi mobile sederhana berbasis **Expo React Native** yang memungkinkan pengguna mengelola daftar belanja mereka.  
Aplikasi ini dirancang dengan navigasi berbasis file menggunakan **Expo Router**, manajemen state global dengan **Zustand**, serta tampilan daftar interaktif menggunakan **FlatList**.  

---

## ✨ Fitur Utama

### 🧠 State Management (Zustand)
Aplikasi ini menggunakan **Zustand** untuk mengelola data daftar belanja dengan store global yang berisi:
- **Array items belanja**:
  ```ts
  {
    id: string;
    name: string;
    quantity: number;
    category?: string;
    purchased: boolean;
  }
````

* Fungsi-fungsi utama:

  * `addItem` → Menambah item baru
  * `removeItem` → Menghapus item berdasarkan ID
  * `togglePurchased` → Mengubah status “sudah dibeli / belum”
  * `editItem` → Mengedit item yang sudah ada

> Store disimpan di `store/useStore.ts`.

---

### 🧭 Navigasi (Expo Router)

ComicKunMart menggunakan **file-based routing** dari `expo-router` dengan minimal 3 halaman:

1. **Home/ListScreen (`app/index.tsx`)**
   Menampilkan daftar seluruh item belanja.
2. **AddItemScreen (`app/add.tsx`)**
   Form untuk menambahkan item baru ke daftar.
3. **DetailScreen (`app/[id].tsx`)**
   Menampilkan detail item dan menyediakan opsi edit serta toggle status.

Navigasi diatur menggunakan **Stack Navigation** untuk transisi halaman yang halus.

---

### 🧾 Komponen Daftar (List)

* Menggunakan **FlatList** untuk menampilkan daftar item.
* Memiliki **item separator** dan **empty state** yang informatif (`components/ui/EmptyState.tsx`).
* Setiap item menampilkan:

  * Nama item
  * Jumlah (quantity)
  * Status (✔️ sudah dibeli / ❌ belum dibeli)
* Mendukung **hapus item** melalui tombol Delete.

---

## 🎨 UI & UX

* Desain sederhana dan responsif untuk berbagai ukuran layar.
* Menggunakan komponen dasar React Native seperti:

  * `TextInput`
  * `Button`
  * `Pressable`
  * `Alert`
* Feedback visual saat data berubah (misalnya Toast atau Alert).
* Form validasi agar pengguna tidak bisa menambahkan item kosong.

---

## 💡 Bonus (Opsional)

Beberapa fitur tambahan yang bisa diimplementasikan:

* 🔍 Filter / pencarian item berdasarkan nama atau kategori.
* 💾 Simpan data secara lokal menggunakan **AsyncStorage**.
* 🎞️ Animasi saat menambah atau menghapus item.
* 🌙 Dark Mode Support menggunakan `Appearance` atau `useColorScheme()`.

---

## 🧱 Struktur Direktori Proyek

```
ComicKunMart/
├─ app/
│  ├─ _layout.tsx         # Root layout (navigasi utama)
│  ├─ index.tsx           # Halaman daftar belanja (Home)
│  ├─ add.tsx             # Halaman tambah item
│  └─ [id].tsx            # Halaman detail item
│
├─ components/
│  ├─ ui/
│  │  ├─ Header.tsx       # Header utama aplikasi
│  │  ├─ ShoppingItem.tsx # Komponen item belanja
│  │  └─ EmptyState.tsx   # Tampilan jika daftar kosong
│
├─ store/
│  └─ useStore.ts         # Store Zustand
│
├─ assets/                # Gambar, ikon, ilustrasi
└─ package.json
```

---

## ⚙️ Cara Menjalankan Proyek

### 1️⃣ Clone Repositori

```bash
git clone https://github.com/yogakun01/ComicKunMart.git
cd ComicKunMart
```

### 2️⃣ Install Dependensi

```bash
npm install
# atau
yarn install
```

### 3️⃣ Jalankan Aplikasi

```bash
npx expo start
```

Lalu buka di emulator atau scan QR code dengan aplikasi **Expo Go**.

---

## 🧩 Teknologi yang Digunakan

| Kebutuhan                    | Teknologi                 |
| ---------------------------- | ------------------------- |
| Framework                    | Expo (React Native)       |
| Navigasi                     | Expo Router               |
| State Management             | Zustand                   |
| UI Komponen                  | React Native Components   |
| Penyimpanan Lokal (opsional) | AsyncStorage              |
| Animasi (opsional)           | Reanimated / Animated API |

---

## 👨‍💻 Pengembang

* **I Made Sedana Yoga** — Pengembang Aplikasi

  > Primakara University
  > Proyek tugas: Aplikasi Mobile Daftar Belanja

---

## 🪪 Lisensi

Proyek ini dibuat untuk tujuan pembelajaran dan dapat digunakan secara bebas.
Lisensi: **MIT License**

---

> “Belanja jadi lebih teratur, hemat waktu, dan seru — dengan ComicKunMart!” 🛍️

---

```

---

Apakah kamu mau saya bantu buatkan juga **file `useStore.ts` lengkap** (zustand store dengan fungsi add, remove, toggle, edit) agar bisa langsung dipakai di proyek ComicKunMart?
```
