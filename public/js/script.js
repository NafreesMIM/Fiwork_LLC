document.addEventListener('DOMContentLoaded', function() {
    // Chatbot functionality
    const chatBtn = document.getElementById('start-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    
    // Portfolio data
    const portfolioData = [
        { image: 'images/Infinity Fitness.jpeg', title: 'Fitness Center' },
        { image: 'images/Fashion Brand.jpeg', title: 'Fashion Brand' },
        { image: 'images/Real Estate.jpeg', title: 'Real Estate' },
        { image: 'images/Consulting Firm.jpeg', title: 'Consulting Firm' }
    ];

    // Initialize portfolio
    initPortfolio();

    // Toggle chatbot visibility
    chatBtn.addEventListener('click', function() {
        chatbotContainer.classList.toggle('hidden');
        chatbotContainer.classList.toggle('visible');
        if (chatbotContainer.classList.contains('visible')) {
            userInput.focus();
        }
    });
    
    closeChatBtn.addEventListener('click', function() {
        chatbotContainer.classList.remove('visible');
        chatbotContainer.classList.add('hidden');
    });
    
    // Handle sending messages
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addUserMessage(message);
            userInput.value = '';
            setTimeout(() => {
                generateBotResponse(message);
            }, 500);
        }
    }
    
    sendBtn.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = `
            <img src="images/fiwork-logo.png" alt="Fiwork Bot" class="bot-avatar">
            <div class="message-content">
                <p>${message}</p>
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Enhanced Q&A Database with updated pricing
    const qaDatabase = {
        greeting: {
            question: /hello|hi|hey/i,
            answer: "Hello! I'm Fiwork Design Assistant. How can I help you with your logo design today?"
        },
        pricing: {
            question: /price|cost|how much|packages|options/i,
            answer: `We offer 5 packages: 
            <br>1. <strong>Basic ($150)</strong>: 3 concepts, 5 revisions
            <br>2. <strong>Standard ($300)</strong>: 5 concepts, 10 revisions
            <br>3. <strong>Business ($500)</strong>: 7 concepts, 15 revisions
            <br>4. <strong>Premium ($750)</strong>: Unlimited concepts & revisions
            <br>5. <strong>Full Branding ($750)</strong>: Complete branding solution
            <br>Which package are you interested in?`
        },
        process: {
            question: /process|how it works|procedure/i,
            answer: `Our 4-step process:
            <br>1. Share your requirements
            <br>2. Receive initial concepts
            <br>3. Provide feedback
            <br>4. Get final files
            <br>Ready to get started?`
        },
        files: {
            question: /file|format|deliver|what i get|receive/i,
            answer: `File formats by package:
            <br>Basic: PNG, JPG
            <br>Standard: + EPS, PDF
            <br>Business: + AI/PSD
            <br>Premium: + Social Kit, Stationery Designs
            <br>Full Branding: Everything including Brand Guidelines, Packaging, etc.
            <br>Need specific formats?`
        },
        payment: {
            question: /pay|payment|checkout|order|purchase/i,
            answer: "We accept cards. When you're ready, I'll guide you through checkout!" 
        },
        revision: {
            question: /revision|change|edit|modify|adjust/i,
            answer: `Revision limits:
            <br>Basic: 5 revisions
            <br>Standard: 10 revisions
            <br>Business: 15 revisions
            <br>Premium: Unlimited
            <br>Full Branding: Unlimited
            <br>Which package suits you?`
        },
        delivery: {
            question: /time|delivery|how long|duration|process time/i,
            answer: `Delivery timeline:
            <br>All packages: 3-7 days process time
            <br>Premium & Full Branding: Priority processing
            <br>Need something faster? Let me know!`
        }
    };

    // Package-specific thank you responses
    const packageResponses = {
        basic: {
            question: /basic|150|one fifty/i,
            answer: `Thank you so much for choosing to work with me! To get started on your order, please complete the payment using the link below:
            <br>- <strong>Basic</strong>: <a href="https://tinyurl.com/3s95u33w" target="_blank">Pay Now</a>
            <br><br>Once your payment is complete, please email a screenshot of the transaction with the following details:
            <br>✨ Brand Name:<br>✨ Slogan (if any):<br>✨ Brief Description of Design:<br>✨ Preferred Colors (if any):<br>✨ Industry:<br>✨ First Name:<br>✨ Last Name:<br>✨ Country:<br>✨ State:
            <br><br>I'll get started on your project right away! Feel free to reach out if you have any questions. 😊`
        },
        standard: {
            question: /standard|300|three hundred/i,
            answer: `Thank you so much for choosing to work with me! To get started on your order, please complete the payment using the link below:
            <br>- <strong>Standard</strong>: <a href="https://tinyurl.com/4euet7f3" target="_blank">Pay Now</a>
            <br><br>Once your payment is complete, please email a screenshot of the transaction with the following details:
            <br>✨ Brand Name:<br>✨ Slogan (if any):<br>✨ Brief Description of Design:<br>✨ Preferred Colors (if any):<br>✨ Industry:<br>✨ First Name:<br>✨ Last Name:<br>✨ Country:<br>✨ State:
            <br><br>I'll get started on your project right away! Feel free to reach out if you have any questions. 😊`
        },
        business: {
            question: /business|500|five hundred/i,
            answer: `Thank you so much for choosing to work with me! To get started on your order, please complete the payment using the link below:
            <br>- <strong>Business</strong>: <a href="https://tinyurl.com/bddmksee" target="_blank">Pay Now</a>
            <br><br>Once your payment is complete, please email a screenshot of the transaction with the following details:
            <br>✨ Brand Name:<br>✨ Slogan (if any):<br>✨ Brief Description of Design:<br>✨ Preferred Colors (if any):<br>✨ Industry:<br>✨ First Name:<br>✨ Last Name:<br>✨ Country:<br>✨ State:
            <br><br>I'll get started on your project right away! Feel free to reach out if you have any questions. 😊`
        },
        premium: {
            question: /premium|750|seven fifty|unlimited/i,
            answer: `Thank you so much for choosing to work with me! To get started on your order, please complete the payment using the link below:
            <br>- <strong>Premium</strong>: <a href="https://tinyurl.com/y4bd2ztx" target="_blank">Pay Now</a>
            <br><br>Once your payment is complete, please email a screenshot of the transaction with the following details:
            <br>✨ Brand Name:<br>✨ Slogan (if any):<br>✨ Brief Description of Design:<br>✨ Preferred Colors (if any):<br>✨ Industry:<br>✨ First Name:<br>✨ Last Name:<br>✨ Country:<br>✨ State:
            <br><br>I'll get started on your project right away! Feel free to reach out if you have any questions. 😊`
        },
        fullBranding: {
            question: /full branding|complete branding|branding solution|everything/i,
            answer: `Thank you so much for choosing to work with me! To get started on your order, please complete the payment using the link below:
            <br>- <strong>Full Branding</strong>: <a href="#" target="_blank">Pay Now</a>
            <br><br>Once your payment is complete, please email a screenshot of the transaction with the following details:
            <br>✨ Brand Name:<br>✨ Slogan (if any):<br>✨ Brief Description of Design:<br>✨ Preferred Colors (if any):<br>✨ Industry:<br>✨ First Name:<br>✨ Last Name:<br>✨ Country:<br>✨ State:
            <br><br>I'll get started on your project right away! Feel free to reach out if you have any questions. 😊`
        }
    };

    function generateBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();
        let response = '';

        // First check package-specific selection
        for (const [key, value] of Object.entries(packageResponses)) {
            if (value.question.test(userMessage)) {
                response = value.answer;
                break;
            }
        }

        // If not a package, check general QA
        if (!response) {
            for (const [key, value] of Object.entries(qaDatabase)) {
                if (value.question.test(userMessage)) {
                    response = value.answer;
                    break;
                }
            }
        }

        // Default fallback
        if (!response) {
            response = `I can help with:
            <br>- Pricing & packages (Basic, Standard, Business, Premium, Full Branding)
            <br>- Design process
            <br>- File formats
            <br>- Revision policies
            <br>- Payment options
            <br>What would you like to know?`;
        }

        // Typing indicator logic
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'bot-message';
        typingIndicator.innerHTML = `
            <img src="images/fiwork-logo.png" alt="Fiwork Bot" class="bot-avatar">
            <div class="message-content">
                <p class="typing-indicator"><span>.</span><span>.</span><span>.</span></p>
            </div>
        `;
        chatMessages.appendChild(typingIndicator);
        scrollToBottom();

        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            addBotMessage(response);
        }, 1500);
    }

     function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }

    // Function to handle scroll animations
    function handleScrollAnimations() {
        const serviceCards = document.querySelectorAll('.service-card');
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        serviceCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            } else {
                card.classList.remove('animate');
            }
        });
        
        pricingCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('animate');
            } else {
                card.classList.remove('animate');
            }
        });
    }

    // Initial check on load
    handleScrollAnimations();

    // Throttle scroll events for performance
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            handleScrollAnimations();
        }, 50);
    }, false);
    
    function initPortfolio() {
        const portfolioGrid = document.getElementById('portfolio-grid');
        
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const formMessage = document.getElementById('form-message');
            const formData = new FormData(this);
            
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Object.fromEntries(formData))
                });
                
                const data = await response.json();
                
                if (data.success) {
                    formMessage.textContent = 'Thank you! Your message has been sent.';
                    formMessage.className = 'form-message success';
                    this.reset();
                } else {
                    formMessage.textContent = 'Error: ' + data.message;
                    formMessage.className = 'form-message error';
                }
            } catch (error) {
                formMessage.textContent = 'Error sending message. Please try again later.';
                formMessage.className = 'form-message error';
                console.error('Error:', error);
            }
        });
    }
    
    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    chatbotContainer.classList.remove('visible');
                    chatbotContainer.classList.add('hidden');
                }
            }
        });
    });
});