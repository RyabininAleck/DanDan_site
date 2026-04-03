// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-answer').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.faq-question').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            answer.classList.add('active');
            question.classList.add('active');
        }
    });
});

// Calculator
function calculateRevenue() {
    const avgCheck = parseFloat(document.getElementById('avgCheck').value) || 50000;
    const visitors = parseFloat(document.getElementById('visitors').value) || 50000;
    const orders = parseFloat(document.getElementById('orders').value) || 245;
    
    // Calculate abandoned carts (0.21% of visitors)
    const abandonedCarts = visitors * 0.0021;
    
    // 15% of abandoned carts convert
    const convertedCarts = abandonedCarts * 0.15;
    
    // Calculate returned customers (35% of orders)
    const returnedCustomers = orders * 0.35;
    
    // Calculate leads (assuming 335 leads per month)
    const leadsConverted = 5; // 5 orders from leads
    
    // Total additional revenue
    const monthlyRevenue = (convertedCarts * avgCheck) + (returnedCustomers * avgCheck) + (leadsConverted * avgCheck);
    const yearlyRevenue = monthlyRevenue * 12;
    
    // Update display
    document.getElementById('monthlyRevenue').textContent = formatCurrency(monthlyRevenue);
    document.getElementById('yearlyRevenue').textContent = formatCurrency(yearlyRevenue);
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0
    }).format(amount);
}

// Add event listeners to calculator inputs
document.getElementById('avgCheck').addEventListener('input', calculateRevenue);
document.getElementById('visitors').addEventListener('input', calculateRevenue);
document.getElementById('orders').addEventListener('input', calculateRevenue);

// Initial calculation
calculateRevenue();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const website = document.getElementById('website').value;
    const consent = document.getElementById('consent').checked;
    
    if (!phone || !website || !consent) {
        alert('Пожалуйста, заполните все обязательные поля и дайте согласие на обработку персональных данных');
        return;
    }
    
    // Show success message
    alert('Заявка отправлена! Наш менеджер свяжется с вами в ближайшее время.');
    
    // Reset form
    document.getElementById('contactForm').reset();
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.feature-card, .step, .result-card, .pricing-card, .partner-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
