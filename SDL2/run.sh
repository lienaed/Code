#!/bin/zsh
cd "$(dirname "$0")/build"
cmake ..
cmake --build .
./Project
