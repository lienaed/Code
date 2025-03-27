#include "TextureManager.hpp"

SDL_Texture* TextureManager::LoadTexture (const char* texture, SDL_Renderer* ren)
{
    SDL_Surface* tempSurface = IMG_Load (texture);
    if (!tempSurface)
    {
        std::cout << texture << " load failed" << std::endl;
        return nullptr;
    }
    SDL_Texture* tex = SDL_CreateTextureFromSurface (ren, tempSurface);
    SDL_FreeSurface (tempSurface);

    return tex;
}