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
  '.about-text, .about-numbers, .iso-section h2, .iso-card, .cta-band, .footer-grid > div, ' +
  '.svc-card, .method h2, .step, .project-card, .certs h2, .cert-badge'
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
        // بعد ما الحركة تخلص نشيل التأخير، عشان الـ hover ميتأخرش
        setTimeout(() => { entry.target.style.transitionDelay = '0ms'; }, 1200);
        observer.unobserve(entry.target); // تظهر مرة واحدة بس
      }
    });
  }, { threshold: 0.15 });
  revealItems.forEach((el) => observer.observe(el));
} else {
  // متصفح قديم: اظهر كل حاجة من غير حركة
  revealItems.forEach((el) => el.classList.add('show'));
}


// ===== تصفية المشاريع (صفحة سابقة أعمالنا) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const type = btn.dataset.filter;

    // تلوين الزر المختار
    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    // إظهار المشاريع المطابقة وإخفاء الباقي
    projectCards.forEach((card) => {
      const match = type === 'all' || card.dataset.cat === type;
      card.classList.toggle('is-hidden', !match);
      if (match) card.classList.add('show'); // نتأكد إنها ظاهرة بعد الفلترة
    });
  });
});

// ===== تفعيل صفحة اتصل بنا ونموذج عرض السعر =====
const quoteForm = document.getElementById('quoteForm');
const serviceSelect = document.getElementById('serviceType');
const sendEmailBtn = document.getElementById('sendEmailBtn');

// تحديد الخدمة تلقائياً إذا جاء الزائر من رابط مثل contact.html?service=insulation
if (serviceSelect) {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const matchedOption = serviceSelect.querySelector(`option[data-key="${serviceParam}"]`);
    if (matchedOption) {
      serviceSelect.value = matchedOption.value;
    }
  }
}

// دالة تجميع وتنسيق بيانات النموذج
function buildQuoteMessage() {
  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  const email = document.getElementById('clientEmail').value.trim();
  const service = serviceSelect.value;
  const location = document.getElementById('projectLocation').value.trim();
  const details = document.getElementById('projectDetails').value.trim();

  let msg = `السلام عليكم شركة السماك للمقاولات، أرغب في طلب عرض سعر:\n\n`;
  msg += `• الاسم / الشركة: ${name}\n`;
  msg += `• رقم الهاتف: ${phone}\n`;
  if (email) msg += `• البريد الإلكتروني: ${email}\n`;
  msg += `• الخدمة المطلوبة: ${service}\n`;
  if (location) msg += `• موقع المشروع: ${location}\n`;
  if (details) msg += `• تفاصيل المشروع: ${details}\n`;

  return msg;
}

// الإرسال عبر واتساب
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = encodeURIComponent(buildQuoteMessage());
    window.open(`https://wa.me/201550100605?text=${message}`, '_blank', 'noopener');
  });
}

// الإرسال عبر البريد الإلكتروني
if (sendEmailBtn && quoteForm) {
  sendEmailBtn.addEventListener('click', () => {
    if (!quoteForm.reportValidity()) return;
    const subject = encodeURIComponent(`طلب عرض سعر - ${serviceSelect.value}`);
    const body = encodeURIComponent(buildQuoteMessage());
    window.location.href = `mailto:elsmmakforcontracting@gmail.com?subject=${subject}&body=${body}`;
  });
}

const revealItems = document.querySelectorAll(
  '.hero > *, .stats, .services-title, .card, .clients h2, .client-list li, ' +
  '.about-text, .about-numbers, .iso-section h2, .iso-card, .cta-band, .footer-grid > div, ' +
  '.svc-card, .method h2, .step, .project-card, .certs h2, .cert-badge, ' +
  '.info-card, .quote-box, .map-frame'
);