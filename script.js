const bookingForm = document.querySelector("#booking-form");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

const closeNavOnResize = () => {
  if (window.innerWidth > 900 && siteNav.classList.contains("open")) {
    siteNav.classList.remove("open");
  }
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
  });
}

window.addEventListener("resize", closeNavOnResize);

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const payload = Object.fromEntries(formData.entries());

    console.log("Taxi booking submitted:", payload);
    bookingForm.reset();
  });
}
