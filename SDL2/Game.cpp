#include "Game.hpp"

SDL_Texture *character;
SDL_Rect srcR, destR = {100, 100, 200, 200};

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

    SDL_Surface* tmpSurface = IMG_Load ("assets/Knight.png");
    if (!tmpSurface)
        std::cout << "Image loading failed." << std::endl;
    character = SDL_CreateTextureFromSurface (renderer, tmpSurface);
    SDL_FreeSurface (tmpSurface);

    SDL_GetWindowSize (window, &winW, NULL);
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
    count++;
    if (destR.x >= winW - destR.w)
        moveState = 0;
    if (destR.x <= 0)
        moveState = 1;
    destR.x = moveState ? destR.x + 1 : destR.x - 1;
}

void Game::render()
{
    SDL_RenderClear (renderer);
    
    SDL_RenderCopy (renderer, character, NULL, &destR);
    SDL_RenderPresent (renderer);

}

void Game::clean()
{
    SDL_DestroyWindow (window);
    SDL_DestroyRenderer (renderer);
    SDL_DestroyTexture (character);
    SDL_Quit();
    std::cout << "Process cleared." << std::endl;
}