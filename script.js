

/************************************
  1. Hamburger Menu Functionality
*************************************/
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

/************************************
  2. Hero Background Image Slider
     (like IG story loop)
*************************************/
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


/************************************
  3. Counter Animation
     (students & teachers)
*************************************/
function animateCounter(id, target) {
  const el = document.getElementById(id);
  let count = 0;
  const speed = target / 100;

  const interval = setInterval(() => {
    count += Math.ceil(speed);
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count + "+";
  }, 30);
}

const statsSection = document.querySelector('.stats');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter("students", 500);
      animateCounter("teachers", 20);
    }
  });
}, {
  threshold: 0.5
});

if (statsSection) {
  counterObserver.observe(statsSection);
}

/************************************
  4. Scroll-triggered Text Animations
     (trigger every time in view)
*************************************/
const animatedElements = document.querySelectorAll('.animate-on-scroll');

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
    } else {
      entry.target.classList.remove('animated'); // reset so it can re-trigger
    }
  });
}, {
  threshold: 0.3
});

animatedElements.forEach(el => animationObserver.observe(el));



