document.addEventListener("DOMContentLoaded", function () {
const clickableImages = document.querySelectorAll(".image-card img, img.room-render");
if (!clickableImages.length) return;
const lightbox = document.createElement("div");
lightbox.className = "image-lightbox";
lightbox.innerHTML =     <button class="image-lightbox-close" type="button" aria-label="Close full-screen image">×</button>     <div class="image-lightbox-inner">       <img src="" alt="">       <div class="image-lightbox-caption"></div>     </div>  ;
document.body.appendChild(lightbox);
const lightboxImg = lightbox.querySelector("img");
const caption = lightbox.querySelector(".image-lightbox-caption");
const closeButton = lightbox.querySelector(".image-lightbox-close");
clickableImages.forEach(function (img) {
img.setAttribute("title", "Click to view full screen");
img.addEventListener("click", function () {
lightboxImg.src = img.currentSrc || img.src;
lightboxImg.alt = img.alt || "Room image";
caption.textContent = img.alt || "Room image";
lightbox.classList.add("is-open");
document.body.style.overflow = "hidden";
});
const imageCard = img.closest(".image-card");
if (imageCard && !imageCard.querySelector(".click-hint")) {
  const hint = document.createElement("p");
  hint.className = "click-hint";
  hint.textContent = "Click image to open full screen";
  imageCard.appendChild(hint);
}

});
function closeLightbox() {
lightbox.classList.remove("is-open");
lightboxImg.src = "";
document.body.style.overflow = "";
}
closeButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", function (event) {
if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", function (event) {
if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
closeLightbox();
}
});
});
