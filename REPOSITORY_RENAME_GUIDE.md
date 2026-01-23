# GitHub Repository Rename Guide

## 🌌 Renaming to Yeomniverse

Follow these steps to complete the repository rename:

---

## Step 1: Rename on GitHub (Do this first!)

1. **Go to GitHub Repository**
   - Navigate to: https://github.com/prgmr99/hyo-do-tier

2. **Open Settings**
   - Click "Settings" tab
   - Scroll to "Repository name" section

3. **Change Name**
   - Current: `hyo-do-tier`
   - New: `yeomniverse`
   - Click "Rename"

4. **Confirm**
   - GitHub will show a warning about links breaking
   - Click "I understand, rename this repository"

---

## Step 2: Update Local Git Remote (Already prepared)

After renaming on GitHub, run:

```bash
cd /Users/yeomseungjun/Desktop/workplace/hyo-do-tier

# Update remote URL
git remote set-url origin https://github.com/prgmr99/yeomniverse.git

# Verify
git remote -v

# Should show:
# origin  https://github.com/prgmr99/yeomniverse.git (fetch)
# origin  https://github.com/prgmr99/yeomniverse.git (push)
```

---

## Step 3: Rename Local Directory (Optional but recommended)

```bash
cd /Users/yeomseungjun/Desktop/workplace
mv hyo-do-tier yeomniverse
cd yeomniverse
```

---

## Step 4: Commit Updated Files

Local files have already been updated:
- ✅ `package.json` - name changed to "yeomniverse"
- ✅ `README.md` - rebranded with Yeomniverse
- ✅ Documentation updated

Commit these changes:

```bash
git add .
git commit -m "feat: rebrand to Yeomniverse 🌌

- Rename repository from hyo-do-tier to yeomniverse
- Update package.json root name
- Rebrand README with Yeomniverse theme
- Update all documentation references"

git push origin main
```

---

## Step 5: Update Vercel (Automatic)

Vercel automatically syncs with GitHub:
- ✅ Project name will update automatically
- ✅ Deployments continue working
- ✅ No manual changes needed

---

## ✅ Verification Checklist

After completing all steps:

- [ ] GitHub repository shows "yeomniverse"
- [ ] Local git remote points to new URL
- [ ] Local directory renamed (optional)
- [ ] Changes committed and pushed
- [ ] Vercel project updated automatically
- [ ] All deployments working

---

## 🔗 Updated Links

**Old URLs (will redirect):**
- https://github.com/prgmr99/hyo-do-tier

**New URLs:**
- https://github.com/prgmr99/yeomniverse

**Vercel:**
- Dashboard will show new name automatically
- All deployments continue to work

---

## 🌌 Welcome to Yeomniverse!

Your monorepo is now properly branded and ready for expansion!
