#ifndef Game_hpp
#define Game_hpp

#include <SDL2/SDL.h>
#include <SDL2/SDL_image.h>
#include <iostream>

class Game
{
    public:
        Game();
        ~Game();
        
        void init (const char* title, int x, int y, int width, int height, bool fullscreen);
        void events();
        void render();
        void update();
        void clean();
        bool running()
        {
            return isRunning;
        }
        static SDL_Renderer *renderer;

    private:
        int count = 0;
        bool isRunning;
        int moveState = 1;
        int winW, winH;
        SDL_Window *window;
};
#endif