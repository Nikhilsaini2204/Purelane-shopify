# AI Workflow Notes - Purelane Shopify Theme

**AI Tool:** Claude (Anthropic) via CLI  
**Project Duration:** ~6 hours

---

## What I Delegated to AI

### 1. Design Token Extraction
**Task:** Parse prototype HTML/CSS and extract all design variables  
**Result:** AI generated CSS custom properties for colors, typography, spacing  
**Time saved:** ~45 minutes (would've been tedious manual work)

### 2. Shopify Section Structure
**Task:** Convert prototype sections to Shopify `.liquid` files with schema  
**Result:** AI generated all 5 sections with proper Theme Editor schema definitions  
**Key value:** AI knows Shopify liquid syntax and schema patterns better than I do  
**Time saved:** ~2 hours

### 3. Edge Case Logic
**Task:** Handle sold-out products, missing images, long titles, empty collections  
**Result:** AI wrote comprehensive conditional logic for all edge cases  
**Example:**
```liquid
{% if product.available == false %}
  <span class="sold-out">Sold out</span>
  <button disabled>Sold out</button>
{% endif %}
```
**Time saved:** ~30 minutes

### 4. Accessibility Implementation
**Task:** Add ARIA labels, focus states, semantic HTML, reduced motion support  
**Result:** AI caught accessibility details I would have missed  
**Time saved:** ~40 minutes + better quality

### 5. Documentation
**Task:** Write implementation summary and deployment guides  
**Result:** AI generated thorough documentation from code review  
**Time saved:** ~1 hour

---

## Where AI Failed / Manual Fixes Required

### 1. Git Commit History ⚠️
**Problem:** AI created one massive commit with all 5,038 lines  
**Why it failed:** AI doesn't understand "reviewable commit history" means showing your process  
**Fix:** Used interactive rebase to split into 13 logical commits  
**Time spent:** 45 minutes  
**Lesson:** Prompt AI to commit incrementally during build, not at the end

### 2. Bundle Pricing Logic ⚠️
**Problem:** AI assumed Shopify has native bundle products (it doesn't)  
**Why it failed:** AI's training data doesn't know which Shopify features actually exist  
**Fix:** Changed approach to make pricing configurable in section settings  
**Time spent:** 30 minutes of decision + implementation  
**Lesson:** Don't trust AI on platform-specific features - verify first

### 3. Theme Editor Compatibility ⚠️
**Problem:** AI initially didn't scope JavaScript to section IDs  
**Why it failed:** AI wrote standard JS, didn't consider Theme Editor reload behavior  
**Fix:** Added section-scoped IDs and lifecycle event handlers  
**Time spent:** 20 minutes  
**Lesson:** AI needs explicit prompts about Shopify-specific requirements

### 4. Animation Timing ⚠️
**Problem:** AI rounded timing to "clean" numbers (4000ms instead of 3800ms)  
**Why it failed:** AI prioritized code readability over exact prototype match  
**Fix:** Extracted exact timing from prototype JavaScript  
**Time spent:** 10 minutes  
**Lesson:** When pixel-accuracy matters, specify "match exact values"

### 5. CSS Specificity Conflicts ⚠️
**Problem:** Glass effects conflicted with Dawn base theme styles  
**Why it failed:** AI generated code in isolation without testing in actual Shopify  
**Fix:** Added more specific selectors, prefixed all classes with `purelane-`  
**Time spent:** 30 minutes of debugging  
**Lesson:** Always test in target environment, not just syntax validation

---

## What I'd Systematize for 20 More Projects

### 1. Pre-flight Checklist
Create standardized setup:
- [ ] Identify all sections (visual inspection + code review)
- [ ] Extract design tokens to spreadsheet first (AI then converts to CSS)
- [ ] List required edge cases upfront
- [ ] Define commit strategy (one commit per section)
- [ ] Verify which platform features exist before prompting AI

### 2. Reusable Snippet Library
Build tested components library:
- Product card (with all edge cases)
- Collection grid
- Image with srcset wrapper
- Glass card wrapper
- Reveal animation wrapper

Each with:
- Inline documentation
- Schema examples
- Edge cases handled

### 3. AI Prompt Templates
**For section conversion:**
```
Convert [section ID] to Shopify liquid:
- Make these fields editable: [list]
- Handle edge cases: sold-out, no image, long title
- Use design tokens from: assets/base.css
- Match this section's schema pattern: [reference]
- Scope JS to: #section-{{ section.id }}
```

**For edge cases:**
```
Add handling for:
- Sold-out: show badge, disable button
- Missing image: use SVG placeholder (provide icon)
- Long title: truncate to 2 lines with ellipsis
- Empty collection: fallback to all products
```

### 4. Commit-as-You-Build Script
Git hook that prompts after N lines changed:
```bash
if [ $lines_changed -gt 300 ]; then
  echo "You've changed 300+ lines. Commit now? (y/n)"
fi
```

### 5. Theme Editor Test Suite
Playwright tests that verify:
- Sections can be added/removed without JS errors
- Animations reinitialize after section reload
- Settings changes update preview in real-time

### 6. Design Token Extraction Tool
CLI tool:
```bash
$ extract-tokens prototype.html
→ Generates tokens.json with colors, typography, spacing
```
Then AI converts to CSS custom properties.

### 7. Automated Theme Check
Pre-commit hook:
```bash
shopify theme check
if [ $? -ne 0 ]; then
  echo "Fix issues before committing"
  exit 1
fi
```

### 8. Performance Budget Enforcement
Lighthouse CI in GitHub Actions:
- LCP < 2.5s or build fails
- CLS < 0.1 or build fails
- Accessibility score 95+ or warning

### 9. Documentation Generator
Auto-generate from code:
```bash
$ generate-docs sections/*.liquid
→ Creates section inventory with:
  - Schema field reference
  - Edge cases handled
  - Required setup
```

### 10. End-to-End Pipeline
Figma → Shopify workflow:
1. Designer exports prototype HTML
2. Script extracts tokens → JSON
3. AI converts sections using tokens + snippet library
4. Auto-runs Theme Check + accessibility audit
5. Creates PR with preview URL

**Estimated time savings:** 60-70% per project (3 days → 1 day)

---

## Key Insights

### What AI Does Best
✅ Schema definitions (repetitive, error-prone for humans)  
✅ Accessibility implementation (catches details I miss)  
✅ Edge case logic (comprehensive)  
✅ Documentation (consistent, thorough)

### What AI Struggles With
❌ Platform-specific limitations (assumes features exist)  
❌ Commit strategy (doesn't understand "reviewable history")  
❌ Production tradeoffs (picks "clean code" over exact specs)  
❌ Testing (generates code but doesn't verify in real environment)

### Best Practices Learned
1. **Prompt incrementally** - One section at a time, not all at once
2. **Provide examples** - After first section works, others follow pattern
3. **Verify assumptions** - Don't trust AI on platform features
4. **Test in production** - Syntax validation ≠ works in Shopify
5. **Human reviews commits** - AI can generate code, human curates history

---

## Time Breakdown

**With AI:**
- Code generation: ~4 hours (AI wrote, I reviewed)
- Manual fixes: ~2 hours (git history, edge cases, testing)
- **Total: ~6 hours**

**Without AI (estimated):**
- Schema definitions: ~3 hours
- Liquid templating: ~4 hours
- CSS extraction: ~2 hours
- Edge cases: ~2 hours
- Documentation: ~2 hours
- **Total: ~13-15 hours**

**Efficiency gain: ~2.5x faster with AI**

---

## Recommendation

**Use AI for:** Execution (code generation, schemas, documentation)  
**Use human for:** Strategy (architecture decisions, commit curation, testing)

The future is **AI writes, human directs and verifies**.
