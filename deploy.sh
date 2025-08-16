#!/bin/bash

echo "🚀 Starting Vercel deployment for Extrade..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

# Deploy to Vercel
echo "📦 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo ""
echo "📋 Next steps:"
echo "1. Set up your environment variables in Vercel dashboard"
echo "2. Configure your MySQL database for external connections"
echo "3. Set up external cron job service for automated tasks"
echo "4. Test your application"
echo ""
echo "🔗 Your app will be available at: https://your-app-name.vercel.app" 