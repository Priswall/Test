local BoneHeartDeals = RegisterMod("Bone Heart Deals", 1);

local shopItems = {}
local hearts = Sprite()
hearts:Load("gfx/bone_heart_deals.anm2")
local room = nil
local zero = Vector(0, 0) -- Just to prevent bad memory leaking

function BoneHeartDeals:render()
    local player = Isaac.GetPlayer(0)
    for i = 1, #shopItems do
        if shopItems[i][1] == -1 and player:GetMaxHearts() == 0 then
            hearts:SetFrame("Idle", 0)
            hearts:RenderLayer(0, Vector(shopItems[i][2], shopItems[i][3]))
        elseif shopItems[i][1] == -2 then
            if player:GetMaxHearts() == 2 then
                hearts:SetFrame("Idle", 1)
                hearts:RenderLayer(0, Vector(shopItems[i][2], shopItems[i][3]))
            elseif player:GetMaxHearts() == 0 then
                hearts:SetFrame("Idle", 2)
                hearts:RenderLayer(0, Vector(shopItems[i][2], shopItems[i][3]))
            end
        elseif shopItems[i][1] == -4 and player:GetMaxHearts() == 0 then
            hearts:SetFrame("Idle", 3)
            hearts:RenderLayer(0, Vector(shopItems[i][2], shopItems[i][3]))
        end
        local entities = Isaac.GetRoomEntities()
        for _, entity in pairs(entities) do
            if not entity.Type == EntityType.ENTITY_EFFECT and entity.Position.Y > shopItems[i][3] then
                entity:Render(zero)
            end
        end
    end

    -- Reset shopItems list
    for i = 1, #shopItems do
        shopItems[i] = nil
    end

    -- Fill shopItems with devil deal items prices and positions
    local entities = Isaac.GetRoomEntities()
    for _, pickup in pairs(entities) do
        if pickup.Type == EntityType.ENTITY_PICKUP then
            pickup = pickup:ToPickup()
            if pickup:IsShopItem() and pickup.Price < 0 then
                local pos = Isaac.WorldToRenderPosition(pickup.Position)
                table.insert(shopItems, {pickup.Price, pos.X, pos.Y})
            end
        end
    end
end

BoneHeartDeals:AddCallback(ModCallbacks.MC_POST_RENDER, BoneHeartDeals.render)
