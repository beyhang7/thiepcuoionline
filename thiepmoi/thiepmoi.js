document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("guestName") || "";
  const relation = params.get("relation") || "";
  const partner = params.get("partner") || "";

  if (guestName) {
    document.getElementById("guestText").textContent =
      `${relation} ${guestName}${partner}`;
  }

  const openBtn = document.getElementById("openBtn");
  const closeBtn = document.getElementById("closeBtn");
  const inviteSection = document.querySelector(".invite-section");

  // Ban đầu ẩn hẳn
  inviteSection.style.display = "none";

  // Hiện thiệp
  openBtn.addEventListener("click", () => {
    inviteSection.style.display = "flex"; // bật lại
    // dùng setTimeout để CSS transition kịp áp dụng
    setTimeout(() => inviteSection.classList.add("active"), 20);
  });

  // Đóng thiệp
  closeBtn.addEventListener("click", () => {
    inviteSection.classList.remove("active");
    // đợi transition kết thúc rồi ẩn hẳn
    setTimeout(() => {
      if (!inviteSection.classList.contains("active")) {
        inviteSection.style.display = "none";
      }
    }, 500); // khớp với thời gian transition trong CSS
  });
});
