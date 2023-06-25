#!/bin/bash

# Load environment variables from .env file
source ./server/.env

# Start your application
node ./server/dist/index.js