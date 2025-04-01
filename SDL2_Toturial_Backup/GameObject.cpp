#include "GameObject.hpp"
#include "TextureManager.hpp"
#include "Game.hpp"

GameObject::GameObject (const char* texturesheet, int xpos, int ypos)
{
    objTexture = TextureManager::LoadTexture (texturesheet);

    x = xpos;
    y = ypos;
    srcRect.h = 25;
    srcRect.w = 25;
    srcRect.x = 0;
    srcRect.y = 0;

    destRect.w = 64;
    destRect.h = 64;
}

void GameObject::update(int winW, int winH)
{
    if (x >= winW - destRect.w)
        xstatus = 1;
    if (x <= 0)
        xstatus = 0;
    
    if (y >= winH - destRect.h)
        ystatus = 1;
    if (y <= 0)
        ystatus = 0;
    
    if (xstatus)
        x--;
    else
        x++;

    if (ystatus)
        y--;
    else
        y++;

    destRect.x = x;
    destRect.y = y;

}

void GameObject::render()
{
    SDL_RenderCopy (Game::renderer, objTexture, &srcRect, &destRect);
}

void GameObject::clean()
{
    SDL_DestroyTexture (objTexture);
}