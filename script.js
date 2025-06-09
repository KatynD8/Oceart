document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const navMenu = document.getElementById("navMenu");
  const contactBtn = document.getElementById("contactBtn");
  const contactModal = document.getElementById("contactModal");
  const closeModal = document.getElementById("closeModal");
  const filterPortrait = document.getElementById("filterPortrait");
  const filterTattoo = document.getElementById("filterTattoo");
  const galleryItems = document.querySelectorAll(".gallery__item");

  // Navigation menu toggle
  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener("click", () => {
      navMenu.classList.toggle("open");
    });
  }

  // Contact modal toggle
  if (contactBtn && contactModal && closeModal) {
    contactBtn.addEventListener("click", () => {
      contactModal.style.display = "block";
    });

    closeModal.addEventListener("click", () => {
      contactModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        contactModal.style.display = "none";
      }
    });
  }

  // Filtering gallery items
  function updateGalleryVisibility() {
    const showPortrait = filterPortrait?.checked;
    const showTattoo = filterTattoo?.checked;

    galleryItems.forEach((item) => {
      const type = item.dataset.type;
      item.style.display =
        (type === "portrait" && showPortrait) ||
        (type === "tattoo" && showTattoo)
          ? "block"
          : "none";
    });
  }

  if (filterPortrait && filterTattoo) {
    filterPortrait.addEventListener("change", updateGalleryVisibility);
    filterTattoo.addEventListener("change", updateGalleryVisibility);
  }

  updateGalleryVisibility(); // Apply filter on load
});
