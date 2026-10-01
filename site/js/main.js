/* ==========================================================================
   Saved Makoti — Shared UI behaviour
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---- Mobile nav ---- */
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  const mobileClose = document.querySelector(".mobile-nav-close");
  if(burger && mobileNav){
    burger.addEventListener("click", () => mobileNav.classList.add("open"));
  }
  if(mobileClose && mobileNav){
    mobileClose.addEventListener("click", () => mobileNav.classList.remove("open"));
  }
  document.querySelectorAll(".mobile-nav a").forEach(a=>{
    a.addEventListener("click", () => mobileNav.classList.remove("open"));
  });

  /* ---- Accordion (product page / FAQ) ---- */
  document.querySelectorAll(".accordion-head").forEach(btn => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".accordion-item");
      const body = item.querySelector(".accordion-body");
      const isOpen = item.classList.contains("open");
      item.closest(".accordion, .faq-wrap")?.querySelectorAll(".accordion-item.open").forEach(openItem=>{
        if(openItem !== item){
          openItem.classList.remove("open");
          openItem.querySelector(".accordion-body").style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove("open");
        body.style.maxHeight = null;
      }else{
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });
  });

  /* ---- Newsletter / contact form fake-submit ---- */
  document.querySelectorAll("form[data-fake-submit]").forEach(form=>{
    form.addEventListener("submit", (e)=>{
      e.preventDefault();
      const btn = form.querySelector("button[type=submit]");
      const original = btn ? btn.textContent : "";
      if(btn){ btn.textContent = "Thank you!"; btn.disabled = true; }
      showToast(form.dataset.fakeSubmit || "Thanks — we'll be in touch soon.");
      setTimeout(()=>{
        form.reset();
        if(btn){ btn.textContent = original; btn.disabled = false; }
      }, 2200);
    });
  });

  /* ---- Filter pills (shop page) toggle "open" sidebar on mobile ---- */
  const filterToggle = document.querySelector("[data-filter-toggle]");
  const sidebar = document.querySelector(".shop-sidebar");
  if(filterToggle && sidebar){
    filterToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
  }

  updateCartCount();
});
