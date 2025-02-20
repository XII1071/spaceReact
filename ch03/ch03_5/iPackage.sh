#!/bin/bash

# echo "Installing Basic of dependencies..."
# npm i 

echo "Installing dependencies..."
npm i chance luxon @fontsource/material-icons

echo "Installing dev dependencies..."
npm i -D @types/chance @types/luxon

echo "Installing postcss autoprefixer tailwindcss"
npm i -D postcss autoprefixer tailwindcss

echo "Installing @tailwindcss/line-clamp"
npm i -D @tailwindcss/line-clamp daisyui

echo "Installing daisyui"
npm i -D @tailwindcss/vite

echo "Installation complete!"
read -p "Press Enter to exit..."

# command for execution
# chmod +x iPackage.sh
# bash iPackage.sh