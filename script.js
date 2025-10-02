const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  overlay.classList.remove('active');
});



const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;
let interval = setInterval(nextSlide, 4000); // auto every 4s

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === i);
    dots[idx].classList.toggle('active', idx === i);
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    showSlide(index);
    resetInterval();
  });
});

function resetInterval() {
  clearInterval(interval);
  interval = setInterval(nextSlide, 4000);
}


// Counter Animation
function animateCounter(id, target) {
  const element = document.getElementById(id);
  let count = 0;
  const speed = target / 100;
  const interval = setInterval(() => {
    count += Math.ceil(speed);
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    element.textContent = count + "+";
  }, 30);
}

window.addEventListener("scroll", () => {
  const stats = document.querySelector(".stats");
  const rect = stats.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    animateCounter("students", 500);
    animateCounter("teachers", 20);
  }
}, { once: true });



