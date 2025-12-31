document.addEventListener("DOMContentLoaded", function () {
    /* SCROLL ANIMATIONS */
    /* SCROLL ANIMATIONS */
    const elementsToAddAnimation = document.querySelectorAll(
        ".hero-content, .why-design .card, .values .value-card, .change-section .change-card, .change-section .dark-cta-card, .work-with-us .work-card, footer .footer-grid"
    );

    elementsToAddAnimation.forEach((el) => el.classList.add("animate-on-scroll"));

    const animatedElements = document.querySelectorAll(".animate-on-scroll");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2 }
        );

        animatedElements.forEach((el) => observer.observe(el));
    } else {
        animatedElements.forEach((el) => el.classList.add("in-view"));
    }

    /* DIFFERENT COLOURS REMOVED - NOW HANDLED BY CSS */

    /* MOBILE MENU */
    const mobileBtn = document.querySelector(".mobile-menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (mobileBtn && navLinks) {
        mobileBtn.style.display = "block";
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }


    /* VALUE CARDS CLICK INTERACTION (GLASSMORPHISM) */
    const valueCards = document.querySelectorAll(".values .value-card");

    if (valueCards.length > 0) {
        const resetValueCards = () => {
            valueCards.forEach(c => c.classList.remove("active"));
        };

        valueCards.forEach(card => {
            card.addEventListener("click", (e) => {
                e.stopPropagation();
                const isActive = card.classList.contains("active");

                resetValueCards();

                if (!isActive) {
                    card.classList.add("active");
                }
            });
        });

        // Combined click outside listener
        document.addEventListener("click", (e) => {
            if (!e.target.closest(".values .value-card")) {
                resetValueCards();
            }
        });
    }




    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });



    /* CASE STUDY SCROLLER */
    const scroller = document.querySelector(".case-study-scroller");
    const leftBtn = document.querySelector(".scroll-btn.left");
    const rightBtn = document.querySelector(".scroll-btn.right");

    if (scroller && leftBtn && rightBtn) {
        rightBtn.addEventListener("click", () => {
            scroller.scrollBy({ left: 380, behavior: "smooth" }); // 350 card + 30 gap
        });

        leftBtn.addEventListener("click", () => {
            scroller.scrollBy({ left: -380, behavior: "smooth" });
        });
    }

    /* VALUES SCROLLER (MOBILE) */
    const valScroller = document.querySelector(".values-grid");
    const valLeftBtn = document.querySelector(".vals-scroll-btn.left");
    const valRightBtn = document.querySelector(".vals-scroll-btn.right");

    if (valScroller && valLeftBtn && valRightBtn) {
        valRightBtn.addEventListener("click", () => {
            valScroller.scrollBy({ left: 300, behavior: "smooth" });
        });

        valLeftBtn.addEventListener("click", () => {
            valScroller.scrollBy({ left: -300, behavior: "smooth" });
        });
    }

    /* WORK SCROLLER (MOBILE) */
    const workScroller = document.querySelector(".work-grid");
    const workLeftBtn = document.querySelector(".work-scroll-btn.left");
    const workRightBtn = document.querySelector(".work-scroll-btn.right");

    if (workScroller && workLeftBtn && workRightBtn) {
        workRightBtn.addEventListener("click", () => {
            workScroller.scrollBy({ left: 300, behavior: "smooth" });
        });

        workLeftBtn.addEventListener("click", () => {
            workScroller.scrollBy({ left: -300, behavior: "smooth" });
        });
    }

    /* CHANGE SCROLLER (MOBILE) */
    const changeScroller = document.querySelector(".bento-grid");
    const changeLeftBtn = document.querySelector(".change-scroll-btn.left");
    const changeRightBtn = document.querySelector(".change-scroll-btn.right");

    if (changeScroller && changeLeftBtn && changeRightBtn) {
        changeRightBtn.addEventListener("click", () => {
            changeScroller.scrollBy({ left: 300, behavior: "smooth" });
        });

        changeLeftBtn.addEventListener("click", () => {
            changeScroller.scrollBy({ left: -300, behavior: "smooth" });
        });
    }

    /* SETS US APART SCROLLER (MOBILE) */
    const setsScroller = document.querySelector(".sets-apart-grid");
    const setsLeftBtn = document.querySelector(".sets-scroll-btn.left");
    const setsRightBtn = document.querySelector(".sets-scroll-btn.right");

    if (setsScroller && setsLeftBtn && setsRightBtn) {
        setsRightBtn.addEventListener("click", () => {
            setsScroller.scrollBy({ left: 300, behavior: "smooth" });
        });

        setsLeftBtn.addEventListener("click", () => {
            setsScroller.scrollBy({ left: -300, behavior: "smooth" });
        });
    }

    /* WHY DESIGN SCROLLER (MOBILE) */
    const whyScroller = document.querySelector(".why-design .cards-grid-4");
    const whyLeftBtn = document.querySelector(".why-scroll-btn.left");
    const whyRightBtn = document.querySelector(".why-scroll-btn.right");

    if (whyScroller && whyLeftBtn && whyRightBtn) {
        whyRightBtn.addEventListener("click", () => {
            whyScroller.scrollBy({ left: 300, behavior: "smooth" });
        });

        whyLeftBtn.addEventListener("click", () => {
            whyScroller.scrollBy({ left: -300, behavior: "smooth" });
        });
    }

    /* MOBILE CAROUSEL FUNCTION (Show/Hide) */
    function setupMobileCarousel(gridSelector, containerSelector, controlsSelector = null) {
        // Only run on mobile (optional check, but CSS handles display)
        if (window.innerWidth > 900) return;

        const carousels = document.querySelectorAll(gridSelector);

        carousels.forEach(carousel => {
            const parent = carousel.parentElement;
            if (!parent) return;

            const dotsContainer = parent.querySelector(containerSelector);
            if (!dotsContainer) return;

            // Optional Controls (Arrows)
            let leftBtn = null;
            let rightBtn = null;
            if (controlsSelector) {
                const controls = parent.querySelector(controlsSelector);
                if (controls) {
                    leftBtn = controls.querySelector('button.left');
                    rightBtn = controls.querySelector('button.right');
                }
            }

            // Clear existing dots
            dotsContainer.innerHTML = '';

            // Get items
            const items = carousel.children;
            const itemCount = items.length;

            if (itemCount === 0) return;

            let currentIndex = 0;
            let intervalId;

            // Initialize State
            // Add 'active' class to first item, remove from others
            Array.from(items).forEach((item, index) => {
                if (index === 0) item.classList.add('active');
                else item.classList.remove('active');
            });

            // Create Dots
            const dots = [];
            for (let i = 0; i < itemCount; i++) {
                const dot = document.createElement('div');
                dot.classList.add('scroller-dot');
                if (i === 0) dot.classList.add('active');

                dot.addEventListener('click', (e) => {
                    e.stopPropagation(); // Prevent bubbling
                    stopAutoPlay();
                    showSlide(i);
                    startAutoPlay();
                });

                dotsContainer.appendChild(dot);
                dots.push(dot);
            }

            // Click to toggle details (for overlay cards)
            Array.from(items).forEach(item => {
                item.addEventListener('click', () => {
                    item.classList.toggle('show-details');
                });
            });

            // Show Slide Function
            const showSlide = (index) => {
                // Loop around
                if (index >= itemCount) index = 0;
                if (index < 0) index = itemCount - 1;

                currentIndex = index;

                // Update Cards
                Array.from(items).forEach((item, i) => {
                    if (i === index) item.classList.add('active');
                    else item.classList.remove('active');
                });

                // Update Dots
                dots.forEach((dot, i) => {
                    if (i === index) dot.classList.add('active');
                    else dot.classList.remove('active');
                });
            };

            // Auto Play Logic
            const startAutoPlay = () => {
                stopAutoPlay();
                intervalId = setInterval(() => {
                    showSlide(currentIndex + 1);
                }, 4000); // 4 seconds
            };

            const stopAutoPlay = () => {
                if (intervalId) clearInterval(intervalId);
            };

            // Button Listeners
            if (leftBtn) {
                leftBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    showSlide(currentIndex - 1);
                    startAutoPlay();
                });
            }
            if (rightBtn) {
                rightBtn.addEventListener('click', () => {
                    stopAutoPlay();
                    showSlide(currentIndex + 1);
                    startAutoPlay();
                });
            }

            // Start
            startAutoPlay();

            // Swipe Detection
            let touchStartX = 0;
            let touchEndX = 0;

            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoPlay();
            });

            carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startAutoPlay();
            });

            const handleSwipe = () => {
                const threshold = 50;
                if (touchEndX < touchStartX - threshold) {
                    // Swipe Left -> Next
                    showSlide(currentIndex + 1);
                }
                if (touchEndX > touchStartX + threshold) {
                    // Swipe Right -> Prev
                    showSlide(currentIndex - 1);
                }
            };
        });
    }

    // Initialize Carousels
    // We wrap in a debounce or check for resize if needed, but simple init works
    setupMobileCarousel(".stages-grid", ".scroller-dots-container", ".stages-mobile-controls"); // Added controls selector
    setupMobileCarousel(".deliver-list", ".scroller-dots-container");
    setupMobileCarousel(".process-grid", ".scroller-dots-container");

});

// Read More Toggle for Collaborators
function toggleReadMore(event) {
    event.preventDefault();
    const link = event.target;
    const content = link.previousElementSibling; // Expecting .more-content immediately before

    if (content.style.display === "none") {
        content.style.display = "block";
        link.textContent = "Read Less";
    } else {
        content.style.display = "none";
        link.textContent = "Read More";
    }
}
