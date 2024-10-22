# Step 1: Use the official Node.js LTS image as the base image
FROM node:lts-alpine

# Step 2: Set the working directory in the container
WORKDIR /

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
# Step 4: Copy the rest of the application code into the container
COPY . .

# Step 5: Install the project dependencies
RUN npm install --only=production
RUN npx prisma db push
RUN npx prisma generate
RUN npm run seed

# Step 7: Expose the port on which the app will run
EXPOSE 3000

# Step 8: Define the command to run the app
CMD ["npm", "start"]
