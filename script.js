// ========================================
// adai鸭 - 温暖日用百货官网
// 交互逻辑 & 动画效果
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 加载动画 =====
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }, 2500);
    
    // ===== 粒子背景系统 =====
    initParticles();
    
    // ===== 导航栏滚动效果 =====
    initNavbar();
    
    // ===== 移动端菜单 =====
    initMobileMenu();
    
    // ===== 平滑滚动 =====
    initSmoothScroll();
    
    // ===== 滚动动画 =====
    initScrollAnimations();
    
    // ===== 数字计数动画 =====
    initCountUp();
    
    // ===== 产品筛选 =====
    initProductFilter();
    
    // ===== 评价轮播 =====
    initTestimonialSlider();
    
    // ===== 返回顶部 =====
    initBackToTop();
    
    // ===== 联系表单 =====
    initContactForm();
    
    // ===== 当前页面高亮 =====
    initActiveNav();
    
});

// ===== 粒子背景 =====
function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 4 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.color = ['#FF8C69', '#FFD166', '#FFB088', '#06D6A0'][Math.floor(Math.random() * 4)];
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    // 创建粒子
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#FF8C69';
                    ctx.globalAlpha = 0.05 * (1 - distance / 150);
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    // 鼠标交互
    let mouse = { x: null, y: null };
    
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.x;
        mouse.y = e.y;
        
        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.speedX += dx * 0.001;
                particle.speedY += dy * 0.001;
            }
        });
    });
}

// ===== 导航栏 =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== 移动端菜单 =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });
    
    // 点击链接关闭菜单
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });
    
    // 点击外部关闭
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        }
    });
}

// ===== 平滑滚动 =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 滚动动画 =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-up');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(function(el) {
        observer.observe(el);
    });
}

// ===== 数字计数动画 =====
function initCountUp() {
    const numbers = document.querySelectorAll('.stat-number');
    if (!numbers.length) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    numbers.forEach(function(num) {
        observer.observe(num);
    });
}

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // easeOutExpo 缓动函数
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(eased * target);
        
        element.textContent = current + (target >= 100 ? '+' : '+');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + '+';
        }
    }
    
    update();
}

// ===== 产品筛选 =====
function initProductFilter() {
    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.product-card');
    
    tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // 更新激活状态
            tabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            cards.forEach(function(card) {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== 评价轮播 =====
function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.dot');
    if (!track || !dots.length) return;
    
    let currentIndex = 0;
    const totalSlides = 3;
    
    function goToSlide(index) {
        currentIndex = index;
        const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 30;
        track.style.transform = 'translateX(-' + (cardWidth * currentIndex) + 'px)';
        
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    dots.forEach(function(dot, index) {
        dot.addEventListener('click', function() {
            goToSlide(index);
        });
    });
    
    // 自动轮播
    setInterval(function() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }, 5000);
}

// ===== 返回顶部 =====
function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });
    
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== 联系表单 =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // 模拟提交
        const btn = form.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = '发送中...';
        btn.disabled = true;
        
        setTimeout(function() {
            btn.textContent = '✓ 发送成功！';
            btn.style.background = 'linear-gradient(135deg, #06D6A0, #04b890)';
            
            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// ===== 当前页面高亮 =====
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== 产品卡片点击效果 =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-product')) {
        const card = e.target.closest('.product-card');
        if (card) {
            // 添加涟漪效果
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: fixed;
                border-radius: 50%;
                background: rgba(255, 140, 105, 0.3);
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out forwards;
                z-index: 9999;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.left + rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.top + rect.height / 2 - size / 2) + 'px';
            
            document.body.appendChild(ripple);
            
            setTimeout(function() {
                ripple.remove();
            }, 600);
            
            // 显示提示
            showNotification('产品详情功能开发中，敬请期待！');
        }
    }
});

// ===== 通知提示 =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: linear-gradient(135deg, #FF8C69, #FFB088);
        color: white;
        padding: 16px 32px;
        border-radius: 50px;
        box-shadow: 0 10px 40px rgba(255, 140, 105, 0.4);
        font-size: 15px;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 2500);
}

// ===== 添加涟漪动画样式 =====
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== 触摸滑动支持（移动端轮播） =====
(function() {
    const track = document.getElementById('testimonialTrack');
    if (!track) return;
    
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            const dots = document.querySelectorAll('.dot');
            let currentIndex = Array.from(dots).findIndex(function(d) {
                return d.classList.contains('active');
            });
            
            if (diff > 0 && currentIndex < dots.length - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            
            dots[currentIndex].click();
        }
        
        isDragging = false;
    }, { passive: true });
})();

// ===== 产品卡片3D倾斜效果 =====
(function() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
})();

// ===== 性能优化：减少非可视区域的动画 =====
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(function(img) {
        imageObserver.observe(img);
    });
}
