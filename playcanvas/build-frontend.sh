#!/bin/bash
# Build script for PlayCanvas frontend

echo "🚀 Starting PlayCanvas build..."

# Navigate to the correct directory relative to this script
cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo "🔨 Building..."
npm run build

echo "✅ Build complete!"
