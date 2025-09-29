document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmBtn");
  const guestText = document.getElementById("guestText");
  const closeBtn = document.getElementById("closeBtn");

  // === Chức năng 1: Tạo link mời từ form ===
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      const name = document.getElementById("guestName").value.trim();
      const relation = document.querySelector('input[name="relation"]:checked');
      const partner = document.querySelector('input[name="partner"]:checked');

      if (!name || !relation) {
        alert("Vui lòng nhập tên và chọn mối quan hệ!");
        return;
      }

      const relationVal = relation.value;
      const partnerVal = partner ? partner.value : "";

      // Mã hóa dữ liệu đưa vào URL
      const url = `../index.html?name=${encodeURIComponent(name)}&relation=${encodeURIComponent(relationVal)}&partner=${encodeURIComponent(partnerVal)}`;

      // Hiển thị link mời cho người dùng copy
      const linkBox = document.createElement("div");
      linkBox.className = "link-box";
      linkBox.innerHTML = `
        <p>Link mời khách của bạn:</p>
        <a href="${url}" target="_blank">${url}</a>
      `;

      document.body.appendChild(linkBox);
    });
  }

  // === Chức năng 2: Hiển thị khách mời trong thiệp (index.html) ===
  if (guestText) {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "Khách mời";
    const relation = params.get("relation") || "";
    const partner = params.get("partner") || "";

    // Ghép nội dung hiển thị
    let displayText = relation + " "+ name + " " + partner;

    guestText.textContent = displayText;
  }

  // === Nút đóng thiệp ===
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.querySelector(".invite-section").style.display = "none";
    });
  }
});