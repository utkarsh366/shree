// main.js
document.addEventListener('DOMContentLoaded', function () {
  // Hamburger & Sidebar
  const burger = document.getElementById('nav-toggle');
  const sidebar = document.querySelector('.sidebar');
  const closeSidebar = document.querySelector('.sidebar-close');
  burger?.addEventListener('click', () => sidebar.classList.add('active'));
  closeSidebar?.addEventListener('click', () => sidebar.classList.remove('active'));
  // Close sidebar on link click (mobile UX)
  sidebar?.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-link')) sidebar.classList.remove('active');
  });

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) scrollBtn.style.display = 'block';
    else scrollBtn.style.display = 'none';
  });
  scrollBtn?.addEventListener('click', () => window.scrollTo({ top:0, behavior: 'smooth' }));

  // Section fade-in animation
  const animatedSections = document.querySelectorAll('.animated-section');
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }),
    { threshold: 0.18 }
  );
  animatedSections.forEach(el => observer.observe(el));
});
// ==== Testimonial Slider ====
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.testimonial-slider-track');
  const leftBtn = document.querySelector('.slider-arrow-left');
  const rightBtn = document.querySelector('.slider-arrow-right');
  const dotsContainer = document.querySelector('.testimonial-slider-dots');
  if (!track) return;
  const slides = Array.from(track.children);
  const slidesToShow = window.innerWidth < 670 ? 1 : 2;
  let current = 0;
  let interval;
  function updateSlider() {
    const show = window.innerWidth < 670 ? 1 : 2;
    const slideWidth = slides[0].offsetWidth + parseInt(getComputedStyle(slides[0]).marginRight || 0) * 2;
    const trans = -current * slideWidth;
    track.style.transform = `translateX(${trans}px)`;
    // Update dots
    Array.from(dotsContainer.children).forEach((d,i) =>
      d.classList.toggle('active', i === current));
  }
  function createDots() {
    dotsContainer.innerHTML = '';
    const numDots = slides.length - (slidesToShow - 1);
    for (let i = 0; i < numDots; i++) {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute("aria-label", `Show testimonials ${i+1} & ${i+2}`);
      dot.onclick = () => { current = i; updateSlider(); restartAutoCycle(); };
      dotsContainer.appendChild(dot);
    }
  }
  function next() {
    current = (current + 1) % (slides.length - (slidesToShow - 1));
    updateSlider();
  }
  function prev() {
    current = (current - 1 + (slides.length - (slidesToShow - 1))) % (slides.length - (slidesToShow - 1));
    updateSlider();
  }
  function restartAutoCycle() {
    clearInterval(interval);
    interval = setInterval(next, 6500);
  }
  leftBtn && leftBtn.addEventListener('click', () => { prev(); restartAutoCycle(); });
  rightBtn && rightBtn.addEventListener('click', () => { next(); restartAutoCycle(); });
  window.addEventListener('resize', () => { updateSlider(); });
  createDots();
  updateSlider();
  interval = setInterval(next, 6500);
});
