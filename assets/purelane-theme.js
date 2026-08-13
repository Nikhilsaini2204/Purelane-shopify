/**
 * Purelane Theme JavaScript
 * Handles reveal animations, add to cart, and general interactivity
 */

(function() {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * Reveal on Scroll Animation
   */
  function initRevealOnScroll() {
    const revealElements = document.querySelectorAll('.rv');

    if (!revealElements.length) return;

    if ('IntersectionObserver' in window && !reduceMotion) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '0px 0px -12% 0px',
        threshold: 0.12
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Fallback for browsers without IntersectionObserver or reduced motion
      revealElements.forEach(el => el.classList.add('in'));
    }
  }

  /**
   * Add to Cart Functionality
   */
  function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.purelane-add-to-cart');

    addToCartButtons.forEach(button => {
      button.addEventListener('click', async function(e) {
        e.preventDefault();

        const variantId = this.dataset.variantId;
        if (!variantId) return;

        // Disable button during request
        const originalText = this.textContent;
        this.disabled = true;
        this.textContent = 'Adding...';

        try {
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: variantId,
              quantity: 1
            })
          });

          if (response.ok) {
            this.textContent = 'Added!';

            // Update cart count if element exists
            const cartCount = document.querySelector('.dot');
            if (cartCount) {
              const currentCount = parseInt(cartCount.textContent) || 0;
              cartCount.textContent = currentCount + 1;
            }

            // Trigger custom event for cart drawer, etc.
            document.dispatchEvent(new CustomEvent('cart:updated'));

            setTimeout(() => {
              this.textContent = originalText;
              this.disabled = false;
            }, 2000);
          } else {
            throw new Error('Failed to add to cart');
          }
        } catch (error) {
          console.error('Add to cart error:', error);
          this.textContent = 'Error';
          setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
          }, 2000);
        }
      });
    });
  }

  /**
   * Initialize all functionality
   */
  function init() {
    initRevealOnScroll();
    initAddToCart();
  }

  // Initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on Shopify section events
  document.addEventListener('shopify:section:load', () => {
    initRevealOnScroll();
    initAddToCart();
  });
})();
