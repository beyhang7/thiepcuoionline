const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");
const ExcelJS = require("exceljs");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ====== Kết nối database ======
const db = new sqlite3.Database("database.sqlite3", (err) => {
  if (err) console.error("❌ Lỗi mở database:", err);
  else console.log("✅ Đã kết nối database SQLite");
});

// Tạo bảng nếu chưa có
db.run(`
  CREATE TABLE IF NOT EXISTS rsvp (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    attend TEXT,
    message TEXT
  )
`);

// ====== API 1: Lưu hoặc cập nhật xác nhận ======
app.post("/api/rsvp", (req, res) => {
  const { name, attend = "-", message = "" } = req.body;
  if (!name) return res.status(400).json({ error: "Thiếu tên khách" });

  // 🔍 Kiểm tra nếu tên đã tồn tại
  const checkQuery = `SELECT id, attend, message FROM rsvp WHERE name = ?`;
  db.get(checkQuery, [name], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });

    if (row) {
      // 🔄 Nếu tồn tại → cập nhật lại thông tin
      const newAttend = attend !== "-" ? attend : row.attend;
      const newMessage = message !== "" ? message : row.message;

      const updateQuery = `
        UPDATE rsvp
        SET attend = ?, message = ?
        WHERE name = ?
      `;
      db.run(updateQuery, [newAttend, newMessage, name], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: "✅ Đã cập nhật thông tin" });
      });
    } else {
      // ➕ Nếu chưa tồn tại → thêm mới
      const insertQuery = `
        INSERT INTO rsvp (name, attend, message)
        VALUES (?, ?, ?)
      `;
      db.run(insertQuery, [name, attend, message], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, id: this.lastID, message: "🎉 Đã lưu thành công" });
      });
    }
  });
});

// ====== API 2: Lấy danh sách ======
app.get("/api/rsvp", (req, res) => {
  db.all("SELECT * FROM rsvp ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// ====== API 3: Xuất Excel ======
app.get("/api/export", async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("RSVP List");

  sheet.columns = [
    { header: "ID", key: "id" },
    { header: "Tên", key: "name" },
    { header: "Tham dự", key: "attend" },
    { header: "Lời chúc", key: "message" },
  ];

  db.all("SELECT * FROM rsvp", [], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    rows.forEach((row) => sheet.addRow(row));

    const filePath = path.join(__dirname, "RSVP_List.xlsx");
    await workbook.xlsx.writeFile(filePath);
    res.download(filePath);
  });
});

// ====== Khởi chạy server ======
app.listen(PORT, () => console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`));
