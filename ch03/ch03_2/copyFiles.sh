#!/bin/bash

# arguments
SRC_DIR=${1}

echo "Copying files from $SRC_DIR..."

# .pr*rc copy
cp -r ../$SRC_DIR/.pr*rc .

# iPackage.sh copy
cp -r ../$SRC_DIR/iPackage.sh .

# src copy
cp -r ../$SRC_DIR/src/* ./src

# config copy
cp -r ../$SRC_DIR/*.js ./

# src/pages file remove
rm -rf src/pages/*

echo "Done!"
