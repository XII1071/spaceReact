@echo off
echo Installing dependencies...
npm i chance luxon

echo Installing dev dependencies...
npm i -D @types/chance @types/luxon

echo Installing postcss autoprefixer tailwindcss
npm i -D postcss autoprefixer tailwindcss

echo Installation complete!
pause