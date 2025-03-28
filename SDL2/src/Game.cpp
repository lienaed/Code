#include "Game.hpp"
#include "TextureManager.hpp"
#include "GameObject.hpp"
#include "Map.hpp"

GameObject* player;
Map* map;

SDL_Renderer* Game::renderer = nullptr;

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

        //Create window
        window = SDL_CreateWindow (title, x, y, width, height, flags);
        if (window)
            std::cout << "Window created." << std::endl;
        else
            std::cout << "Window creating failed." << std::endl;

        //Create renderer
        renderer = SDL_CreateRenderer (window, -1, 0);
        if (renderer)
        {
            SDL_SetRenderDrawColor (renderer, 63, 83, 143, 255);
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

    //Load Image
    player = new GameObject ("assets/knight.png", 1, 1);

    //Get window Size
    SDL_GetWindowSize (window, &winW, &winH);

    //Initialize Map
    map = new Map();
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
    player -> update(winW, winH);
}

void Game::render()
{
    SDL_RenderClear (renderer);
    map -> drawMap();
    player -> render();
    SDL_RenderPresent (renderer);
}

void Game::clean()
{
    SDL_DestroyWindow (window);
    SDL_DestroyRenderer (renderer);
    player -> clean();
    SDL_Quit();
    std::cout << "Process cleared." << std::endl;
}