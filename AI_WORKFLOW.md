# AI Workflow Notes - Purelane Shopify Theme

**Project:** Purelane Homepage → Production Shopify Sections  
**Date:** August 2026  
**AI Tool Used:** Claude (Anthropic)

---

## What I Delegated to AI

### 1. **Initial Prototype Analysis & Planning**
- **Task:** Analyze the 148KB prototype HTML file to identify the 5 required sections
- **Outcome:** AI correctly identified and mapped:
  - `section.hero` → Hero section with product slider
  - `#shop` → Shop/product grid section
  - `#combos` → Best-selling combos section
  - `#bundles` → Bundle tier pricing section
  - `#reviews` → Reviews rail section
- **Time saved:** ~30 minutes of manual HTML parsing

### 2. **Design Token Extraction**
- **Task:** Extract color variables, typography scale, spacing system, and glass effects from inline CSS in prototype
- **Outcome:** AI generated `purelane-base.css` with:
  - 17 color variables (`--ink`, `--brand`, `--accent`, etc.)
  - Typography scale (`.d1` through `.d4`, `.lede`, `.kicker`)
  - Spacing system (`--r`, `--r-sm`, `--maxw`)
  - Glass morphism effects with fallbacks
- **Time saved:** ~45 minutes of manual CSS extraction

### 3. **Shopify Liquid Template Generation**
- **Task:** Convert prototype HTML sections into Shopify sections with:
  - Theme Editor schema definitions
  - Dynamic product/collection integration
  - Block architecture for merchant editability
- **Outcome:** AI generated all 5 `.liquid` files with proper:
  - Schema with appropriate input types (product_picker, collection, text, range)
  - Shopify objects (`product`, `collection`, `section.settings`, `block.shopify_attributes`)
  - Proper filters (`| image_url`, `| money`, `| escape`)
- **What worked well:** Schema structure, block patterns, settings organization
- **Time saved:** ~2 hours of Liquid syntax lookup and schema definition

### 4. **Edge Case Handling Logic**
- **Task:** Handle sold-out products, missing images, long titles, empty collections
- **Outcome:** AI generated conditional logic for:
  ```liquid
  {% if product.available == false %}
  {% if product.featured_image %}...{% else %}
  {% if section.settings.collection != blank %}...{% else %}
  ```
- **Time saved:** ~30 minutes of edge case testing and fixes

### 5. **Accessibility Implementation**
- **Task:** Add semantic HTML, focus states, ARIA attributes, keyboard navigation
- **Outcome:** AI correctly implemented:
  - Semantic elements (`<section>`, `<article>`, `<button>`)
  - `:focus-visible` styles
  - `aria-label` on interactive elements
  - `prefers-reduced-motion` media queries
- **Time saved:** ~40 minutes of accessibility audit and fixes

### 6. **Theme Editor Compatibility**
- **Task:** Make sections survive add/remove/reorder in Theme Editor
- **Outcome:** AI implemented:
  - Section-scoped IDs: `#purelane-hero-{{ section.id }}`
  - Lifecycle event listeners: `shopify:section:load`, `shopify:section:unload`
  - Cleanup functions to prevent memory leaks
- **Time saved:** ~1 hour of Theme Editor debugging

### 7. **Performance Optimization**
- **Task:** Implement responsive images, lazy loading, CSS animations
- **Outcome:** AI added:
  - `srcset` with 200w, 400w, 600w variants
  - `loading="lazy"` on below-fold images
  - CSS `@keyframes` instead of JavaScript animation loops
- **Time saved:** ~30 minutes of optimization work

### 8. **Documentation Generation**
- **Task:** Create deployment guides, quick start, and implementation summary
- **Outcome:** AI generated comprehensive docs:
  - `DEPLOYMENT.md` with testing checklist
  - `QUICK_START.md` with 2-minute setup
  - `IMPLEMENTATION_SUMMARY.md` with technical decisions
- **Time saved:** ~1 hour of documentation writing

---

## Where AI Failed / Manual Fixes Required

### 1. **Git Commit History**
- **Issue:** AI initially created a single massive commit instead of logical progression
- **Why it failed:** AI doesn't have intuition for "reviewable" commit history in assignment context
- **Manual fix:** Used interactive rebase (`git rebase -i --root`) to split into 11 logical commits
- **Time spent:** 45 minutes (but AI helped execute the rebase commands)
- **Learning:** Need to prompt AI upfront: "Create commits as you build, not one at the end"

### 2. **Prototype Section Identification**
- **Issue:** Prototype used class names like `.hero`, `#shop` but AI needed explicit confirmation of section boundaries
- **Why it failed:** Prototype had no clear comments marking section boundaries
- **Manual fix:** Manually verified each section in prototype HTML using browser dev tools
- **Time spent:** 15 minutes
- **Learning:** Always do visual inspection of prototype first before delegating

### 3. **Bundle Pricing Logic**
- **Issue:** AI initially tried to use Shopify's native bundle products (which don't exist)
- **Why it failed:** AI assumed Shopify had built-in bundle product types
- **Manual fix:** Decided to make pricing configurable in Theme Editor settings per slide/combo/tier
- **Time spent:** 20 minutes of decision-making + implementation
- **Learning:** AI needs explicit guidance on Shopify's actual feature set

### 4. **CSS Specificity Conflicts**
- **Issue:** Glass effects and reveal animations had specificity conflicts with Dawn base theme
- **Why it failed:** AI didn't account for Dawn's existing CSS
- **Manual fix:** Added more specific selectors and scoped styles to `.purelane-*` classes
- **Time spent:** 30 minutes of debugging
- **Learning:** Need to test in actual Shopify environment, not just verify syntax

### 5. **Theme Check Warnings**
- **Issue:** Google Fonts triggered RemoteAsset warnings in Shopify Theme Check
- **Why it failed:** AI prioritized design accuracy over Shopify's CDN preferences
- **Manual fix:** Acknowledged as acceptable tradeoff (fonts are critical for design)
- **Time spent:** 10 minutes
- **Learning:** Some warnings are acceptable if justified; AI needs context on tradeoffs

### 6. **Animation Timing**
- **Issue:** Hero autoplay timing didn't match prototype exactly (AI used 4000ms vs 3800ms)
- **Why it failed:** AI rounded to "clean" numbers
- **Manual fix:** Extracted exact timing from prototype's JavaScript
- **Time spent:** 10 minutes
- **Learning:** "Pixel-accurate" means exact timing too; specify this explicitly

### 7. **Product Card Metafields**
- **Issue:** AI added ratings code using `product.metafields.reviews.rating` but didn't document metafield definitions
- **Why it failed:** AI assumed common metafield patterns without checking if they're defined
- **Manual fix:** Need to either document the metafield or remove the code
- **Time spent:** Pending decision
- **Learning:** Always ask AI: "Does this require setup? Document it."

---

## What I'd Systematize for 20 More Projects

### 1. **Pre-flight Checklist Template**
Create a standardized checklist before starting:
```markdown
- [ ] Identify all sections in prototype (visual + code review)
- [ ] List all required edge cases (sold-out, missing images, etc.)
- [ ] Extract design tokens to spreadsheet first
- [ ] Check if Shopify native features exist (don't reinvent)
- [ ] Define commit strategy upfront (feature branches? logical commits?)
- [ ] Set up Theme Check in CI/CD
```

### 2. **Design Token Extraction Script**
Build a tool to parse prototype HTML/CSS and output:
```json
{
  "colors": { "ink": "#f4f0fb", "brand": "#4b3a8f" },
  "typography": { "d1": "clamp(48px, 8.6vw, 112px)" },
  "spacing": { "r": "26px", "r-sm": "16px" }
}
```
Then auto-generate CSS custom properties file.

### 3. **Reusable Snippet Library**
Create a library of pre-built, tested snippets:
- `product-card.liquid` (with all edge cases)
- `collection-grid.liquid`
- `image-with-srcset.liquid` (responsive images done right)
- `glass-card.liquid` (glass morphism wrapper)
- `reveal-animation.liquid` (intersection observer wrapper)

Each snippet with:
- Inline documentation
- Schema examples
- Edge case handling
- Accessibility baked in

### 4. **Section Schema Generator**
Build a CLI tool:
```bash
$ generate-section --name "hero" --has-blocks --has-settings
```
Outputs:
- Section Liquid file with schema boilerplate
- CSS file with base structure
- JavaScript file with Theme Editor lifecycle hooks
- Documentation stub

### 5. **Automated Theme Check in Git Hooks**
Add pre-commit hook:
```bash
#!/bin/bash
shopify theme check
if [ $? -ne 0 ]; then
  echo "Theme check failed. Fix issues before committing."
  exit 1
fi
```

### 6. **AI Prompting Templates**
Create prompt library for common tasks:

**Template: Section Conversion**
```
Convert this prototype section to Shopify:
- Section ID: [#id or .class]
- Make merchant-editable: [list fields]
- Edge cases to handle: [list]
- Accessibility requirements: [list]
- Use design tokens from: [file path]
- Match this section's pattern: [reference section]
```

**Template: Edge Case Handling**
```
Add edge case handling for:
- Sold-out: [expected behavior]
- Missing image: [show placeholder or hide?]
- Empty collection: [fallback to all products or show message?]
- Very long title: [truncate to X chars with ellipsis]
```

### 7. **Testing Checklist Automation**
Create a Playwright/Cypress test suite that runs:
- [ ] All sections render without console errors
- [ ] Add to cart works (mock Shopify API)
- [ ] Theme Editor load/unload doesn't break animations
- [ ] Responsive breakpoints match prototype
- [ ] Accessibility audit passes (axe-core)
- [ ] Performance budgets met (LCP < 2.5s, CLS < 0.1)

### 8. **Documentation Generator**
Auto-generate docs from code:
```bash
$ generate-docs --sections sections/*.liquid
```
Outputs:
- Section inventory with screenshots
- Schema field reference
- Edge cases handled
- Required metafields (if any)
- Performance metrics

### 9. **Commit Strategy Enforcer**
Git hook that checks:
- Max lines per commit (e.g., 500)
- Commit message format (conventional commits)
- No giant commits at project end

Fails if:
```bash
if [ $lines_changed -gt 500 ]; then
  echo "Commit too large. Break into smaller commits."
  exit 1
fi
```

### 10. **Design-to-Shopify Workflow Pipeline**
End-to-end automation:
1. Designer exports Figma → HTML prototype
2. Script extracts design tokens → `tokens.json`
3. AI converts sections using token file + snippet library
4. Auto-generates test suite from section schema
5. Runs Theme Check + accessibility audit
6. Creates PR with: code + docs + test results + preview URL

**Time saved per project:** ~60-70% (from 2-3 days to 8-10 hours)

---

## AI Tools & Workflow Used

### Primary Tool
- **Claude (Anthropic)** via CLI
- Model: Claude Opus 5
- Used for: Code generation, refactoring, documentation, debugging

### Workflow Pattern
1. **Planning phase:** AI analyzed prototype, suggested architecture
2. **Implementation phase:** AI generated code, I reviewed and tested
3. **Iteration phase:** I reported bugs/issues, AI fixed them
4. **Polish phase:** AI added accessibility, performance, docs

### Prompting Strategy
- **Incremental:** One section at a time, not all at once
- **Context-rich:** Always provided prototype HTML, existing code, Shopify docs
- **Specific:** "Match this exact timing: 3800ms" not "make it smooth"
- **Verification-focused:** "Show me the commit diff before applying"

### What Worked Best
- Breaking work into section-sized chunks
- Providing reference implementation (after first section, others followed pattern)
- Asking AI to explain tradeoffs before implementing
- Using AI for schema definitions (repetitive, error-prone)

### What Didn't Work
- Asking AI to "build everything" in one go (too big, missed details)
- Assuming AI knows Shopify limitations (needs explicit guidance)
- Trusting AI's commit strategy (needs human oversight for "story")

---

## Metrics

### Time Breakdown
- **Total project time:** ~6 hours
- **Time with AI assistance:** ~6 hours
- **Time on manual fixes/decisions:** ~2 hours
- **Estimated time without AI:** ~16-18 hours

### Efficiency Gains
- **Code generation:** 70% faster with AI
- **Schema definitions:** 90% faster with AI (most repetitive task)
- **Documentation:** 80% faster with AI
- **Debugging:** 40% faster with AI (still needed manual testing)

### Quality Metrics
- **Theme Check:** Passed (3 acceptable warnings)
- **Accessibility:** 100% keyboard navigable, semantic HTML, ARIA labels
- **Performance:** Responsive images, lazy loading, CSS animations
- **Merchant-editable:** 100% of content configurable in Theme Editor

---

## Recommendations for Future Projects

### Do More Of
1. ✅ Use AI for schema definitions (huge time saver)
2. ✅ Use AI for documentation (consistent, thorough)
3. ✅ Use AI for edge case logic (comprehensive)
4. ✅ Use AI for accessibility implementation (catches details I miss)

### Do Less Of
1. ❌ Trusting AI for git strategy (needs human judgment)
2. ❌ Assuming AI knows platform limitations (verify first)
3. ❌ Accepting first solution (iterate for better approaches)

### Always Verify
1. ⚠️ Test in actual Shopify store (not just syntax)
2. ⚠️ Review commit history before pushing
3. ⚠️ Check accessibility with real screen reader
4. ⚠️ Run Theme Check before considering "done"

---

**Bottom line:** AI accelerated this project by ~3x, but human judgment was critical for:
- Architecture decisions (how to handle bundle pricing)
- Quality control (commit history, edge case testing)
- Shopify-specific knowledge (metafields, Theme Editor, liquid patterns)

The future workflow is **AI for execution, human for strategy and verification.**
