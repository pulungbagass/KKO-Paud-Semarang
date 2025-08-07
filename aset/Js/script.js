document.addEventListener("DOMContentLoaded", () => {
  // 🔗 Element Referensi
  const hamburgerBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileMenu");
  const desktopLinks = document.querySelectorAll(".menu-item");
  const mobileLinks = document.querySelectorAll(".mobile-link");
  const sections = document.querySelectorAll("main section");

  const lineTop = document.getElementById("line1");
  const lineMiddle = document.getElementById("line2");
  const lineBottom = document.getElementById("line3");

  const carousel = document.querySelector("[data-carousel='static']");
  const items = carousel.querySelectorAll("[data-carousel-item]");
  const prevBtn = carousel.querySelector("[data-carousel-prev]");
  const nextBtn = carousel.querySelector("[data-carousel-next]");
  let currentIndex = 0;

  // 🍔 Toggle Mobile Menu + Hamburger Animasi
  hamburgerBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
    lineTop.classList.toggle("rotate-45");
    lineTop.classList.toggle("translate-y-3");
    lineMiddle.classList.toggle("opacity-0");
    lineBottom.classList.toggle("-rotate-45");
    lineBottom.classList.toggle("-translate-y-3");
  });

  // 📱 Klik menu mobile
  mobileLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      activateSection(target);

      mobileNav.classList.add("hidden");
      lineTop.classList.remove("rotate-45", "translate-y-3");
      lineMiddle.classList.remove("opacity-0");
      lineBottom.classList.remove("-rotate-45", "-translate-y-3");

      updateActiveLink(mobileLinks, link);
      updateActiveLink(desktopLinks, null);
    });
  });

  // 🧼 Klik di luar menu menutup nav
  document.addEventListener("click", (e) => {
    const isClickInside = mobileNav.contains(e.target);
    const isHamburger = hamburgerBtn.contains(e.target);
    if (!isClickInside && !isHamburger) {
      mobileNav.classList.add("hidden");
      lineTop.classList.remove("rotate-45", "translate-y-3");
      lineMiddle.classList.remove("opacity-0");
      lineBottom.classList.remove("-rotate-45", "-translate-y-3");
    }
  });

  // 🖥️ Klik menu desktop
  desktopLinks.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const target = item.getAttribute("data-target");
      activateSection(target);

      updateActiveLink(desktopLinks, item);
      updateActiveLink(mobileLinks, null);
    });
  });

  // ✨ Scroll halus anchor
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute("href"));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 🧩 Fungsi: Tampilkan section aktif
  function activateSection(targetId) {
    sections.forEach((sec) => {
      sec.classList.toggle("hidden", sec.id !== targetId);
    });
  }

  // 📖 Fungsi: Toggle Read More
  window.toggleText = function () {
    const moreText = document.getElementById("moreText");
    const button = event.target;
    if (moreText.classList.contains("hidden")) {
      moreText.classList.remove("hidden");
      button.textContent = "Read less...";
    } else {
      moreText.classList.add("hidden");
      button.textContent = "Read more...";
    }
  };

  // 🎨 Fungsi: Update menu aktif
  function updateActiveLink(links, activeItem) {
    links.forEach((el) =>
      el.classList.remove(
        "border-b-2",
        "border-yellow-700",
        "text-yellow-700",
        "pb-1",
        "active"
      )
    );
    if (activeItem) {
      activeItem.classList.add(
        "border-b-2",
        "border-yellow-700",
        "text-yellow-700",
        "pb-1",
        "active"
      );
    }
  }

  // 🏠 Default tampilkan Home
  activateSection("home");

  // 🎞️ Fungsi: Tampilkan slide
  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.add("hidden");
      item.removeAttribute("data-carousel-item");
      if (i === index) {
        item.classList.remove("hidden");
        item.setAttribute("data-carousel-item", "active");
      } else {
        item.setAttribute("data-carousel-item", "");
      }
    });
  }

  

  // ▶️ Next Slide
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  });

  // ◀️ Previous Slide
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(currentIndex);
  });

  // ⏱️ Auto-slide setiap 2 detik
  setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    showSlide(currentIndex);
  }, 2000);

  // 🚀 Inisialisasi pertama
  showSlide(currentIndex);
});
