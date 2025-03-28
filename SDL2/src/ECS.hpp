#pragma once
#include <iostream>
#include <vector>
#include <algorithm>
#include <memory>
#include <bitset>
#include <array>

class Component;

class Entity;

using ComponentID = std::size_t;

inline ComponentID getComponentID()
{
    static ComponentID lastID = 0;
    return lastID++;
}

template <typename T> inline ComponentID getComponentID() noexcept
{
    static ComponentID typeID = getComponentID();
    return typeID;
}

constexpr std::size_t maxComponents = 32;

using ComponentBitSet = std::bitset<maxComponents>;
using ComponentArray = std::array<Component*, maxComponents>;

class Component()
{
    public:
        Entity* entity;

        virtual void init() {}
        virtual void update() {}
        virtual void draw() {}
        virtual void ~Component(){}
};

class Entity()
{
    public:
        void update()
        {
            for (auto& c : components)
                c -> update();
            for (auto& c : components)
                c -> draw();
        }
        void draw() {}
        bool isActive() const
        {
            return active;
        }
        void destory()
        {
            active = 0;
        }

        template <typename T> bool hasComponent() const
        {
            return componentBitSet[getComponentID<T>()];
        }

    private:
        bool active = 0;
        std::vector<std::unique_ptr<Component>> components;

        ComponentArray componentArray;
        ComponentBitSet componentBitSets;
};