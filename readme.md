langkah install

1. git clone
2. siapakan database
3. buat file .env
4. sesuaikan path di .env sesuai di .env.example
5. jalankan : npm install
6. jalankan : npm run generate
7. jalankan (untuk development) : npx prisma migrate dev --name init
8. atau jalankan (untuk production) : npx prisma migrate deploy
9. jalankan : npm run seed
10. jalankan : npm run seed:agama
11. jalankan : npm run seed:negara
12. jalankan : npm run seed:provinsi
13. jalankan : npm run seed:kota
14. jalankan : npm run seed:kecamatan
15. jalankan : npm run seed:kelurahan:batch
16. jalankan (khusus untuk production) : npm run seed:kelurahan
17. jalankan : npm run dev
18. buka : http://localhost:4000/graphql

Todolist

1. Add approval pada penerimaan
2. Add gol ukt pada tabel mahasiswa
3. Add kode prodi regonline
4. Export import excel
5. Mengganti redaksi endpoint dengan prefix model
