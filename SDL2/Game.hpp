#ifndef Game_hpp
#define Game_hpp

#include <SDL2/SDL.h>
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

    private:
        bool isRunning;
        SDL_Window *window;
        SDL_Renderer *renderer;
};
#endif