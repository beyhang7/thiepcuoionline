document.addEventListener("DOMContentLoaded", () => {
  const albumGrid = document.getElementById("albumGrid");
  const totalImages = 30;
  let i = 1;

  while (i <= totalImages) {
    /* --- 2 ảnh nhỏ --- */
    for (let j = 0; j < 3 && i <= totalImages; j++) {
      const img = createImg(i, "small");
      albumGrid.appendChild(img);
      i++;
    }

    /* --- 1 ảnh to --- */
    if (i <= totalImages) {
      const img = createImg(i, "big");
      albumGrid.appendChild(img);
      i++;
    }
    

    /* --- 3 ảnh --- */
    for (let j = 0; j < 3 && i <= totalImages; j++) {
      const img = createImg(i, "grid2");
      albumGrid.appendChild(img);
      i++;
    }

    /* --- 2 ảnh  --- */
    for (let j = 0; j < 2 && i <= totalImages; j++) {
      const img = createImg(i, "grid3");
      albumGrid.appendChild(img);
      i++;
    }
  }

  // ========== Hàm tạo ảnh ==========
  function createImg(index, type) {
    const img = document.createElement("img");
    img.src = `img/${index}.jpg`;
    img.alt = "Ảnh cưới " + index;
    img.classList.add(type);
    addLightboxEvent(img);
    return img;
  }

  // ========== Lightbox ==========
  const photoLightbox = document.getElementById("photoLightbox");
  const closeBtn = document.querySelector(".photo-lightbox .close");
  const photoLightboxImg = document.getElementById("photoLightboxImg");

  function addLightboxEvent(img) {
    img.addEventListener("click", () => {
      photoLightboxImg.src = img.src;
      photoLightbox.style.display = "flex";
    });
  }

  function closeLightbox() {
    photoLightbox.style.display = "none";
    photoLightboxImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);

  // Click nền thoát
  photoLightbox.addEventListener("click", e => {
    if (e.target === photoLightbox) closeLightbox();
  });

  // Mobile → Vuốt để thoát
  let touchStartX = 0, touchStartY = 0;
  photoLightbox.addEventListener("touchstart", e => {
    const touch = e.touches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  });
  photoLightbox.addEventListener("touchend", e => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;
    if (Math.abs(dx) > 50 || Math.abs(dy) > 50) {
      closeLightbox();
    }
  });

  // PC → Click ảnh để thoát
  photoLightboxImg.addEventListener("click", closeLightbox);

  // ========== Scroll effect ==========
  const images = document.querySelectorAll('.album-grid img');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('show')) {
        const index = Array.from(images).indexOf(entry.target);
        entry.target.classList.add(index % 2 === 0 ? 'effect-slide-left' : 'effect-slide-right');
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  images.forEach(img => observer.observe(img));
});


