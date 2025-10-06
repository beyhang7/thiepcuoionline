document.addEventListener("DOMContentLoaded", () => {
  const confirmForm = document.getElementById("confirmForm");
  const wishForm = document.getElementById("wishForm");
  const params = new URLSearchParams(window.location.search);
  const guest = params.get("guest") || "Khách ẩn danh";

  // Xác nhận tham dự
  confirmForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const attend = document.querySelector("input[name='confirm']:checked").value;

    await fetch("http://localhost:5000/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: guest, attend, message: "" }),
    });

    document.getElementById("confirmMessage").textContent = "✅ Đã gửi xác nhận!";
  });

  // Gửi lời chúc
  wishForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value.trim();

    await fetch("http://localhost:5000/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: guest, attend: "-", message }),
    });

    document.getElementById("wishMessage").textContent = "💖 Lời chúc đã được gửi!";
    wishForm.reset();
  });
});
