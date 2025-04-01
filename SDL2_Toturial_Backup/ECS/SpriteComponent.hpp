#pragma once
#include "Components.hpp"
#include "SDL.h"

class SpriteComponent: public Component
{
    private:
        PositionComponent* position;
        SDL_Texture *texture;
        SDL_Rect srcRect;
        SDL_Rect destRect;

    public:
        SpriteComponent() = default;
        SpriteComponent (const char* path)
        {
            texture = TextureManager::LoadTexture (path);
        }

        void init() override
        {
            position = &entity -> getComponent<PositionComponent>();

            srcRect.x = srcRect.y = 0;
            srcRect.w = srcRect.h = 25;
            destRect.w = destRect.h = 64;
            std::cout << srcRect.x << srcRect.y << srcRect.w << srcRect.h << destRect.w << destRect.h << std::endl;
        }

        void update() override
        {
            destRect.x = position -> x();
            destRect.y = position -> y();
        }

        void draw() override
        {
            std::cout << "drawing:";
            TextureManager::draw (texture, srcRect, destRect);
        }

};