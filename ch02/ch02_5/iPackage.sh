#!/bin/bash

echo "Installing dependencies..."
npm i chance luxon

echo "Installing dev dependencies..."
npm i -D @types/chance @types/luxon

echo "Installing postcss autoprefixer tailwindcss"
npm i -D postcss autoprefixer tailwindcss

echo "Installing daisyui"
npm i -D daisyui

# echo "Installing @tailwindcss/line-clamp"
# npm i -D @tailwindcss/line-clamp

echo "Installation complete!"
read -p "Press Enter to exit..."

# command for execution
# chmod +x iPackage.sh
# bash iPackage.sh