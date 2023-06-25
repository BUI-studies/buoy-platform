#!/bin/bash

# Specify the path to the .env file
ENV_FILE="./server/.env"

# Load environment variables from .env file
if [[ -f "$ENV_FILE" ]]; then
  set -a
  source "$ENV_FILE"
  set +a
else
  echo "Error: .env file not found"
  exit 1
fi

# Start your application
node ./server/dist/index.js