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
        mobileBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // Toggle dropdown on mobile click
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const toggleLink = dropdown.querySelector("a");
        if (toggleLink) {
            toggleLink.addEventListener("click", (e) => {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    dropdown.classList.toggle("active");
                }
            });
        }
    });


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
        const updateArrowVisibility = () => {
            if (scroller.scrollLeft <= 5) {
                leftBtn.style.opacity = "0";
                leftBtn.style.pointerEvents = "none";
            } else {
                leftBtn.style.opacity = "1";
                leftBtn.style.pointerEvents = "auto";
            }
        };

        // Check initially
        updateArrowVisibility();

        // Listen for scroll events
        scroller.addEventListener("scroll", updateArrowVisibility);

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
        // Run on all sizes to support resizing (CSS handles visibility)


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
    // WhatsApp Sticky Widget
    const waLink = document.createElement("a");
    waLink.href = "https://wa.me/919987535478";
    waLink.target = "_blank";
    waLink.rel = "noopener noreferrer";
    waLink.className = "whatsapp-sticky";
    waLink.innerHTML = `<svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>`;
    document.body.appendChild(waLink);

});

function toggleReadMore(event) {
    event.preventDefault();
    const toggleBtn = event.currentTarget || event.target;
    const link = toggleBtn.closest(".toggle-btn-link") || toggleBtn;
    const card = link.closest(".person-profile-card");
    if (!card) return;
    const content = card.querySelector(".more-content");
    if (!content) return;

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        link.innerHTML = 'Read Less <i class="fa-solid fa-arrow-right" style="margin-left: 8px; transform: rotate(-90deg);"></i>';
        card.classList.add("expanded");
    } else {
        content.style.display = "none";
        link.innerHTML = 'Read More <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i>';
        card.classList.remove("expanded");
    }
}
