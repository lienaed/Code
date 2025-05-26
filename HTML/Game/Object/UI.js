class UI
{
    constructor()
    {
        this.Hp = 100;
        this.maxHp = 100;
        this.HpBarW = 200;
        this.HpBarH = 20;
        this.HpBarX = 20;
        this.HpBarY = 20;
        this.invincible = 0;

        this.energy = 100;
        this.maxEnergy = 100;
        this.energyBarW = 200;
        this.energyBarH = 20;
        this.energyBarX = 20;
        this.energyBarY = 50;
        this.prevEnergy = 100;

        this.combo = 0;
        this.maxCombo = 100;
        this.comboBarW = 200;
        this.comboBarH = 20;
        this.comboBarX = 20;
        this.comboBarY = 80;

        this.maxBossHp = 100;
        this.bossHp = 100;
        this.barW = 1000;
        this.barH = 30;
        this.barX = board.width / 2 - 500;
        this.barY = board.height - 50;
    }


    HpBar()
    {
        if (this.Hp < 0)
            this.Hp = 0;
        else if (this.Hp > 100)
            this.Hp = 100;

        var bar = (this.Hp / this.maxHp) * this.HpBarW;
                
        draw.fillStyle = "#444444";
        draw.fillRect (this.HpBarX, this.HpBarY, this.HpBarW, this.HpBarH);

        draw.fillStyle = "#ff1111";
        draw.fillRect (this.HpBarX, this.HpBarY, bar, this.HpBarH);
    }

    energyBar()
    {
        if (this.energy < 0)
            this.energy = 0;
        else if (this.energy > 100)
            this.energy = 100;

        var bar = (this.energy / this.maxEnergy) * this.energyBarW;
        
        draw.fillStyle = "#444444";
        draw.fillRect (this.energyBarX, this.energyBarY, this.energyBarW, this.energyBarH);

        draw.fillStyle = "#11ff11";
        draw.fillRect (this.energyBarX, this.energyBarY, bar, this.energyBarH);
    }

    comboBar()
    {
        if (this.combo < 0)
            this.combo = 0;
        else if (this.combo > 100)
            this.combo = 100;

        var bar = (this.combo / this.maxCombo) * this.comboBarW;
        
        draw.fillStyle = "#444444";
        draw.fillRect (this.comboBarX, this.comboBarY, this.comboBarW, this.comboBarH);

        draw.fillStyle = "#134aec";
        draw.fillRect (this.comboBarX, this.comboBarY, bar, this.comboBarH);
    }

    BossHpBar()
    {
        var bar = (this.bossHp / this.maxBossHp) * this.barW;

        draw.fillStyle = "#444444";
        draw.fillRect (this.barX, this.barY, this.barW, this.barH);

        draw.fillStyle = "#ff1111";
        draw.fillRect (this.barX, this.barY, bar, this.barH);
    }

    update()
    {
        this.HpBar();
        this.energyBar();
        this.comboBar();

        this.BossHpBar();
        if (this.bossHp <= 0)
        {
            this.bossHp = 0;
        }

        this.prevEnergy = this.energy;
    }
}