#include "Game.hpp"

Game::Game()
{

}

Game::~Game()
{

}

void Game::init (const char* title, int x, int y, int width, int height, bool fullscreen)
{
    int flags = 0;
    if (fullscreen)
        flags = SDL_WINDOW_FULLSCREEN;

    if (SDL_Init (SDL_INIT_EVERYTHING) == 0)
    {
        std::cout << "Subsystem initialised." << std::endl;

        window = SDL_CreateWindow (title, x, y, width, height, flags);
        
        if (window)
            std::cout << "Window created." << std::endl;
        else
            std::cout << "Window creating failed." << std::endl;

        renderer = SDL_CreateRenderer (window, -1, 0);
        if (renderer)
        {
            SDL_SetRenderDrawColor (renderer, 255, 255, 255, 255);
            std::cout << "Renderer created." << std::endl;
        }

        else
            std::cout << "Renderer creating failed." << std::endl;

        isRunning = 1;
    }
    else
    {
        std::cout << "Subsystem initialization failed." << std::endl;
        isRunning = 0;
    }
}

void Game::events()
{
    SDL_Event event;
    SDL_PollEvent (&event);
    switch (event.type)
    {
        case SDL_QUIT:
            isRunning = 0;
            break;
        
        default:
            break;
    }
}

void Game::update()
{

}

void Game::render()
{
    SDL_RenderClear (renderer);
    SDL_RenderPresent (renderer);

}

void Game::clean()
{
    SDL_DestroyWindow (window);
    SDL_DestroyRenderer (renderer);
    SDL_Quit();
    std::cout << "Process cleared." << std::endl;
}