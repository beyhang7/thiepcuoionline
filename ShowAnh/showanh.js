// Slideshow 1
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');
const thumbs = document.querySelectorAll('.thumb');
let currentSlide = 0;
let autoPlay;

function showSlide(idx) {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  thumbs.forEach((t, i) => t.classList.toggle('active-thumb', i === idx));
  currentSlide = idx;
}

// Chuyển slide
if (prevBtn && nextBtn && slides.length > 0) {
  prevBtn.onclick = () => {
    const idx = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(idx);
  };

  nextBtn.onclick = () => {
    const idx = (currentSlide + 1) % slides.length;
    showSlide(idx);
  };

  // Tự động chạy slideshow
  function startAutoPlay() {
    autoPlay = setInterval(() => {
      const idx = (currentSlide + 1) % slides.length;
      showSlide(idx);
    }, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlay);
  }

  // Dừng khi hover
  slides.forEach(slide => {
    slide.addEventListener('mouseenter', stopAutoPlay);
    slide.addEventListener('mouseleave', startAutoPlay);
  });

  startAutoPlay();
}

// Click chọn thumbnail
thumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => {
    showSlide(index);
  });
});


// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");

// Bắt tất cả ảnh có class "clickable"
const clickableImgs = document.querySelectorAll(".clickable");

clickableImgs.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
  });
});

// Đóng lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Đóng khi click ra ngoài ảnh
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
