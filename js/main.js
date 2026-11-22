// فتح وقفل قائمة الموبايل
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', isOpen);
});

// ===== أنيميشن الظهور عند النزول في الصفحة =====
// العناصر اللي هتظهر بحركة بسيطة (ضيف أي كلاس هنا لو عاوز)
const revealItems = document.querySelectorAll(
  '.hero > *, .stats, .services-title, .card, .clients h2, .client-list li, ' +
  '.about-text, .about-numbers, .iso-section h2, .iso-card, .cta-band, .footer-grid > div'
);

// تأخير بسيط بين العناصر اللي جنب بعض (بحد أقصى)
revealItems.forEach((el) => {
  el.classList.add('reveal');
  const index = [...el.parentElement.children].indexOf(el);
  el.style.transitionDelay = Math.min(index, 5) * 80 + 'ms';
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // تظهر مرة واحدة بس
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((el) => observer.observe(el));
} else {
  // متصفح قديم: اظهر كل حاجة من غير حركة
  revealItems.forEach((el) => el.classList.add('show'));
}