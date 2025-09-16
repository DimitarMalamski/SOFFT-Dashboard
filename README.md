# Team Git Strategy — main · develop · feature

## Branch roles

| Branch      | Purpose                                                      |
| ----------- | ------------------------------------------------------------ |
| `main`      | Production-ready code; auto-deploy if you have it            |
| `develop`   | Temporary **staging/integration** to batch multiple features |
| `feature/*` | Short-lived branches for tasks/features                      |

> We usually merge **feature → main** directly. Use `develop` only when we need a shared staging branch to test multiple features together.

---

## How it works

### A) Normal flow

```bash
# branch from main
git switch -c feature/<scope> main

# work…
git add -A
git commit -m "feature(<scope>)"
git push -u origin feature/<scope>

# Open a Merge Request (MR): feature/<scope> → main
```

### B) Staging flow

## We use this only when developing multiple features together, it means that we push to develop, everything then gets tested and should be a close to release version

```bash
# create/refresh develop from main
git switch main && git pull
git switch -c develop || git switch develop
git merge --ff-only main
git push

# teammates open MRs: feature/* → develop (test on staging)

# when ready to release:
# MR: develop → main (Squash & merge)
# (optional) keep develop aligned:
git switch develop
git fetch origin && git merge --ff-only origin/main && git push
```

---

## Branch naming

- Features: `feature/<scope>` → `feature/search-filters`, `feature/login-ui`

---

## Merge Requests (MRs)

- Every change goes through a **Merge Request**.

---

## GitLab setup (one-time)

2. **Protected branches**

   - `main`: **MRs only**
   - `develop`: **MRs only**
   - Leave `feature/*` unprotected.

3. **Default branch**
   - Keep **`main`** as the default (so new branches/MRs target it by default).

---

## Conflict handling

### Let's try and work on one feature per person, if it is a big feature of the app -> break it down -> push to 'develop' and then if all goes well -> merge to main

```bash
# update your feature branch with latest main (or develop if targeting it)
git fetch origin
git merge origin/main     # or origin/develop
# resolve → commit → push
```

---

## Team agreements

- `main` is always green and deployable.
- Prefer **feature → main**. Use `develop` only when we need shared staging.
- Small MRs and fast reviews
- **Keep `.gitignore` tidy (NO !!!`node_modules`!!!).**

---
