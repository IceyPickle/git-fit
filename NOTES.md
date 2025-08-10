## Git Command Cheat Sheet

```bash
# 1. Check current status
git status

# 2. Add files to staging (prepare to commit)
git add .

#  OR add a specific file
git add path/to/file

# 3. Commit your changes with a message
git commit -m "Brief but clear message about your changes"

# 4. Push commits to GitHub
git push

#  OR first time pushing main branch
git push -u origin main

# 5. Create a new branch
git checkout -b new-branch-name

# 6. Switch branches
git checkout branch-name

# 7. Fetch and pull updates from GitHub
git fetch
git pull

# 8. View commit history
git log
