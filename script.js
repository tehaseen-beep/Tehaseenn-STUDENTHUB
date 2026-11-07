// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  
  // ------------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // ------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');

  mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.classList.toggle('is-active');
  });

  // Close mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('is-active');
    });
  });

  // ------------------------------------------------------------------
  // 2. Fetch & Render Courses from data.json
  // ------------------------------------------------------------------
  const courseContainer = document.getElementById('course-container');
  let allCourses = []; // Store fetched courses globally

  async function loadCourses() {
    try {
      const response = await fetch('data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      allCourses = await response.json();
      renderCourses(allCourses);
    } catch (error) {
      console.error('Error loading course data:', error);
      courseContainer.innerHTML = '<p class="loading-text">Unable to load courses at this moment. Make sure you are running via a local server (e.g. Live Server).</p>';
    }
  }

  function renderCourses(courses) {
    courseContainer.innerHTML = ''; // Clear loading text

    if (courses.length === 0) {
      courseContainer.innerHTML = '<p class="loading-text">No courses found in this category.</p>';
      return;
    }

    courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card';
      card.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-thumb" />
        <div class="course-body">
          <span class="course-category">${course.categoryName}</span>
          <h3 class="course-title">${course.title}</h3>
          <p class="course-desc">${course.description}</p>
          <div class="course-footer">
            <span class="course-rating">★ ${course.rating}</span>
            <button class="btn btn-primary btn-enroll" data-title="${course.title}">Enroll Now</button>
          </div>
        </div>
      `;
      courseContainer.appendChild(card);
    });

    // Attach click events to newly created "Enroll Now" buttons
    const enrollButtons = document.querySelectorAll('.btn-enroll');
    enrollButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.target.getAttribute('data-title');
        alert(`Thank you for registering for "${title}"! Check your email for access instructions.`);
      });
    });
  }

  // ------------------------------------------------------------------
  // 3. Category Filter Functionality
  // ------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      if (category === 'all') {
        renderCourses(allCourses);
      } else {
        const filtered = allCourses.filter(c => c.category === category);
        renderCourses(filtered);
      }
    });
  });

  // ------------------------------------------------------------------
  // 4. Contact Form Validation & Submission
  // ------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (name === '' || email === '') {
      formStatus.textContent = 'Please fill out all required fields.';
      formStatus.className = 'form-status error';
      return;
    }

    // Simulate successful form sending
    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
    formStatus.className = 'form-status success';
    contactForm.reset();

    setTimeout(() => {
      formStatus.textContent = '';
    }, 5000);
  });

  // ------------------------------------------------------------------
  // 5. Resource Download Simulation
  // ------------------------------------------------------------------
  const resourceBtns = document.querySelectorAll('.resource-btn');
  resourceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Your download has started! Thank you for using StudentHub.');
    });
  });

  // ------------------------------------------------------------------
  // 6. Newsletter Subscription
  // ------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletter-form');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Subscribed! You will now receive our weekly newsletter.');
    newsletterForm.reset();
  });

  // Load the initial course data
  loadCourses();
});