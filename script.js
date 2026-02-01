const bookingForm = document.querySelector("#booking-form");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

// Header scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
  
  lastScroll = currentScroll;
});

const closeNavOnResize = () => {
  if (window.innerWidth > 900 && siteNav.classList.contains("open")) {
    siteNav.classList.remove("open");
  }
};

if (navToggle) {
  navToggle.addEventListener("click", () => {
    siteNav.classList.toggle("open");
    document.body.classList.toggle("nav-open");
  });
}

// Close nav when clicking outside
document.addEventListener("click", (e) => {
  if (siteNav && !siteNav.contains(e.target) && !navToggle.contains(e.target)) {
    if (window.innerWidth <= 900) {
      siteNav.classList.remove("open");
      document.body.classList.remove("nav-open");
    }
  }
});

window.addEventListener("resize", closeNavOnResize);

if (bookingForm) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const payload = Object.fromEntries(formData.entries());

    console.log("Taxi booking submitted:", payload);
    
    // Show success message
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Booking Submitted!";
    submitBtn.style.background = "#059652";
    submitBtn.disabled = true;
    
    setTimeout(() => {
      bookingForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
    }, 3000);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "#!") return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Close mobile nav if open
      if (window.innerWidth <= 900) {
        siteNav.classList.remove("open");
        document.body.classList.remove("nav-open");
      }
    }
  });
});
