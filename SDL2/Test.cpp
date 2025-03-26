#include "Game.hpp"
#include <iostream>

Game *game = nullptr;

int main ()
{
    game = new Game();

    game -> init ("game1", SDL_WINDOWPOS_CENTERED, SDL_WINDOWPOS_CENTERED, 1000, 500, 0);

    while (game -> running())
    {
        game -> events();
        game -> update();
        game -> render();
    }

    game -> clean();
    return 0;
}