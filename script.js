document.addEventListener('DOMContentLoaded', function () {
    // Typing effect initialization
    var options = {
        strings: ["Machine Learning Engineer", "AI Developer", "Data Scientist"],
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

    // Scroll-based active nav link (scrollspy)
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
        const offsetPos = scrollPos + headerHeight + 10; // small buffer

        let currentSectionId = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (offsetPos >= sectionTop && offsetPos < sectionTop + sectionHeight) {
                currentSectionId = section.id;
            }
        });

        if (currentSectionId) {
            removeActiveClasses();
            addActiveClass(currentSectionId);
        }
    }

    window.addEventListener('scroll', onScroll);

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
    
    // Observe contact image for animation trigger
    const contactImage = document.querySelector('.contact-image');
    if (contactImage) {
        const contactImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // Stop observing once animation is triggered
                    contactImageObserver.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        contactImageObserver.observe(contactImage);
    }

    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        observer.observe(header); // Observe the header element for when it enters the viewport
    });

    // Project data with details, tech stack, and media
    const projectsData = {
        '1': {
            title: 'Aspect-Based Sentiment Analysis',
            type: 'Graduation Project',
            description: 'An advanced Natural Language Processing project that performs sentiment analysis at the aspect level. This deep learning model can identify different aspects of a product or service and determine the sentiment for each aspect separately, providing more granular insights than traditional sentiment analysis.',
            introduction: 'Despite its strengths, sentiment analysis still faces important challenges that affect accuracy. A key difficulty is correctly identifying the specific aspects mentioned in a review and linking the right sentiment to each one. This is essential in Aspect-Based Sentiment Analysis (ABSA). For example, consider the review: "The food was great, but the service was slow." Here, the model must recognize "food" and "service" as two separate aspects, and then understand that the sentiment toward food is positive, while the sentiment toward service is negative. Many models struggle with this level of detail, making aspect detection one of the most challenging parts of sentiment analysis.',
            proposedSolution: 'Proposed Solution',
            proposedSolutionText: 'We implemented two deep learning models to address these challenges. The final model is deployed in a web application, enabling real-time aspect-based sentiment analysis.',
            proposedSolutionImage: 'sentimentAnalysis.jpeg',
            modelArchitecture: 'Model Architecture',
            dataSection: 'Data',
            dataDescription: 'We used two datasets for this project: <a href="https://github.com/ja2003aa/AspectBasedSentimentAanalysis" target="_blank" rel="noopener noreferrer" style="color: #b74b4b; text-decoration: underline;">SemEval</a> for the aspect-based task, and <a href="https://github.com/ja2003aa/AspectBasedSentimentAanalysis" target="_blank" rel="noopener noreferrer" style="color: #b74b4b; text-decoration: underline;">Vaghani (2023)</a> for sentiment classification. The Vaghani dataset contains 171,000 data points.',
            resultsSection: 'Results',
            generalSentimentCM: 'BiltsmGeneralCM.jpeg',
            aspectBasedCM: 'ApspectBased.jpeg',
            deploymentSection: 'Deployment App',
            deploymentDescription: 'The aspect model was deployed into an app that allows users to upload a file or CSV of reviews with categories next to each review (e.g., hair care product). The app uses BERT embeddings and K-means clustering. This data is turned into graphs and insights useful for business. For example, positive.jpeg shows positive sentiment over time to help realize how their product changes over time. Users can also view neutral and negative sentiment trends. We also created word clouds for each sentiment.',
            deploymentImages: ['positive.jpeg', 'webapp.jpeg'],
            tech: ['Python', 'TensorFlow', 'PyTorch', 'BERT', 'NLP', 'Deep Learning', 'Transformers'],
            image: 'project1.jpg',
            video: null,
            github: 'https://github.com/ja2003aa/AspectBasedSentimentAanalysis',
            images: [
                { src: 'CNNMethodology.jpeg', title: 'Methodology of CNN' },
                { src: 'CNNConfusionMatrix.jpeg', title: 'CNN Confusion Matrix - Model performance evaluation showing classification accuracy across sentiment classes' },
                { src: 'biltsm.jpeg', title: 'Methodology of BILTSM' },
                { src: 'BILTSMConfusionMatrix.jpeg', title: 'BILTSM Confusion Matrix - Model performance evaluation showing classification accuracy across sentiment classes' },
                { src: 'webapp.jpeg', title: 'Web Application Interface' },
                { src: 'cloud.jpeg', title: 'Cloud Architecture' },
                { src: 'sentimentAnalysis.jpeg', title: 'Sentiment Analysis Results' }
            ]
        },
        '2': {
            title: 'Train Delay Prediction & Chatbot',
            type: 'ML & NLP Project',
            description: 'A comprehensive system that combines machine learning for predicting train delays with an intelligent chatbot interface. The ML model analyzes historical data, weather conditions, and traffic patterns to predict delays, while the NLP-powered chatbot provides real-time information and answers user queries about train schedules.',
            introduction: 'An AI chatbot is an intelligent system designed to assist users through natural, task-driven conversations. In this project, the chatbot enables train passengers to access essential travel information quickly and accurately. The system retrieves ticket data, displays the cheapest available routes, and—most importantly—predicts potential journey delays. Using machine learning models, the chatbot analyzes current and historical delay patterns to estimate how long a user\'s trip may be affected. This provides travelers with fast, reliable delay predictions and significantly enhances the overall customer experience.',
            dataSection: 'Data',
            dataDescription: 'The original dataset contains 426,729 rows and 21 columns, covering London–Liverpool train journeys from 2017 to 2022, sourced from Darwin historical train data. To improve delay prediction accuracy, we engineered several new features, including:<br><br>• <strong>Departure Delay and Arrival Delay</strong> (difference between scheduled and actual times)<br>• <strong>Month, Day, Hour, and Day of Week</strong> to capture temporal patterns<br>• <strong>Peak vs. Off-Peak indicators</strong> based on National Rail peak hours<br><br>These engineered features, not present in the original dataset, were added to strengthen model performance and were used as key inputs in training the delay prediction model.',
            statisticalAnalysis: 'Statistical Analysis',
            statisticalAnalysisImage: 'DataAnalysis.jpeg',
            statisticalAnalysisText: 'The statistical analysis provided strong insights into the data patterns and distributions. The results are shown below. Following this analysis, we proceeded to remove outliers to improve data quality and model performance.',
            experimentSection: 'Experiment',
            experimentDescription: 'We began with a baseline experiment, then evaluated four machine learning models: XGBoost, K-Nearest Neighbor, Random Forest, and Linear Regression. These model selections were informed by existing literature and their demonstrated effectiveness in similar regression and time-series prediction tasks.',
            resultsSection: 'Results',
            resultsImage: 'trainResult.jpeg',
            optimizationSection: 'Optimization',
            optimizationDescription: 'The optimization process leveraged XGBoost hyperparameter tuning, organized into three groups:<br><br><strong>Group 1:</strong> max_depth and min_child_weight<br><strong>Group 2:</strong> subsample and colsample_bytree<br><strong>Group 3:</strong> learning_rate and n_estimators (num_boost_round)',
            optimizationImages: ['opt1.jpeg', 'opt2.jpeg', 'opt3.jpeg'],
            evaluationSection: 'Model Evaluation',
            evaluationDescription: 'The best XGBoost model was retrained with the optimal parameters and evaluated on the test set to check for overfitting. The results are as follows:<br><br>• <strong>Training Set</strong> - R²: 0.6087, RMSE: 3.0066<br>• <strong>Test Set</strong> - R²: 0.5930, RMSE: 3.0665',
            liveApplication: 'Live Application',
            liveApplicationText: 'A live application was developed with a user interface to showcase the chatbot\'s train delay prediction capabilities in real-time.',
            projectNote: 'This was a collaborative group project. I was responsible for all components of the system except the data scraper, including model development, statistical analysis, optimization, evaluation, and the chatbot implementation.',
            tech: ['Python', 'Machine Learning', 'NLP', 'Chatbot', 'TensorFlow', 'Flask', 'API Integration'],
            image: 'project2.jpg',
            video: 'TrainDelay.mp4',
            github: 'https://github.com/ja2003aa/PredictiveModelingTrain'
        },
        '3': {
            title: 'Service Completion Time Prediction',
            type: 'University of Jeddah',
            description: 'A machine learning system developed for the University of Jeddah to predict service completion times. This helps optimize resource allocation and improve service efficiency by forecasting how long different administrative services will take to complete based on historical data and current workload.',
            tech: ['Python', 'Scikit-learn', 'Pandas', 'Data Analysis', 'Regression Models', 'Time Series'],
            image: 'project3.jpg',
            video: null,
            github: 'https://github.com/yourusername/service-completion-prediction',
            passwordProtected: true,
            password: 'UJ2024', // Password for University of Jeddah access
            lockedDescription: 'This project uses confidential University of Jeddah service-time data. For privacy and data-security reasons, the raw dataset and internal system details cannot be publicly shared. However, a technical overview, architecture, and model performance summary can be shared upon request. If you would like access to the password-protected demo, please provide your professional details for verification.',
            authenticatedDescription: 'Thank you for understanding our data protection policies. For privacy and security reasons, no actual data or sensitive information is revealed in this demo. You can view the model performance metrics, architecture overview, and technical implementation details only.',
            lockedImages: [
                { src: 'locked1.jpg', title: '🔒 Restricted Access - Database Schema' },
                { src: 'locked2.jpg', title: '🔒 Restricted Access - Model Architecture' },
                { src: 'locked3.jpg', title: '🔒 Restricted Access - Performance Metrics' }
            ]
        },
        '4': {
            title: 'Zaina Beauty Booking Platform',
            type: 'Web Application',
            description: 'A full-stack web application for booking beauty services. Features include user authentication, service selection, appointment scheduling, payment integration, and admin dashboard for managing bookings and services. Built with modern web technologies for a seamless user experience.',
            introduction: 'Zaina Beauty Booking Platform is a comprehensive mobile and web application designed to revolutionize the beauty service booking experience. The platform combines modern authentication methods, real-time updates, and intelligent recommendation systems to provide users with a seamless and personalized booking journey.',
            featuresSection: 'Key Features',
            featuresDescription: 'The platform incorporates several advanced features to enhance user experience and operational efficiency:',
            featuresList: [
                '<strong>WhatsApp Authentication:</strong> Seamless login and verification using WhatsApp, providing users with a familiar and secure authentication method without requiring traditional email or password credentials.',
                '<strong>Firebase Integration:</strong> Leveraging Firebase for real-time database synchronization, cloud storage, and backend services to ensure fast, reliable, and scalable application performance.',
                '<strong>Expo Go Development:</strong> Built using Expo Go for rapid mobile development and testing, enabling cross-platform compatibility and streamlined deployment across iOS and Android devices.',
                '<strong>Push Notifications:</strong> Real-time notification system that keeps users informed about appointment confirmations, reminders, service updates, and promotional offers, ensuring they never miss important information.',
                '<strong>Real-Time Updates:</strong> Live synchronization of booking availability, service schedules, and user interactions across all connected devices, providing instant updates without manual refresh.'
            ],
            recommenderSection: 'Intelligent Recommender System',
            recommenderDescription: 'The platform includes an advanced recommender system that tracks user behavior, preferences, and booking patterns. This system collects valuable data points including:',
            recommenderList: [
                'Service preferences and booking history',
                'Preferred appointment times and frequencies',
                'User ratings and feedback patterns',
                'Service category interactions and trends'
            ],
            recommenderFuture: 'This data collection serves as the foundation for AI-driven enhancements. Our next goal is to fully integrate machine learning models into the system to provide personalized service recommendations, predict optimal booking times, and create intelligent marketing strategies that enhance user satisfaction and business insights.',
            groupBookingSection: 'Group Booking Feature',
            groupBookingDescription: 'The platform includes a comprehensive group booking feature that allows users to book services for multiple people simultaneously. Users can select services for all group members and choose from flexible payment options, including paying for everyone or sending payment links to friends.',
            groupBookingNote: '<strong style="color: #b74b4b;">Note:</strong> The full payment gateway integration is not yet implemented and is displayed for demonstration purposes only.',
            groupBookingImages: [
                'simulator_screenshot_4353FB65-DA00-4A2E-AED9-146DDB06EDE6.png',
                'simulator_screenshot_DC075E56-F665-4306-B563-347A662BF41E.png',
                'simulator_screenshot_820F5FDF-9927-4B06-99FD-A36F0346F1ED.png'
            ],
            tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'CSS', 'RESTful API', 'Firebase', 'Expo Go', 'WhatsApp API', 'Push Notifications'],
            image: 'zaina.png',
            video: 'zaina.mp4',
            github: 'https://github.com/ja2003aa/ZainaUser/tree/chore/upgrade-expo-54',
            images: [
                { src: 'zaina.png', title: 'Zaina Beauty Booking Platform - Main Interface' },
                { src: 'ECE36D56-D957-4267-9366-0D45FC77D1A7.jpeg', title: 'Group Booking Interface - Payment Options' }
            ]
        },
        '5': {
            title: 'Alllam: Arabic LLM Fine-tuning & iOS Keyboard Extension',
            type: 'AI Research & iOS Development',
            description: 'A complete end-to-end project: Fine-tuned a large language model (Alllam) on IBM Watson using collected and cleaned Arabic poetry data. The fine-tuned model powers an iOS keyboard extension that generates Arabic poems on-demand. Users type keywords (like "love", "mom", "patient"), select the number of verses, and the keyboard generates culturally appropriate Arabic poetry that can be pasted into text messages, photo captions, or any app. The keyboard works live and types the poem for you automatically.',
            tech: ['Python', 'Transformers', 'PyTorch', 'IBM Watson', 'Arabic NLP', 'Fine-tuning', 'Swift', 'iOS SDK', 'Keyboard Extension', 'Poetry Generation'],
            image: 'project5.jpg',
            videos: ['textcaption.mp4', 'photocaptio.mp4'], // Multiple videos
            github: 'https://github.com/yourusername/alllam-keyboard' // Add your GitHub URL
        }
    };

    const projectsContainer = document.querySelector('.projects-container');
    let currentCardIndex = 0;
    let isDragging = false;
    let dragStartX = 0;
    let currentDragX = 0;
    let activeCard = null;

    // Get current cards array (always fresh from DOM)
    const getProjectCards = () => Array.from(document.querySelectorAll('.project-card'));

    // Function to update the 3D overlapping effect - centered cards
    function updateCardPositions() {
        const projectCards = getProjectCards();
        if (projectCards.length === 0) return;

        projectCards.forEach((card, index) => {
            // Calculate relative position from current card (circular loop)
            let relativeIndex = index - currentCardIndex;
            if (relativeIndex < 0) relativeIndex += projectCards.length;
            
            // Show all cards in a circular loop
            card.style.display = 'flex';

            // Position cards centered with more spacing between them
            if (relativeIndex === 0) {
                // Front card (active) - centered
                card.style.transform = 'translateX(0) translateY(0) rotateY(0deg) scale(1)';
                card.style.zIndex = projectCards.length + 2;
                card.style.opacity = '1';
            } else if (relativeIndex === 1) {
                // Second card (behind left) - more spacing
                card.style.transform = 'translateX(-200px) translateY(0) rotateY(-5deg) scale(0.9)';
                card.style.zIndex = projectCards.length + 1;
                card.style.opacity = '0.6';
            } else if (relativeIndex === projectCards.length - 1) {
                // Last card (behind right) - for looping, more spacing
                card.style.transform = 'translateX(200px) translateY(0) rotateY(5deg) scale(0.9)';
                card.style.zIndex = projectCards.length + 1;
                card.style.opacity = '0.6';
            } else if (relativeIndex === 2) {
                // Third card (furthest left) - even more spacing
                card.style.transform = 'translateX(-400px) translateY(0) rotateY(-10deg) scale(0.8)';
                card.style.zIndex = projectCards.length;
                card.style.opacity = '0.4';
            } else if (relativeIndex === projectCards.length - 2) {
                // Second to last card (furthest right) - for looping, more spacing
                card.style.transform = 'translateX(400px) translateY(0) rotateY(10deg) scale(0.8)';
                card.style.zIndex = projectCards.length;
                card.style.opacity = '0.4';
            } else {
                // Hide cards that are too far
                card.style.display = 'none';
            }

            card.style.transition = isDragging ? 'none' : 'transform 0.5s ease, opacity 0.5s ease';
        });
    }

    // Initialize card positions - ensure all cards are centered
    const projectCards = getProjectCards();
    projectCards.forEach(card => {
        card.style.position = 'absolute';
        card.style.left = '50%';
        card.style.top = '50%';
        card.style.marginLeft = '-175px';
        card.style.marginTop = '-250px';
    });
    
    // Set image count for gallery previews
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');
        const project = projectsData[projectId];
        const imageCount = card.querySelector('.image-count');
        if (imageCount && project && project.images) {
            imageCount.textContent = project.images.length;
        }
    });

    // Initialize card positions
    updateCardPositions();

    // Re-update after a short delay to ensure DOM is ready
    setTimeout(() => {
        updateCardPositions();
    }, 100);

    // Function to show next card
    function showNextCard() {
        const projectCards = getProjectCards();
        if (projectCards.length === 0) return;
        currentCardIndex = (currentCardIndex + 1) % projectCards.length;
        updateCardPositions();
    }

    // Function to show previous card
    function showPreviousCard() {
        const projectCards = getProjectCards();
        if (projectCards.length === 0) return;
        currentCardIndex = (currentCardIndex - 1 + projectCards.length) % projectCards.length;
        updateCardPositions();
    }

    // Handle swipe for the active card only
    const activeCardElement = () => {
        const projectCards = getProjectCards();
        return projectCards[currentCardIndex];
    };

    // Mouse events - use event delegation
    projectsContainer.addEventListener('mousedown', function(e) {
        const card = e.target.closest('.project-card');
        if (!card) return;
        
        // Only allow dragging on the front card
        if (card !== activeCardElement()) return;
        if (e.target.classList.contains('view-details-btn') || e.target.closest('.view-details-btn')) return;
        
        isDragging = true;
        activeCard = card;
        dragStartX = e.clientX;
        currentDragX = 0;
        card.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging && activeCard) {
            currentDragX = e.clientX - dragStartX;
            // Allow dragging in both directions for better UX
            activeCard.style.transform = `translateX(${currentDragX}px) translateY(0) rotateY(${currentDragX / 20}deg)`;
        }
    });

    document.addEventListener('mouseup', function(e) {
        if (isDragging && activeCard) {
            isDragging = false;
            activeCard.style.cursor = 'grab';
            
            const swipeThreshold = 100;
            if (currentDragX > swipeThreshold) {
                // Swipe right - go to next card (loops)
                showNextCard();
            } else if (currentDragX < -swipeThreshold) {
                // Swipe left - go to previous card (loops)
                showPreviousCard();
            } else {
                // Snap back to center
                updateCardPositions();
            }
            
            activeCard = null;
            currentDragX = 0;
        }
    });

    // Touch events for mobile - use event delegation
    projectsContainer.addEventListener('touchstart', function(e) {
        const card = e.target.closest('.project-card');
        if (!card) return;
        
        if (card !== activeCardElement()) return;
        if (e.target.classList.contains('view-details-btn') || e.target.closest('.view-details-btn')) return;
        
        isDragging = true;
        activeCard = card;
        dragStartX = e.touches[0].clientX;
        currentDragX = 0;
        e.preventDefault();
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
        if (isDragging && activeCard) {
            currentDragX = e.touches[0].clientX - dragStartX;
            // Allow dragging in both directions
            activeCard.style.transform = `translateX(${currentDragX}px) translateY(0) rotateY(${currentDragX / 20}deg)`;
        }
    });

    document.addEventListener('touchend', function(e) {
        if (isDragging && activeCard) {
            isDragging = false;
            
            const swipeThreshold = 100;
            if (currentDragX > swipeThreshold) {
                // Swipe right - go to next card (loops)
                showNextCard();
            } else if (currentDragX < -swipeThreshold) {
                // Swipe left - go to previous card (loops)
                showPreviousCard();
            } else {
                // Snap back to center
                updateCardPositions();
            }
            
            activeCard = null;
            currentDragX = 0;
        }
    });

    // Password protection state
    const authenticatedProjects = new Set();

    // Show project details in overlay
    function showProjectDetails(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        // Check if password protected
        if (project.passwordProtected && !authenticatedProjects.has(projectId)) {
            openPasswordModal(projectId);
            return;
        }

        const overlay = document.getElementById('overlay');
        const title = document.getElementById('overlay-title');
        const type = document.getElementById('overlay-type');
        const description = document.getElementById('overlay-description');
        const media = document.getElementById('overlay-media');
        const tech = document.getElementById('overlay-tech');

        title.textContent = project.title;
        type.textContent = project.type;
        
        // Show locked or real description
        if (project.passwordProtected && !authenticatedProjects.has(projectId)) {
            description.textContent = project.lockedDescription || project.description;
        } else if (project.passwordProtected && authenticatedProjects.has(projectId)) {
            // Show authenticated description with data protection note
            description.innerHTML = project.description + '<br><br><strong style="color: #b74b4b;">🔒 Data Protection Notice:</strong> ' + 
                (project.authenticatedDescription || 'Thank you for understanding our data protection policies. For privacy and security reasons, no actual data or sensitive information is revealed in this demo. You can view the model performance metrics, architecture overview, and technical implementation details only.');
        } else {
            // For Aspect-Based Sentiment Analysis, show introduction and proposed solution
            if (projectId === '1' && project.introduction) {
                let proposedSolutionHTML = '<p>' + project.introduction + '</p><br><h3 style="color: #b74b4b; margin-top: 1.5rem; margin-bottom: 1rem;">' + (project.proposedSolution || 'Proposed Solution') + '</h3>';
                if (project.proposedSolutionText) {
                    proposedSolutionHTML += '<p>' + project.proposedSolutionText + '</p>';
                }
                if (project.proposedSolutionImage) {
                    proposedSolutionHTML += '<img src="' + project.proposedSolutionImage + '" alt="Proposed Solution" style="max-width: 70%; margin-top: 1.5rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                }
                
                // Data Section
                if (project.dataSection) {
                    proposedSolutionHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.dataSection + '</h3>';
                    if (project.dataDescription) {
                        proposedSolutionHTML += '<p>' + project.dataDescription + '</p>';
                    }
                }
                
                // Model Architecture Section (in the middle)
                if (project.modelArchitecture) {
                    proposedSolutionHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.modelArchitecture + '</h3>';
                    proposedSolutionHTML += '<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem;">';
                    // Add BILTSM methodology
                    proposedSolutionHTML += '<div style="flex: 1; min-width: 300px;">';
                    proposedSolutionHTML += '<h4 style="color: #d4a574; margin-bottom: 0.5rem;">BILTSM Methodology</h4>';
                    proposedSolutionHTML += '<img src="biltsm.jpeg" alt="BILTSM Methodology" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                    proposedSolutionHTML += '</div>';
                    // Add CNN methodology
                    proposedSolutionHTML += '<div style="flex: 1; min-width: 300px;">';
                    proposedSolutionHTML += '<h4 style="color: #d4a574; margin-bottom: 0.5rem;">CNN Methodology</h4>';
                    proposedSolutionHTML += '<img src="CNNMethodology.jpeg" alt="CNN Methodology" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                    proposedSolutionHTML += '</div>';
                    proposedSolutionHTML += '</div>';
                }
                
                // Results Section
                if (project.resultsSection) {
                    proposedSolutionHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.resultsSection + '</h3>';
                    proposedSolutionHTML += '<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem;">';
                    
                    // General Sentiment Confusion Matrix
                    if (project.generalSentimentCM) {
                        proposedSolutionHTML += '<div style="flex: 1; min-width: 300px;">';
                        proposedSolutionHTML += '<h4 style="color: #d4a574; margin-bottom: 0.5rem;">General Sentiment Confusion Matrix</h4>';
                        proposedSolutionHTML += '<img src="' + project.generalSentimentCM + '" alt="General Sentiment Confusion Matrix" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                        proposedSolutionHTML += '</div>';
                    }
                    
                    // Aspect-Based Confusion Matrix
                    if (project.aspectBasedCM) {
                        proposedSolutionHTML += '<div style="flex: 1; min-width: 300px;">';
                        proposedSolutionHTML += '<h4 style="color: #d4a574; margin-bottom: 0.5rem;">Aspect-Based Sentiment Confusion Matrix</h4>';
                        proposedSolutionHTML += '<img src="' + project.aspectBasedCM + '" alt="Aspect-Based Sentiment Confusion Matrix" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                        proposedSolutionHTML += '</div>';
                    }
                    proposedSolutionHTML += '</div>';
                }
                
                // Deployment Section (with app screenshots at the end)
                if (project.deploymentSection) {
                    proposedSolutionHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.deploymentSection + '</h3>';
                    if (project.deploymentDescription) {
                        proposedSolutionHTML += '<p style="margin-bottom: 1.5rem;">' + project.deploymentDescription + '</p>';
                    }
                    if (project.deploymentImages && project.deploymentImages.length > 0) {
                        proposedSolutionHTML += '<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem;">';
                        project.deploymentImages.forEach(img => {
                            proposedSolutionHTML += '<div style="flex: 1; min-width: 300px;">';
                            proposedSolutionHTML += '<img src="' + img + '" alt="Deployment App" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                            proposedSolutionHTML += '</div>';
                        });
                        proposedSolutionHTML += '</div>';
                    }
                }
                
                // Add link at the end
                proposedSolutionHTML += '<p style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255, 255, 255, 0.1);">For more info, use this link: <a href="https://drive.google.com/file/d/1gHgS1aX4DZYtyV70y65ek7kXPIEwseeu/view?usp=share_link" target="_blank" rel="noopener noreferrer" style="color: #b74b4b; text-decoration: underline;">View Project Details</a></p>';
                description.innerHTML = proposedSolutionHTML;
        } else if (projectId === '2' && project.introduction) {
            // For Train Delay Prediction & Chatbot, show structured sections
            let trainHTML = '<p>' + project.introduction + '</p>';
            
            // Data Section
            if (project.dataSection) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.dataSection + '</h3>';
                if (project.dataDescription) {
                    trainHTML += '<p>' + project.dataDescription + '</p>';
                }
            }
            
            // Statistical Analysis Section
            if (project.statisticalAnalysis) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.statisticalAnalysis + '</h3>';
                if (project.statisticalAnalysisText) {
                    trainHTML += '<p>' + project.statisticalAnalysisText + '</p>';
                }
                if (project.statisticalAnalysisImage) {
                    trainHTML += '<img src="' + project.statisticalAnalysisImage + '" alt="Statistical Analysis" style="max-width: 100%; margin-top: 1.5rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                }
            }
            
            // Experiment Section
            if (project.experimentSection) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.experimentSection + '</h3>';
                if (project.experimentDescription) {
                    trainHTML += '<p>' + project.experimentDescription + '</p>';
                }
            }
            
            // Results Section
            if (project.resultsSection) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.resultsSection + '</h3>';
                if (project.resultsImage) {
                    trainHTML += '<img src="' + project.resultsImage + '" alt="Results" style="max-width: 100%; margin-top: 1rem; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                }
            }
            
            // Optimization Section
            if (project.optimizationSection) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.optimizationSection + '</h3>';
                if (project.optimizationDescription) {
                    trainHTML += '<p>' + project.optimizationDescription + '</p>';
                }
                if (project.optimizationImages && project.optimizationImages.length > 0) {
                    trainHTML += '<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin-top: 1rem;">';
                    project.optimizationImages.forEach((img, index) => {
                        // Make opt3 smaller (third image, index 2)
                        const isOpt3 = img.includes('opt3');
                        const flexSize = isOpt3 ? '0.7' : '1';
                        trainHTML += '<div style="flex: ' + flexSize + '; min-width: 300px;">';
                        trainHTML += '<img src="' + img + '" alt="Optimization" style="max-width: 100%; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                        trainHTML += '</div>';
                    });
                    trainHTML += '</div>';
                }
            }
            
            // Model Evaluation Section
            if (project.evaluationSection) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.evaluationSection + '</h3>';
                if (project.evaluationDescription) {
                    trainHTML += '<p>' + project.evaluationDescription + '</p>';
                }
            }
            
            // Live Application Section
            if (project.liveApplication) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.liveApplication + '</h3>';
                if (project.liveApplicationText) {
                    trainHTML += '<p>' + project.liveApplicationText + '</p>';
                }
            }
            
            // Video Section (at the bottom)
            if (project.video) {
                trainHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">Demo Video</h3>';
                trainHTML += '<div style="margin-top: 1rem; margin-bottom: 2rem;"><video src="' + project.video + '" controls style="width: 100%; max-height: 500px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);"></video></div>';
            }
            
            // Project Note Section
            if (project.projectNote) {
                trainHTML += '<p style="margin-top: 2rem; padding: 1.2rem; background-color: rgba(183, 75, 75, 0.1); border-left: 3px solid #b74b4b; border-radius: 4px; font-style: italic; color: rgba(255, 255, 255, 0.9);">' + project.projectNote + '</p>';
            }
            
            description.innerHTML = trainHTML;
        } else if (projectId === '4' && project.introduction) {
            // For Zaina Beauty Booking Platform, show structured sections
            let zainaHTML = '<p>' + project.introduction + '</p>';
            
            // Video Section (at the top)
            if (project.video) {
                zainaHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">Demo Video</h3>';
                zainaHTML += '<div style="margin-top: 1rem; margin-bottom: 2rem;"><video src="' + project.video + '" controls style="width: 100%; max-height: 500px; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);"></video></div>';
            }
            
            // Features Section
            if (project.featuresSection) {
                zainaHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.featuresSection + '</h3>';
                if (project.featuresDescription) {
                    zainaHTML += '<p>' + project.featuresDescription + '</p>';
                }
                if (project.featuresList && project.featuresList.length > 0) {
                    zainaHTML += '<ul style="margin-top: 1rem; padding-left: 1.5rem; line-height: 1.8;">';
                    project.featuresList.forEach(feature => {
                        zainaHTML += '<li style="margin-bottom: 0.8rem;">' + feature + '</li>';
                    });
                    zainaHTML += '</ul>';
                }
            }
            
            // Recommender System Section
            if (project.recommenderSection) {
                zainaHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.recommenderSection + '</h3>';
                if (project.recommenderDescription) {
                    zainaHTML += '<p>' + project.recommenderDescription + '</p>';
                }
                if (project.recommenderList && project.recommenderList.length > 0) {
                    zainaHTML += '<ul style="margin-top: 1rem; padding-left: 1.5rem; line-height: 1.8;">';
                    project.recommenderList.forEach(item => {
                        zainaHTML += '<li style="margin-bottom: 0.8rem;">' + item + '</li>';
                    });
                    zainaHTML += '</ul>';
                }
                if (project.recommenderFuture) {
                    zainaHTML += '<p style="margin-top: 1.5rem;">' + project.recommenderFuture + '</p>';
                }
            }
            
            // Group Booking Section
            if (project.groupBookingSection) {
                zainaHTML += '<br><h3 style="color: #b74b4b; margin-top: 2rem; margin-bottom: 1rem;">' + project.groupBookingSection + '</h3>';
                if (project.groupBookingDescription) {
                    zainaHTML += '<p>' + project.groupBookingDescription + '</p>';
                }
                if (project.groupBookingNote) {
                    zainaHTML += '<p style="margin-top: 1rem; padding: 1rem; background-color: rgba(183, 75, 75, 0.1); border-left: 3px solid #b74b4b; border-radius: 4px;">' + project.groupBookingNote + '</p>';
                }
                if (project.groupBookingImages && project.groupBookingImages.length > 0) {
                    zainaHTML += '<div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem; justify-content: center;">';
                    project.groupBookingImages.forEach(img => {
                        zainaHTML += '<div style="flex: 0 0 auto; width: calc(33.333% - 0.67rem); min-width: 200px; max-width: 300px;">';
                        zainaHTML += '<img src="' + img + '" alt="Group Booking Interface" style="width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);">';
                        zainaHTML += '</div>';
                    });
                    zainaHTML += '</div>';
                }
            }
            
            description.innerHTML = zainaHTML;
        } else {
            description.textContent = project.description;
        }
        }

        // Clear and add media
        media.innerHTML = '';
        // Skip video in media section for projects 2 and 4 - videos are shown in description
        if ((projectId === '2' || projectId === '4') && project.video) {
            // Video is already shown in description section, skip here
        } else if (project.videos && project.videos.length > 0) {
            // Multiple videos - create tabs
            const videoContainer = document.createElement('div');
            videoContainer.style.position = 'relative';
            videoContainer.style.width = '100%';
            
            const videoTabs = document.createElement('div');
            videoTabs.style.display = 'flex';
            videoTabs.style.gap = '10px';
            videoTabs.style.marginBottom = '15px';
            videoTabs.style.justifyContent = 'center';
            
            const videos = [];
            project.videos.forEach((videoSrc, index) => {
                // Create tab button
                const tab = document.createElement('button');
                tab.textContent = index === 0 ? 'Text Caption Demo' : 'Photo Caption Demo';
                tab.style.padding = '8px 16px';
                tab.style.border = 'none';
                tab.style.borderRadius = '20px';
                tab.style.background = index === 0 ? '#b74b4b' : 'rgba(183, 75, 75, 0.3)';
                tab.style.color = 'white';
                tab.style.cursor = 'pointer';
                tab.style.fontSize = '1.3rem';
                tab.style.transition = 'all 0.3s ease';
                
                // Create video element
                const video = document.createElement('video');
                video.src = videoSrc;
                video.controls = true;
                video.controlsList = 'nodownload';
                video.preload = 'metadata';
                video.style.width = '100%';
                video.style.maxHeight = '500px';
                video.style.borderRadius = '8px';
                video.style.display = index === 0 ? 'block' : 'none';
                
                videos.push({ tab, video });
                
                tab.addEventListener('click', function() {
                    // Hide all videos
                    videos.forEach(v => {
                        v.video.style.display = 'none';
                        v.tab.style.background = 'rgba(183, 75, 75, 0.3)';
                    });
                    // Show selected video
                    video.style.display = 'block';
                    tab.style.background = '#b74b4b';
                });
                
                videoTabs.appendChild(tab);
                videoContainer.appendChild(video);
            });
            
            videoContainer.insertBefore(videoTabs, videoContainer.firstChild);
            media.appendChild(videoContainer);
        } else if (project.video && projectId !== '2') {
            const video = document.createElement('video');
            video.src = project.video;
            video.controls = true;
            video.controlsList = 'nodownload';
            video.preload = 'metadata';
            video.style.width = '100%';
            video.style.maxHeight = '500px';
            video.style.borderRadius = '8px';
            // Add error handling for video
            video.onerror = function() {
                const errorMsg = document.createElement('p');
                errorMsg.textContent = 'Video could not be loaded. Please check the file path.';
                errorMsg.style.color = '#f44336';
                errorMsg.style.padding = '2rem';
                media.appendChild(errorMsg);
            };
            media.appendChild(video);
        } else if (project.image) {
            const img = document.createElement('img');
            img.src = project.image;
            img.alt = project.title;
            img.onerror = function() {
                this.style.display = 'none';
            };
            media.appendChild(img);
        }

        // Image gallery section removed - images are now displayed in the description section
        const overlayImages = document.getElementById('overlay-images');
        if (overlayImages) {
            overlayImages.innerHTML = '';
        }

        // Add tech stack
        tech.innerHTML = '<h4>Technologies Used:</h4><ul>';
        project.tech.forEach(techItem => {
            tech.innerHTML += `<li>${techItem}</li>`;
        });
        tech.innerHTML += '</ul>';

        // Add GitHub button to overlay (skip for password protected projects)
        const overlayGithub = document.getElementById('overlay-github');
        if (overlayGithub) {
            overlayGithub.innerHTML = '';
            if (project.github && !project.passwordProtected) {
                const githubLink = document.createElement('a');
                githubLink.href = project.github;
                githubLink.target = '_blank';
                githubLink.rel = 'noopener noreferrer';
                githubLink.innerHTML = '<i class="fab fa-github"></i><span>View Code on GitHub</span><i class="fas fa-external-link-alt"></i>';
                overlayGithub.appendChild(githubLink);
            }
        }

        overlay.style.display = 'flex';
    }

    // Set GitHub URLs for buttons on cards
    const githubButtons = document.querySelectorAll('.github-btn');
    githubButtons.forEach(btn => {
        const projectId = btn.getAttribute('data-project');
        const project = projectsData[projectId];
        if (project && project.github) {
            btn.href = project.github;
        } else {
            btn.classList.add('hidden');
        }
    });

    // Add click handlers to view details buttons - use event delegation
    projectsContainer.addEventListener('click', function(e) {
        // Don't trigger if clicking GitHub button
        if (e.target.closest('.github-btn')) {
            return;
        }
        
        const btn = e.target.closest('.view-details-btn');
        if (!btn) return;
        
        const card = btn.closest('.project-card');
        if (card) {
            e.stopPropagation();
            const projectId = card.getAttribute('data-project');
            showProjectDetails(projectId);
        }
    });

    // Close overlay function (make it global for onclick handler)
    window.closeOverlay = function() {
        document.getElementById('overlay').style.display = 'none';
    };

    // Close overlay when clicking outside
    document.getElementById('overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closeOverlay();
        }
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeOverlay();
        }
    });

    // Contact Form Handling with Formspree (Works with GitHub Pages)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Show loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                if (btnText) btnText.textContent = 'Sending...';
            }

            // Hide previous messages
            if (formMessage) {
                formMessage.style.display = 'none';
                formMessage.classList.remove('success', 'error');
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    if (formMessage) {
                        formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                        formMessage.classList.add('success');
                        formMessage.style.display = 'block';
                    }
                    contactForm.reset();
            } else {
                    const data = await response.json();
                    if (data.errors) {
                        throw new Error(data.errors.map(e => e.message).join(', '));
                    }
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form Error:', error);
                if (formMessage) {
                    formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or email me directly.';
                    formMessage.classList.add('error');
                    formMessage.style.display = 'block';
                }
            } finally {
                // Reset button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    if (btnText) btnText.textContent = 'Send Message';
                }
            }
        });
    }

    // Video Preview Click to Expand
    const videoPreviewContainers = document.querySelectorAll('.video-preview-container');
    const videoModal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');

    // Load video preview frames
    videoPreviewContainers.forEach(container => {
        const isMultiVideo = container.classList.contains('multi-video');
        const videoPreviews = container.querySelectorAll('.video-preview');
        
        if (videoPreviews.length > 0) {
            let currentVideoIndex = 0;
            
            // Handle multiple videos
            if (isMultiVideo && videoPreviews.length > 1) {
                // Set first video as active
                videoPreviews[0].classList.add('active');
                
                // Handle tab switching
                const videoTabs = container.querySelectorAll('.video-tab');
                videoTabs.forEach((tab, index) => {
                    tab.addEventListener('click', function(e) {
                        e.stopPropagation(); // Don't trigger card click
                        
                        // Update active states
                        videoTabs.forEach(t => t.classList.remove('active'));
                        videoPreviews.forEach(v => v.classList.remove('active'));
                        
                        this.classList.add('active');
                        videoPreviews[index].classList.add('active');
                        currentVideoIndex = index;
                    });
                });
            }
            
            // Load all videos
            videoPreviews.forEach((videoPreview, index) => {
                // Force video to load and show first frame
                videoPreview.addEventListener('loadeddata', function() {
                    this.currentTime = 0;
                    this.pause();
                });
                
                videoPreview.addEventListener('loadedmetadata', function() {
                    this.currentTime = 0;
                    this.pause();
                });
                
                videoPreview.load();
                
                setTimeout(() => {
                    if (videoPreview.readyState >= 2) {
                        videoPreview.currentTime = 0;
                        videoPreview.pause();
                    }
                }, 500);
            });
            
            // Handle click to expand
            container.addEventListener('click', function(e) {
                // Don't trigger if clicking tabs
                if (e.target.closest('.video-tab') || e.target.closest('.video-indicator')) {
                    return;
                }
                
                e.stopPropagation(); // Prevent card swipe when clicking video
                
                // Get the currently active video
                const activeVideo = container.querySelector('.video-preview.active') || videoPreviews[0];
                const videoSource = activeVideo.querySelector('source');
                
                if (videoSource) {
                    const videoSrc = videoSource.getAttribute('src');
                    modalVideo.querySelector('source').setAttribute('src', videoSrc);
                    modalVideo.load();
                    videoModal.classList.add('active');
                    modalVideo.play();
                }
            });
        }
    });

    // Close video modal function
    window.closeVideoModal = function() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    };

    // Close video modal when clicking outside
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Close video modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Image Modal Functions
    window.openImageModal = function(src, caption) {
        const imageModal = document.getElementById('image-modal');
        const modalImage = document.getElementById('modal-image');
        const imageCaption = document.getElementById('image-caption');
        
        modalImage.src = src;
        imageCaption.textContent = caption || '';
        imageModal.classList.add('active');
    };

    window.closeImageModal = function() {
        const imageModal = document.getElementById('image-modal');
        imageModal.classList.remove('active');
    };

    // Close image modal when clicking outside or with Escape
    const imageModal = document.getElementById('image-modal');
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const imageModal = document.getElementById('image-modal');
            if (imageModal && imageModal.classList.contains('active')) {
                closeImageModal();
            }
            const galleryModal = document.getElementById('gallery-modal');
            if (galleryModal && galleryModal.classList.contains('active')) {
                closeGalleryModal();
            }
        }
    });

    // Scrollable Gallery Modal Functions
    window.openGalleryModal = function(projectId) {
        const project = projectsData[projectId];
        if (!project || !project.images || project.images.length === 0) return;

        const galleryModal = document.getElementById('gallery-modal');
        const galleryTitle = document.getElementById('gallery-modal-title');
        const galleryScroll = document.getElementById('gallery-scroll');

        galleryTitle.textContent = project.title;
        galleryScroll.innerHTML = '';

        project.images.forEach((imgData) => {
            const img = document.createElement('img');
            const imgSrc = imgData.src;
            const imgAlt = imgData.title || '';
            
            img.src = imgSrc;
            img.alt = imgAlt;
            img.title = imgAlt;
            img.loading = 'lazy';
            img.style.display = 'block';
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.marginRight = '1rem';
            img.style.borderRadius = '8px';
            
            // Hide images that fail to load
            img.onerror = function() {
                this.style.display = 'none';
            };
            
            img.onclick = function() {
                openImageModal(imgSrc, imgAlt);
            };
            
            galleryScroll.appendChild(img);
        });

        galleryModal.classList.add('active');
        // Scroll to start
        galleryScroll.scrollLeft = 0;
        updateGalleryNavButtons();
    };

    window.closeGalleryModal = function() {
        const galleryModal = document.getElementById('gallery-modal');
        galleryModal.classList.remove('active');
    };

    window.scrollGallery = function(direction) {
        const galleryScroll = document.getElementById('gallery-scroll');
        const scrollAmount = 650; // Scroll by image width + gap
        
        if (direction === 'next') {
            galleryScroll.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            galleryScroll.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
        
        // Update nav buttons after scroll
        setTimeout(updateGalleryNavButtons, 300);
    };

    function updateGalleryNavButtons() {
        const galleryScroll = document.getElementById('gallery-scroll');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (!galleryScroll) return;
        
        const isAtStart = galleryScroll.scrollLeft <= 0;
        const isAtEnd = galleryScroll.scrollLeft >= galleryScroll.scrollWidth - galleryScroll.clientWidth - 10;
        
        if (prevBtn) prevBtn.disabled = isAtStart;
        if (nextBtn) nextBtn.disabled = isAtEnd;
    }

    // Update nav buttons on scroll
    const galleryScroll = document.getElementById('gallery-scroll');
    if (galleryScroll) {
        galleryScroll.addEventListener('scroll', updateGalleryNavButtons);
    }

    // Close gallery modal when clicking outside
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }

    // Handle image gallery preview clicks
    const imageGalleryPreviews = document.querySelectorAll('.image-gallery-preview');
    imageGalleryPreviews.forEach(preview => {
        preview.addEventListener('click', function(e) {
            // Don't trigger if clicking buttons
            if (e.target.closest('.project-buttons')) return;
            
            e.stopPropagation(); // Prevent card swipe
            const projectId = this.querySelector('.gallery-preview-img').getAttribute('data-project');
            openGalleryModal(projectId);
        });
    });

    // Password Modal Functions
    let currentPasswordProjectId = null;

    window.openPasswordModal = function(projectId) {
        currentPasswordProjectId = projectId;
        const passwordModal = document.getElementById('password-modal');
        
        passwordModal.classList.add('active');
    };

    window.closePasswordModal = function() {
        const passwordModal = document.getElementById('password-modal');
        passwordModal.classList.remove('active');
        currentPasswordProjectId = null;
    };

    window.checkPassword = function(event) {
        event.preventDefault();
        
        if (!currentPasswordProjectId) return;
        
        const project = projectsData[currentPasswordProjectId];
        const passwordInput = document.getElementById('password-input');
        const passwordError = document.getElementById('password-error');
        const enteredPassword = passwordInput.value;
        
        if (enteredPassword === project.password) {
            // Correct password - grant access
            authenticatedProjects.add(currentPasswordProjectId);
            closePasswordModal();
            showProjectDetails(currentPasswordProjectId);
            } else {
            // Wrong password
            passwordError.textContent = 'Incorrect password. Access denied.';
            passwordInput.value = '';
            passwordInput.focus();
        }
    };

    // Close password modal with Escape key or clicking outside
    const passwordModal = document.getElementById('password-modal');
    if (passwordModal) {
        passwordModal.addEventListener('click', function(e) {
            if (e.target === passwordModal) {
                closePasswordModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const passwordModal = document.getElementById('password-modal');
            if (passwordModal && passwordModal.classList.contains('active')) {
                closePasswordModal();
            }
        }
    });
});
