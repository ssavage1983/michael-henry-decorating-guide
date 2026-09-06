document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll(".image-card img, img.room-render");
  if (!images.length) return;

  var lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";

  var closeButton = document.createElement("button");
  closeButton.className = "image-lightbox-close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close full-screen image");
  closeButton.textContent = "×";

  var inner = document.createElement("div");
  inner.className = "image-lightbox-inner";

  var bigImage = document.createElement("img");
  bigImage.src = "";
  bigImage.alt = "";

  var caption = document.createElement("div");
  caption.className = "image-lightbox-caption";

  inner.appendChild(bigImage);
  inner.appendChild(caption);
  lightbox.appendChild(closeButton);
  lightbox.appendChild(inner);
  document.body.appendChild(lightbox);

  images.forEach(function (img) {
    img.setAttribute("title", "Click to view full screen");

    var card = img.closest(".image-card");
    if (card && !card.querySelector(".click-hint")) {
      var hint = document.createElement("p");
      hint.className = "click-hint";
      hint.textContent = "Click image to open full screen";
      card.appendChild(hint);
    }
  });

  document.addEventListener("click", function (event) {
    var img = event.target.closest(".image-card img, img.room-render");
    if (!img) return;

    event.preventDefault();
    bigImage.src = img.currentSrc || img.src;
    bigImage.alt = img.alt || "Room image";
    caption.textContent = img.alt || "Room image";
    lightbox.classList.add("is-open");
    document.body.classList.add("lightbox-open");
  });

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.classList.remove("lightbox-open");
    bigImage.src = "";
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
