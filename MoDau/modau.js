// Curtain mở màn
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("curtain-left").style.transform = "translateX(-100%)";
    document.getElementById("curtain-right").style.transform = "translateX(100%)";
    document.querySelector(".invitation-text").style.opacity = "0";
    setTimeout(() => {
      document.querySelector(".curtain-container").style.display = "none";
    }, 2000);
  }, 1500);
});



// Lấy phần tử
const brideInput = document.getElementById('bride-name');
const groomInput = document.getElementById('groom-name');
const submitBtn = document.getElementById('submit-names');

submitBtn.addEventListener('click', () => {
  const brideName = brideInput.value.trim() || "Thu Hằng";
  const groomName = groomInput.value.trim() || "Bey Bey";

  // Cập nhật tên trong logo-diagonal
  document.querySelector('.logo-diagonal .line1').textContent = groomName;
  document.querySelector('.logo-diagonal .line3').textContent = brideName;

  // Ẩn form sau khi nhập
  document.querySelector('.name-input-section').style.display = 'none';
});
