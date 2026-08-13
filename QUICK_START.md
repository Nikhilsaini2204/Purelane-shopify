# Purelane Theme - Quick Start

## 🚀 Deploy in 2 Minutes

### Step 1: Push to Shopify
Run this command in your terminal:

```bash
shopify theme push --store purelane-development-ubo2ngbn.myshopify.com --unpublished
```

When prompted:
- **"Name of the new theme"**: Type `Purelane v1.0` and press Enter
- Wait for upload to complete (~30 seconds)

### Step 2: Open Theme Editor
The command will output a link like:
```
✔ Theme pushed successfully
  Editor URL: https://purelane-development-ubo2ngbn.myshopify.com/admin/themes/XXXXX/editor
```

Click that link or go to: **Online Store > Themes** and click **Customize** on the new theme.

---

## ⚡ Configure Products (5 minutes)

### Hero Section
1. Click "Hero" section in the left sidebar
2. Add 3 **Product slide** blocks:
   - **Slide 1**: Select any product → Set price: `₹200`, Compare price: `₹299`, Savings: `33% off`
   - **Slide 2**: Select any product → Set price: `₹349`, Compare price: `₹597`, Savings: `41% off`
   - **Slide 3**: Select any product → Set price: `₹499`, Compare price: `₹897`, Savings: `44% off`

### Shop Section
1. Click "Shop / product grid" section
2. **Collection**: Select your collection or leave empty (will show all 8 products)
3. Products will auto-display with "Best seller" badges on first 2

### Combos Section
1. Click "Best-selling combos" section
2. Add 3-5 **Combo** blocks:
   - **Block 1**: Title: `Kitchen essentials` → Select 3 products → Price: `₹499`, Compare: `₹897`
   - **Block 2**: Title: `Laundry bundle` → Select 2 products → Price: `₹349`, Compare: `₹598` → Check "Is hero"
   - **Block 3**: Title: `Bathroom refresh` → Select 3 products → Price: `₹499`, Compare: `₹897`

### Bundles Section
Already configured! Just verify the 3 tiers show correctly.

### Reviews Section
Already configured with 5 reviews! Edit if needed.

---

## ✅ Test Checklist

Open the preview link and check:

- [ ] Hero slider auto-advances every 3.8 seconds
- [ ] Hero slider pauses when you hover
- [ ] Reviews rail scrolls continuously
- [ ] Reviews pause on hover
- [ ] Product cards show correct prices
- [ ] "Liquid Handwash" shows "Sold out" badge (if 0 inventory)
- [ ] "Ultra-Concentrated" product shows placeholder (if no image)
- [ ] "Add to cart" buttons work and show "Adding..." → "Added!" states
- [ ] Mobile view (resize to 375px) looks correct
- [ ] All images load properly

---

## 🎯 What's Already Done

✅ All 5 sections built and pixel-accurate to prototype  
✅ Design system extracted to CSS variables  
✅ Reusable product card component  
✅ Theme Editor settings for everything  
✅ Responsive at all breakpoints (375px to 1440px+)  
✅ Animations with reduced-motion support  
✅ Accessibility (keyboard nav, focus states, ARIA)  
✅ Edge cases handled (sold-out, missing images, long titles)  
✅ Add to cart with Shopify Cart API  
✅ Theme Check passed (3 warnings for Google Fonts - expected)  

---

## 📞 Having Issues?

### Products not showing in Hero/Combos?
→ Make sure you've selected products in the Theme Editor blocks

### Collection empty in Shop section?
→ Go to Shopify Admin > Products > Collections and create one, or leave collection setting empty to show all products

### Images not loading?
→ Verify products have featured images uploaded in Shopify Admin > Products

### Theme won't push?
→ Make sure you're logged in: `shopify auth logout` then `shopify auth login`

---

**Total setup time**: ~7 minutes (2 min deploy + 5 min configuration)  
**Status**: Production-ready ✅  
**Date**: 2026-08-12
