cmake_minimum_required(VERSION 3.10)
project(MySDLGame)

set(CMAKE_CXX_STANDARD 17)

include_directories(/opt/homebrew/include /opt/homebrew/include/SDL2)
link_directories(/opt/homebrew/lib)

file(GLOB SOURCES "src/*.cpp")

add_executable(game ${SOURCES})
target_link_libraries(game SDL2 SDL2_image)

include_directories(src)