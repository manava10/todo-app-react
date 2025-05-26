#!/bin/bash

# Build frontend
echo "Building frontend..."
cd client
npm install
npm run build

# Build backend
echo "Building backend..."
cd ../server
npm install

# Create production environment file
echo "Creating production environment file..."
cat > .env << EOL
NODE_ENV=production
PORT=5050
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_client_url
EOL

echo "Deployment preparation complete!"
echo "Please update the .env file with your production values before deploying." 