#include <iostream>
#include <SDL2/SDL.h>
using namespace std;

const int WIDTH = 400, HEIGHT = 400;

int main() {
    if (SDL_Init(SDL_INIT_EVERYTHING)) {
        cout << "SDL could not initialized with error: " <<  SDL_GetError() << endl;
        return 1;
    }

    SDL_Window *win = SDL_CreateWindow(
            "Hello world",
            SDL_WINDOWPOS_CENTERED,
            SDL_WINDOWPOS_CENTERED, WIDTH, HEIGHT,
            SDL_WINDOW_ALLOW_HIGHDPI
    );

    if (win == NULL) {
        cout << "SDL could not create window    ith error: " <<  SDL_GetError() << endl;
        return 1;
    }

    SDL_Event windowEvent;
    while(true) {
        if (SDL_PollEvent(&windowEvent)) {
            if (SDL_QUIT == windowEvent.type) {
                cout << "SDL quit!!" << endl;
                break;
            }
        }
    }

    SDL_DestroyWindow(win);
    SDL_Quit();
    return 0;
}
