# Setup
1. Create a GitHub OAuth app with the callback set to http://localhost:3000/login/github/callback and create an .env file with DATABASE_URL
```yaml
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
# used by prisma
DATABASE_URL=""
# Prisma CLI automatically loads the DATABASE_URL environment variables from the .env file,so .env will support both Prisma and Next.js
```

2. <code>npx prisma generate</code> to generate prisma client
3. <code>npx prisma db push</code> to migrate database

# todo
1. about this site
2. read later highlight remark and tag(archrive (instapaper or matter))
4. update post to notes
5. home page to memos
6. setting(about me and toggle theme)
7. 沉浸阅读
