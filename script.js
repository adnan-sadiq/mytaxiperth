const bookingForm = document.querySelector("#booking-form");
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

const padTime = (value) => String(value).padStart(2, "0");

const setDefaultBookingDateTime = () => {
  if (!bookingForm) return;

  const dateInput = bookingForm.querySelector('input[name="date"]');
  const timeInput = bookingForm.querySelector('input[name="time"]');

  if (!dateInput || !timeInput) return;

  const now = new Date();
  const inThirty = new Date(now.getTime() + 30 * 60 * 1000);

  const year = inThirty.getFullYear();
  const month = padTime(inThirty.getMonth() + 1);
  const day = padTime(inThirty.getDate());

  const hours = padTime(inThirty.getHours());
  const minutes = padTime(inThirty.getMinutes());

  dateInput.value = `${year}-${month}-${day}`;
  timeInput.value = `${hours}:${minutes}`;
};

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
  setDefaultBookingDateTime();

  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    const successMessage = bookingForm.querySelector(".form-success");

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch(bookingForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Submission failed");
        }
        bookingForm.reset();
        if (successMessage) {
          successMessage.classList.add("show");
        }
        submitBtn.textContent = "Submitted";
        submitBtn.style.background = "#059652";
      })
      .catch(() => {
        submitBtn.textContent = "Try Again";
      })
      .finally(() => {
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
          if (successMessage) {
            successMessage.classList.remove("show");
          }

        setDefaultBookingDateTime();
        }, 5000);
      });
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
