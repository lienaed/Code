#pragma once
#include "Game.hpp"

class GameObject
{
    public:
        GameObject (const char* texturesheet, int xpos, int ypos);
        ~GameObject();
        
        void update(int winW, int winH);
        void render();
        void clean();
    
    private:
        int x;
        int y;
        int xstatus = 0, ystatus = 0;

        SDL_Texture* objTexture;
        SDL_Rect srcRect, destRect;
};