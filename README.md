# Extrade - Investment Platform

A Node.js-based investment platform with MLM features, built with Express.js and MySQL.

## Features

- User authentication and authorization
- Investment plan management
- Referral system
- ROI tracking and distribution
- Admin panel
- Withdrawal system
- Email notifications

## Vercel Deployment

### Prerequisites

1. **Database**: Set up a cloud MySQL database (e.g., PlanetScale, AWS RDS, or DigitalOcean)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)

### Deployment Steps

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - Go to your project settings
   - Add the following environment variables:
     ```
     DB_HOST=your-mysql-host.com
     DB_USER=your-mysql-username
     DB_PASSWORD=your-mysql-password
     DB_NAME=your-database-name
     TOKEN_NAME=your-token-name
     JWT_SECRET=your-jwt-secret-key
     COOKIE_SECRET=your-cookie-secret
     CRON_SECRET=your-cron-secret-key
     NODE_ENV=production
     ```

### Important Notes

1. **Cron Jobs**: Vercel doesn't support persistent cron jobs. Use external services like:
   - [cron-job.org](https://cron-job.org)
   - [EasyCron](https://www.easycron.com)
   - Set up a webhook to call `/api/cron` endpoint

2. **File Uploads**: File uploads are limited in Vercel. Consider using:
   - Cloudinary
   - AWS S3
   - Other cloud storage services

3. **Database**: Ensure your MySQL database allows external connections and has SSL enabled.

### Local Development

1. **Install dependencies**:
   ```bash
   cd extrade
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your local database credentials
   ```

3. **Run the application**:
   ```bash
   npm run dev
   ```

## Project Structure

```
extrade/
├── app.js                 # Main application entry point
├── models/db.js          # Database connection
├── routes/               # Route definitions
├── controller/           # Business logic
├── views/               # EJS templates
├── public/              # Static assets
├── middleware/          # Custom middleware
├── helpers/             # Utility functions
├── jobs/                # Scheduled tasks
└── api/                 # Vercel serverless functions
```

## License

This project is private and proprietary.
