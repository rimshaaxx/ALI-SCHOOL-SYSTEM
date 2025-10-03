

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

///***review section */
const stars = document.querySelectorAll('.review-form .stars span');
const textarea = document.getElementById('review-text');
const submitBtn = document.getElementById('submit-review');
const reviewList = document.getElementById('review-list');

let selectedRating = 0;

// Load saved reviews from localStorage
window.addEventListener('DOMContentLoaded', loadReviews);

// Star rating interactions
stars.forEach(star => {
  star.addEventListener('mouseenter', () => {
    const hoverVal = Number(star.dataset.value);
    stars.forEach((s, i) => {
      s.classList.toggle('active', i < hoverVal);
    });
  });
  star.addEventListener('mouseleave', () => {
    stars.forEach((s, i) => {
      s.classList.toggle('active', i < selectedRating);
    });
  });
  star.addEventListener('click', () => {
    selectedRating = Number(star.dataset.value);
    stars.forEach((s, i) => {
      s.classList.toggle('active', i < selectedRating);
    });
  });
});

// Submit review
submitBtn.addEventListener('click', () => {
  const text = textarea.value.trim();
  if (selectedRating === 0 || text === "") return;

  const reviewData = {
    rating: selectedRating,
    text
  };

  addReviewToDOM(reviewData);
  saveReview(reviewData);

  // Reset form
  textarea.value = "";
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('active'));
});

// Add review to DOM
function addReviewToDOM(reviewData, index = null) {
  const review = document.createElement('div');
  review.classList.add('review');
  review.innerHTML = `
    <div class="stars">${'★'.repeat(reviewData.rating)}</div>
    <p>${reviewData.text}</p>
    <span class="delete">❌</span>
  `;

  // Delete button
  review.querySelector('.delete').addEventListener('click', () => {
    review.remove();
    deleteReview(index);
  });

  reviewList.prepend(review);
}

// Save review to localStorage
function saveReview(reviewData) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(reviewData);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  loadReviews(); // reload to update delete indexes
}

// Load reviews from localStorage
function loadReviews() {
  reviewList.innerHTML = "";
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.forEach((review, i) => addReviewToDOM(review, i));
}

// Delete review from localStorage
function deleteReview(index) {
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  loadReviews();
}
