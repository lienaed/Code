#include "Game.hpp"
#include <iostream>

Game *game = nullptr;

int main ()
{
    const int FPS = 60;
    const int frameDelay = 1000 / FPS;
    Uint32 frameStart;
    int frameTime;

    game = new Game();
    game -> init ("game1", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 800, 640, 0);

    while (game -> running())
    {
        frameStart = SDL_GetTicks();

        game -> events();
        game -> update();
        game -> render();

        frameTime = SDL_GetTicks() - frameStart;
        if (frameDelay > frameTime)
        {
            SDL_Delay (frameDelay - frameTime);
        }
        else
            std::cout << "Low Frame" << std::endl;
        
    }

    game -> clean();
    return 0;
}