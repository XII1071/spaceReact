@echo off
echo Installing dependencies...
npm i chance luxon

echo Installing dev dependencies...
npm i -D @types/chance @types/luxon

echo Installing postcss autoprefixer tailwindcss
npm i -D postcss autoprefixer tailwindcss

echo Install daisyui
npm i -D daisyui

:: echo Install@tailwindcss/line-clamps
REM npm i -D @tailwindcss/line-clamp ::tailwindcss 3.3부터는 자체 포함

echo Installation complete!
pause
