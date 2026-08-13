# Purelane Shopify Theme - Deployment & Testing Guide

## 🚀 Deploy to Shopify Development Store

### Method 1: Shopify CLI (Recommended)

```bash
# Login to your store
shopify auth logout
shopify theme dev --store purelane-development-ubo2ngbn.myshopify.com

# In a new terminal, push the theme
shopify theme push --store purelane-development-ubo2ngbn.myshopify.com
# Select "Create new unpublished theme" when prompted
# Or select an existing theme to overwrite
```

### Method 2: Shopify CLI with Theme ID

```bash
# List existing themes
shopify theme list --store purelane-development-ubo2ngbn.myshopify.com

# Push to specific theme
shopify theme push --store purelane-development-ubo2ngbn.myshopify.com --theme=THEME_ID
```

### Method 3: ZIP Upload

```bash
# Create a zip file (exclude prototype HTML)
zip -r purelane-theme.zip . -x "purelane-homepage.html" -x ".git/*" -x "*.md"

# Upload via Shopify Admin:
# 1. Go to: Online Store > Themes
# 2. Click "Add theme" > "Upload ZIP file"
# 3. Upload purelane-theme.zip
```

---

## 🧪 Testing Checklist

### Phase 1: Theme Editor Configuration

1. **Hero Section**
   - [ ] Add 3 product slides with real products
   - [ ] Configure pricing (₹200, ₹349, ₹499)
   - [ ] Test autoplay and dot navigation
   - [ ] Verify badges show correctly (desktop + mobile)

2. **Reviews Rail**
   - [ ] Verify 5 review blocks are visible
   - [ ] Test continuous scrolling animation
   - [ ] Check pause on hover works

3. **Shop Section**
   - [ ] Select "All Products" collection or create one
   - [ ] Verify 8 products display
   - [ ] Check "Best seller" badges on first 2 products
   - [ ] Test sold-out badge (Liquid Handwash)
   - [ ] Test missing image placeholder (Ultra-Concentrated product)

4. **Combos Section**
   - [ ] Add 3-5 combo blocks
   - [ ] Assign products to each combo
   - [ ] Test horizontal scrolling
   - [ ] Mark one as hero combo (flag: "Most popular")

5. **Bundles Section**
   - [ ] Verify 3 tier blocks exist
   - [ ] Optionally add product images to tiers
   - [ ] Mark tier 2 as "Best value"

### Phase 2: Edge Case Testing

**Test with 9 Store Products:**

1. ✅ Tap Cleaner & Limescale Remover
2. ✅ Kitchen Cleaner, Foaming
3. ✅ Copper, Bronze & Brass Cleaner
4. ✅ Washing Machine Cleaner & Descaler
5. ✅ Organic Dishwash Liquid Gel
6. ✅ Natural Herbal Floor Cleaner
7. ✅ Non-Toxic Toilet Cleaner
8. ⚠️ Liquid Handwash (0 inventory - must show "Sold out")
9. ⚠️ Ultra-Concentrated Plant-Based Multi-Surface Home Cleaning Solution (no image, long title)

**Expected Behavior:**
- [ ] Liquid Handwash shows "Sold out" badge and disabled button
- [ ] Ultra-Concentrated product shows placeholder image
- [ ] Long title truncates without breaking layout
- [ ] All product prices display correctly
- [ ] Product links work

### Phase 3: Responsive Testing

**Mobile Viewports:**
- [ ] 375px (iPhone SE)
- [ ] 390px (iPhone 12/13)
- [ ] 414px (iPhone Plus)

**Tablet:**
- [ ] 768px (iPad portrait)

**Desktop:**
- [ ] 1024px (small laptop)
- [ ] 1280px (desktop)
- [ ] 1440px+ (large desktop)

**Check:**
- [ ] Hero product stage resizes correctly
- [ ] Badge rail hides on mobile, badge strip shows
- [ ] Product cards stack properly
- [ ] Combo rail scrolls horizontally on mobile
- [ ] Bundle tiers stack on mobile
- [ ] Fonts scale with clamp()
- [ ] Glass effects work on all viewports

### Phase 4: Functionality Testing

**Add to Cart:**
- [ ] Click "Add to cart" on any product card
- [ ] Button shows "Adding..." then "Added!"
- [ ] Cart count increments
- [ ] Button re-enables after 2 seconds

**Animations:**
- [ ] Reveal on scroll works (elements fade in as you scroll)
- [ ] Hero slider auto-advances every 3.8s
- [ ] Hero slider pauses on hover
- [ ] Reviews rail scrolls continuously
- [ ] Reviews rail pauses on hover

**Accessibility:**
- [ ] Tab through all interactive elements
- [ ] Focus states visible
- [ ] Screen reader announces product info
- [ ] Reduced motion respected (test with OS setting)

### Phase 5: Performance Testing

**Lighthouse Audit:**
```bash
# Run in Chrome DevTools
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit for Performance, Accessibility, Best Practices
```

**Expected Scores:**
- Performance: 80+ (depends on Shopify server)
- Accessibility: 95+
- Best Practices: 90+

**Check:**
- [ ] Images load with correct srcset
- [ ] Lazy loading works for below-fold images
- [ ] No layout shift (CLS < 0.1)
- [ ] First Contentful Paint < 2s
- [ ] No console errors

---

## 🐛 Known Issues & Workarounds

### Issue: Google Fonts Warning in Theme Check
**Status:** Expected warning  
**Why:** Using Google Fonts for Outfit + Inter typography  
**Safe to ignore:** Yes, fonts are critical for design

### Issue: Products Not Showing in Shop Section
**Fix:** Go to Theme Editor > Shop Section > Select Collection  
**Alternative:** Leave collection empty to show all products

### Issue: Hero Product Images Not Appearing
**Fix:** Ensure products have featured images uploaded in Shopify admin

### Issue: Combo Products Show Placeholder
**Fix:** Assign actual products to combo blocks in Theme Editor

---

## 📊 Section Settings Reference

### Hero Section Settings
```
Heading: "Clean\nThat\n<span class='lime'>Lasts</span>"
Description: "Homecare that works on the toughest grime..."
Primary CTA: "Shop now" → /collections/all
Secondary CTA: "How it works" → #how
Autoplay: Enabled (3800ms delay)
Blocks: 1-3 product slides
```

### Shop Section Settings
```
Collection: Select from dropdown or leave empty
Products to show: 8
Columns (desktop): 4
Columns (mobile): 2
Show view all: Enabled
```

### Combos Section Settings
```
Blocks: 3-5 combo blocks
Each block:
  - Title: "Kitchen essentials"
  - Product count: 3
  - Products: Select 2-3 products
  - Price: "₹499"
  - Compare price: "₹897"
  - Is hero: Check for featured combo
```

### Bundles Section Settings
```
Blocks: 3 tier blocks
Tier 1: 2 products, ₹349
Tier 2: 3 products, ₹499 (mark as best)
Tier 3: 5 products, ₹799
```

---

## 🔧 Customization Tips

### Change Colors
Edit in `assets/purelane-base.css`:
```css
:root {
  --ink: #f4f0fb;          /* Background */
  --brand: #4b3a8f;        /* Brand teal */
  --accent: #b8701c;       /* Accent orange */
  --surface: #17102b;      /* Headings */
}
```

### Change Typography
Update in `layout/theme.liquid`:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT" rel="stylesheet">
```

Then update in `assets/purelane-base.css`:
```css
body { font-family: 'YourFont', sans-serif; }
.d1, .d2, .d3, .d4 { font-family: 'YourDisplayFont', sans-serif; }
```

### Adjust Animation Speed
Edit section Liquid files:
- Hero autoplay: `autoplay_delay` setting (default: 3800ms)
- Reviews rail: Animation duration in CSS (52s)
- Reveal animations: Transition duration in base.css (0.95s)

---

## 📞 Support & Next Steps

### If Something Doesn't Work:

1. **Check Shopify Theme Check:**
   ```bash
   shopify theme check
   ```

2. **Check Browser Console:**
   Open DevTools (F12) and look for JavaScript errors

3. **Verify Product Data:**
   Ensure products have:
   - Featured images
   - Prices set
   - Inventory (or marked as sold out)

4. **Test in Theme Editor:**
   Changes might need to be saved in Theme Editor first

### Ready for Production?

- [ ] All sections tested and working
- [ ] Products configured correctly
- [ ] Responsive design verified
- [ ] Accessibility tested
- [ ] Performance acceptable
- [ ] Content reviewed by marketing team

**Then:**
```bash
shopify theme publish --theme=THEME_ID
```

---

**Implementation Date:** 2026-08-12  
**Theme Version:** 1.0.0  
**Based on:** Shopify Dawn 16.0.0  
**Sections Implemented:** 5/5 required ✅
