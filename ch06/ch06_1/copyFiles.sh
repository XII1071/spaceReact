#!/bin/bash

# arguments
SRC_DIR=${1}

echo "Copying files from $SRC_DIR..."

# .prettierrc copy
cp -r ../$SRC_DIR/.prettierrc .
cp -r ../$SRC_DIR/index.html .

# shell copy
cp -r ../$SRC_DIR/iPackage.sh .
cp -r ../$SRC_DIR/copyFiles.sh .

# config copy
cp -r ../$SRC_DIR/tailwind.config.js .
cp -r ../$SRC_DIR/vite.config.ts .

# src copy
cp -r ../$SRC_DIR/src/* ./src

# src/pages file remove
rm -rf src/pages/*

# src/store file remove
rm -rf src/store/*
cp -r src/copy/store/* ./src/store

echo "Done!"
