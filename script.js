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

// Sélection des éléments
const mainImage = document.getElementById("mainImage");
const thumbnails = Array.from(
  document.querySelectorAll(".gallery__thumbs img")
);
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Met à jour la mainImage sur clic miniature (déjà en place)
thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    mainImage.src = thumb.src;
  });
});

// Fonction utilitaire pour récupérer les miniatures visibles
function getVisibleThumbnails() {
  return thumbnails.filter((thumb) => thumb.style.display !== "none");
}

// Navigation précédente/suivante
function navigateImage(direction) {
  const visible = getVisibleThumbnails();
  if (!visible.length) return;

  // Trouver l'indice de l'image actuelle
  const currentIndex = visible.findIndex(
    (thumb) => thumb.src === mainImage.src
  );
  let nextIndex;

  if (direction === "prev") {
    nextIndex = currentIndex <= 0 ? visible.length - 1 : currentIndex - 1;
  } else {
    nextIndex = currentIndex === visible.length - 1 ? 0 : currentIndex + 1;
  }

  mainImage.src = visible[nextIndex].src;
}

// Événements sur les flèches
prevBtn.addEventListener("click", () => navigateImage("prev"));
nextBtn.addEventListener("click", () => navigateImage("next"));

// Votre code de filtres existant
function updateThumbnailsVisibility() {
  const showPortrait = filterPortrait?.checked;
  const showTattoo = filterTattoo?.checked;

  thumbnails.forEach((thumb) => {
    const type = thumb.dataset.type;
    thumb.style.display =
      (type === "portrait" && showPortrait) || (type === "tattoo" && showTattoo)
        ? "inline-block"
        : "none";
  });

  // Met à jour l'image principale avec la première miniature visible
  const firstVisible = getVisibleThumbnails()[0];
  if (firstVisible) {
    mainImage.src = firstVisible.src;
  }
}

filterPortrait.addEventListener("change", updateThumbnailsVisibility);
filterTattoo.addEventListener("change", updateThumbnailsVisibility);
updateThumbnailsVisibility();
