cmake_minimum_required(VERSION 3.10)
project(SDLProject)

set(CMAKE_CXX_STANDARD 17)

include_directories(/opt/homebrew/include /opt/homebrew/include/SDL2)
link_directories(/opt/homebrew/lib)

file(GLOB SOURCES "SDL2_SRC/src/*.cpp")

add_executable(Project ${SOURCES})
    target_link_libraries(Project SDL2 SDL2_image)

add_custom_command(TARGET Project POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E copy_directory
        ${CMAKE_SOURCE_DIR}/../SDL2_SRC/assets
        $<TARGET_FILE_DIR:Project>/assets
)

include_directories(src)