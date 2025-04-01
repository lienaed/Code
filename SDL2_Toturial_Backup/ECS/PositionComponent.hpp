#pragma once
#include "Components.hpp"

class PositionComponent: public Component
{
    private:
        int xpos = 0, ypos = 0;

    public:
        int x()
        {
            return xpos;
        }
        int y()
        {
            return ypos;
        }

        PositionComponent()
        {
            xpos = 0;
            ypos = 0;
        }
        PositionComponent (int x, int y)
        {
            xpos = x;
            ypos = y;
        }

        void init() override
        {
            xpos = 0;
            ypos = 0;
        }

        void update() override
        {

        }
        void setpos(int x, int y)
        {
            xpos = x;
            ypos = y;
        }
};