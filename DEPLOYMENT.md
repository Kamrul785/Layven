# Layv Fashion Hub - Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
1. GitHub account
2. Vercel account (free tier available)
3. PostgreSQL database (recommended: Vercel Postgres or Neon)

### Step 1: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Set Up PostgreSQL Database

#### Option A: Neon (Recommended - Easiest Setup)
1. Go to [Neon Console](https://console.neon.tech)
2. Sign up with GitHub/Email
3. Create a new project
4. Copy the connection string from the **Connection Details** section
5. Format: `postgresql://user:password@host/database?sslmode=require`
6. Save this for later (you'll need it in Step 3)

**Neon Benefits:**
- Free tier with generous limits (3 projects, 10GB storage)
- No credit card required
- Automatic backups
- Easy to manage

#### Option B: Vercel Postgres (Optional Alternative)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (create one first if needed)
3. Go to the **Storage** tab
4. Click **Create** → Select **Postgres**
5. Choose a region (closest to your users)
6. Click **Create**
7. Copy the **Database URL** shown in the credentials

### Step 3: Deploy to Vercel

#### Via Vercel Dashboard:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   ```
   DATABASE_URL=<your-postgresql-connection-string>
   SESSION_SECRET=<generate-random-secret-key>
   NODE_ENV=production
   ```

5. Click **Deploy**

#### Via Vercel CLI:
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variables
vercel env add DATABASE_URL
vercel env add SESSION_SECRET
vercel env add NODE_ENV

# Deploy to production
vercel --prod
```

### Step 4: Run Database Migrations

After deployment, run migrations:

```bash
# Install dependencies locally with your DATABASE_URL
npm install

# Set your production DATABASE_URL in .env
echo "DATABASE_URL=your-production-db-url" > .env

# Run migrations
npm run db:push
```

### Step 5: Create Admin User

After migrations, create an admin account via the signup endpoint or manually in the database:

```sql
INSERT INTO users (username, password, is_admin)
VALUES ('admin', '$2a$10$HASHED_PASSWORD_HERE', true);
```

Or use the `/register` endpoint with `isAdmin: true` in the payload temporarily.

### Step 6: Test Your Site

Visit your Vercel URL (e.g., `https://your-project.vercel.app`)

1. Test user registration: `/register`
2. Test login: `/login`
3. Test admin login: `/admin/login`
4. Test product browsing: `/shop`
5. Test cart functionality
6. Test checkout

## 🔧 Environment Variables

Required environment variables for production:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=your-long-random-secret-minimum-32-chars
NODE_ENV=production
```

## 📋 Post-Deployment Checklist

- [ ] Database is provisioned and accessible
- [ ] Environment variables are set
- [ ] Migrations have run successfully
- [ ] Admin account is created
- [ ] All pages load correctly
- [ ] Authentication works (login/logout)
- [ ] Product management works (admin)
- [ ] Cart and checkout flow works
- [ ] SSL/HTTPS is enabled (automatic on Vercel)

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- Verify TypeScript compilation: `npm run check`

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check SSL mode is enabled for Neon/Vercel Postgres
- Ensure database allows connections from Vercel IPs

### Session Issues
- Verify `SESSION_SECRET` is set
- Check that cookies are being sent with `credentials: 'include'`

### 404 on Routes
- Verify `vercel.json` is properly configured
- Check that rewrites are working

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

## 📊 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning (automatic)

## 🎉 Done!

Your Layv Fashion Hub is now live! Visit your site and start managing your fashion store.
