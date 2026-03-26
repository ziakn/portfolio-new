'use strict';

/**
 * CONTACT FORM AJAX SUBMISSION
 */
const contactForm = document.getElementById("contact-form");
const formInputs = document.querySelectorAll("[data-form-input]");
const submitBtn = document.querySelector("[data-form-btn]");

if (contactForm && submitBtn) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.setAttribute("disabled", "");
    submitBtn.innerHTML = "<ion-icon name='sync-outline'></ion-icon><span>Sending...</span>";

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Success state UI
      submitBtn.innerHTML = "<ion-icon name='checkmark-circle-outline'></ion-icon><span>Message Sent!</span>";
      submitBtn.classList.add("success");
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.removeAttribute("disabled");
        submitBtn.innerHTML = originalBtnText;
        submitBtn.classList.remove("success");
      }, 5000);
    })
    .catch(error => {
      console.error("Form submission error:", error);
      submitBtn.innerHTML = "<ion-icon name='alert-circle-outline'></ion-icon><span>Error. Try Again</span>";
      submitBtn.removeAttribute("disabled");
      
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
      }, 5000);
    });
  });
}

/**
 * UTILS & UI ELEMENT TOGGLE
 */
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

/**
 * SIDEBAR TOGGLE (MOBILE)
 */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

/**
 * TESTIMONIALS MODAL
 */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  if (modalContainer) modalContainer.classList.toggle("active");
  if (overlay) overlay.classList.toggle("active");
}

if (testimonialsItem.length > 0) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      if (modalImg) {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      }
      if (modalTitle) modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      if (modalText) modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }
}

if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);

/**
 * PORTFOLIO FILTER CUSTOM SELECT
 */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

if (selectItems.length > 0) {
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      if (select) elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

/**
 * PORTFOLIO FILTER FUNCTIONALITY
 */
const filterItems = document.querySelectorAll("[data-filter-item]");
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

/**
 * PORTFOLIO FILTER BUTTONS (LARGE SCREENS)
 */
const filterBtn = document.querySelectorAll("[data-filter-btn]");
let lastClickedBtn = filterBtn.length > 0 ? filterBtn[0] : null;

if (filterBtn.length > 0) {
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      if (lastClickedBtn) lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}