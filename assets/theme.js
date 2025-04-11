// Theme JavaScript

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenuToggle) {
      const navLinks = document.querySelector('.nav-links');
      
      mobileMenuToggle.addEventListener('click', function() {
        if (navLinks.style.display === 'flex') {
          navLinks.style.display = 'none';
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        } else {
          navLinks.style.display = 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '100%';
          navLinks.style.left = '0';
          navLinks.style.width = '100%';
          navLinks.style.backgroundColor = '#fff';
          navLinks.style.padding = '20px';
          navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
          navLinks.style.zIndex = '1000';
          mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
        }
      });
    }
    
    // Responsive nav handling
    function handleResponsiveNav() {
      const navLinks = document.querySelector('.nav-links');
      const windowWidth = window.innerWidth;
      
      if (windowWidth > 768 && navLinks) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.width = 'auto';
        navLinks.style.backgroundColor = 'transparent';
        navLinks.style.padding = '0';
        navLinks.style.boxShadow = 'none';
        
        if (mobileMenuToggle) {
          mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
      } else if (windowWidth <= 768 && navLinks && mobileMenuToggle && mobileMenuToggle.querySelector('.fa-times') === null) {
        navLinks.style.display = 'none';
      }
    }
    
    // Call on load
    handleResponsiveNav();
    
    // Call on resize
    window.addEventListener('resize', handleResponsiveNav);
    
    // Product quick add functionality
    const quickAddButtons = document.querySelectorAll('.quick-add');
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get product variant ID (would need to be added to the template)
        const variantId = this.closest('.product-card').dataset.variantId;
        
        if (variantId) {
          // Add to cart functionality - this would use Shopify's AJAX API
          fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: variantId,
              quantity: 1
            })
          })
          .then(response => response.json())
          .then(data => {
            // Show a mini cart or success notification
            alert('Item added to cart!');
            
            // Update cart count
            fetch('/cart.js')
              .then(response => response.json())
              .then(cart => {
                const cartCount = document.querySelector('.cart-count');
                if (cartCount) {
                  cartCount.textContent = cart.item_count;
                }
              });
          })
          .catch(error => {
            console.error('Error adding item to cart:', error);
          });
        }
      });
    });
    
    // Sticky header
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
      
      lastScrollTop = scrollTop;
    });
    
    // Initialize any carousels or sliders here if needed
    // Example if using a library like Swiper.js
    // const productSlider = new Swiper('.product-slider', {
    //   slidesPerView: 1,
    //   spaceBetween: 0,
    //   loop: true,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
    // });
  });