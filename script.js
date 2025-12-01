document.addEventListener('DOMContentLoaded', function () {
    // Typing effect initialization
    var options = {
        strings: ["Machine Learning Engineer", "Developer", "Web Designer", "Youtuber", "Script Writer"],
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 2000,
        loop: true,
        showCursor: false
    };
    var typed = new Typed("#typed-text", options);

    const navLinks = document.querySelectorAll('nav a');
    const headerHeight = document.querySelector('header').offsetHeight;

    // Remove active class from all nav links
    function removeActiveClasses() {
        navLinks.forEach(link => link.classList.remove('active'));
    }

    // Add active class to the current nav link
    function addActiveClass(id) {
        const activeLink = document.querySelector(`nav a[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Scroll to the section with offset for header
    function scrollWithOffset(targetId) {
        const targetSection = document.getElementById(targetId);
        const offsetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Add click event to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);

            removeActiveClasses();
            link.classList.add('active');
            scrollWithOffset(targetId);
        });
    });

    const animatedElements = document.querySelectorAll('.skill-detail, .skills-right .skill-detail, .progress-bar');

    const observerOptions = {
        root: null,  // The viewport
        rootMargin: '0px',
        threshold: 0.1  // Trigger when 10% of the element is visible
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                if (entry.target.classList.contains('progress-bar')) {
                    const progressBar = entry.target.querySelector('.progress');
                    const finalWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = finalWidth;  // Set the final width when in view
                }
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header); // Observe the header element for when it enters the viewport
    });

    const projectCards = document.querySelectorAll('.project-card');
    let currentCardIndex = 0;
    let isDragging = false;
    let startX = 0;

    // Function to update the 3D overlapping effect after each swipe
    function updateCardPositions() {
        projectCards.forEach((card, index) => {
            const offsetIndex = (index - currentCardIndex + projectCards.length) % projectCards.length;

            card.style.transition = 'transform 0.5s ease';
            card.style.transform = `rotateY(${(offsetIndex - 1) * 10}deg) translateX(${(offsetIndex - 1) * 100}px)`;
            card.style.zIndex = offsetIndex === 1 ? 3 : 1; // Bring the active card to the front
            card.style.opacity = offsetIndex === 1 ? 1 : 0.8; // Dim the non-active cards
        });
    }

    // Initialize card positions
    updateCardPositions();

    // Function to move the top card away
    function showNextCard() {
        if (currentCardIndex < projectCards.length) {
            const currentCard = projectCards[currentCardIndex];

            // Animate the card off the screen (to the right)
            currentCard.style.transform = 'translateX(500px)';
            currentCard.style.opacity = '0';

            // Move the card to the back after a delay (to allow the swipe animation)
            setTimeout(() => {
                currentCard.style.transition = 'none'; // Disable transition temporarily
                currentCard.style.transform = 'translateX(0)'; // Reset position
                currentCard.style.opacity = '1'; // Reset opacity

                // Move the current card to the end of the container
                currentCard.parentElement.appendChild(currentCard);

                // Re-enable transition after moving the card
                setTimeout(() => {
                    currentCard.style.transition = 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out';
                }, 50);

                // Update the card positions after moving
                currentCardIndex = (currentCardIndex + 1) % projectCards.length;
                updateCardPositions();
            }, 300);
        }
    }

    // Detect any click (left, right, or middle) to start dragging
    document.addEventListener('mousedown', function (e) {
        // Start dragging on any mouse button press
        isDragging = true;
        startX = e.clientX;
    });

    // Detect mouse movement for dragging
    document.addEventListener('mousemove', function (e) {
        if (isDragging && currentCardIndex < projectCards.length) {
            const currentCard = projectCards[currentCardIndex];
            const offsetX = e.clientX - startX;

            // Move the card horizontally with the drag
            if (offsetX > 0) {
                currentCard.style.transform = `translateX(${offsetX}px)`;
            }
        }
    });

    // Detect release of mouse button to decide the card's final position
    document.addEventListener('mouseup', function (e) {
        if (isDragging) {
            isDragging = false;
            const currentCard = projectCards[currentCardIndex];
            const endX = e.clientX;

            // If the card was dragged far enough, swipe it away
            if (endX - startX > 150) {
                showNextCard();
            } else {
                // Otherwise, reset the card back to its original position
                currentCard.style.transform = 'translateX(0)';
            }
        }
    });

    // Close the overlay when the close button is clicked
    document.querySelector('.close-btn').addEventListener('click', closeOverlay);
});
