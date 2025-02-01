document.addEventListener("DOMContentLoaded", function () {
    "use strict";
  
    // مخفی کردن اسپینر بعد از لود
    const spinner = document.getElementById("spinner");
    if (spinner) {
      setTimeout(() => {
        spinner.classList.remove("show");
      }, 1);
    }
  
    // WOW.js انیمیشن اسکرول
    const sections = document.querySelectorAll(".hidden-section");
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible-section");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
  
    sections.forEach((section) => observer.observe(section));
  
    // شمارش اعداد
    const counters = document.querySelectorAll("[data-toggle='counter-up']");
    counters.forEach((counter) => {
      let start = 0;
      const end = parseInt(counter.textContent, 10);
      const duration = 2000;
      const increment = end / (duration / 10);
  
      const updateCounter = () => {
        start += increment;
        if (start < end) {
          counter.textContent = Math.floor(start);
          setTimeout(updateCounter, 10);
        } else {
          counter.textContent = end;
        }
      };
  
      updateCounter();
    });
  
    // تایپ متن
    const typedElement = document.querySelector(".typed-text-output");
    if (typedElement) {
      const typedStrings = document
        .querySelector(".typed-text")
        .textContent.split(", ");
      let i = 0;
      let j = 0;
      let isDeleting = false;
  
      const type = () => {
        if (!isDeleting && j < typedStrings[i].length) {
          typedElement.textContent += typedStrings[i][j];
          j++;
          setTimeout(type, 100);
        } else if (isDeleting && j > 0) {
          typedElement.textContent = typedStrings[i].substring(0, j - 1);
          j--;
          setTimeout(type, 50);
        } else {
          isDeleting = !isDeleting;
          if (!isDeleting) i = (i + 1) % typedStrings.length;
          setTimeout(type, 1000);
        }
      };
  
      type();
    }
  
    // اسکرول نرم
    const scrollLinks = document.querySelectorAll(".btn-scroll");
    scrollLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth",
          });
        }
      });
    });
  
    // انیمیشن نوار پیشرفت
    const skillsSection = document.querySelectorAll(".skill");
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll(".progress-bar");
            bars.forEach((bar) => {
              bar.style.width = bar.getAttribute("aria-valuenow") + "%";
            });
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.8 }
    );
    skillsSection.forEach((skill) => skillObserver.observe(skill));
  
    // فیلتر کردن پروژه‌ها
    const portfolioContainer = document.querySelector(".portfolio-container");
    const portfolioItems = portfolioContainer
      ? portfolioContainer.querySelectorAll(".portfolio-item")
      : [];
    const filters = document.querySelectorAll("#portfolio-flters li");
    if (portfolioContainer && filters.length > 0) {
      filters.forEach((filter) => {
        filter.addEventListener("click", function () {
          filters.forEach((f) => f.classList.remove("active"));
          this.classList.add("active");
          const filterValue = this.getAttribute("data-filter");
  
          portfolioItems.forEach((item) => {
            if (item.classList.contains(filterValue) || filterValue === "*") {
              item.style.display = "block";
            } else {
              item.style.display = "none";
            }
          });
        });
      });
    }
  
    // اسلایدر ساده
    const testimonials = document.querySelector(".testimonial-carousel");
    if (testimonials) {
      let index = 0;
      const slides = testimonials.children;
      const total = slides.length;
  
      setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % total;
        slides[index].classList.add("active");
      }, 3000);
    }
  
    // دکمه بازگشت به بالا
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          backToTop.style.display = "block";
        } else {
          backToTop.style.display = "none";
        }
      });
  
      backToTop.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
  
  // مدیریت اسپینر
  window.addEventListener("load", function () {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
    document.body.style.visibility = "visible";
});
  
function copyToClipboard(text, message) {
  // استفاده از Clipboard API برای کپی کردن به کلیپ‌بورد
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // ایجاد پیام کپی
      const alertBox = document.createElement("div");
      alertBox.textContent = message;
      alertBox.classList.add("copy-alert"); // اضافه کردن کلاس CSS برای استایل

      document.body.appendChild(alertBox);

      // حذف پیام پس از 2 ثانیه
      setTimeout(() => {
        document.body.removeChild(alertBox);
      }, 2000);
    })
    .catch((err) => {
      console.error("کپی به کلیپ‌بورد با خطا مواجه شد:", err);
    });
}

window.addEventListener("load", function () {
  // مخفی کردن اسپینر
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";

  // نمایش محتوای سایت
  document.body.style.visibility = "visible";
});
