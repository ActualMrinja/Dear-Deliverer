itembuild = function(type, x, y) {

    this.Image = gifload[gifname.indexOf("Gif Files/" + type + ".gif")]
    this.Type = type;
    this.X = x;
    this.Y = y;
    this.Rotate = 0;
    this.Velocity = 3;

    if (this.Type == "FalsePresent") {
        soundeffect("Audio Files/GlassBreak.mp3");
    } else if (this.Type.split("Icon").length == 1) {
        soundeffect("Audio Files/PresentDrop.mp3");
    } else {
        this.SkillChosen = primarySkills.indexOf(this.Type.split("Icon")[0]) == -1 ? 2 : 1;
    }

}

itembuild.prototype.delete = function(index) {

    //lowers index by one so an item is not missed when looping
    if (index + 1 < itemsmake.length && loaditems > -1) {
        loaditems -= 1;
    }

    itemsmake.splice(index, 1);
    return true;

}

//player collision is text heavy, so a command for any bullet to use is more efficent
itembuild.prototype.pixpetcollision = function(index, pixpetindex) {

    if (collision(pixpets[pixpetindex].X - pixpets[pixpetindex].Image.width / 3 / 2 / 2, pixpets[pixpetindex].Y - pixpets[pixpetindex].Image.height / 3 / 2, pixpets[pixpetindex].Image.width / 3 / 2, pixpets[pixpetindex].Image.height / 3, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3)) {

        if (this.Type.split("Icon").length > 1) {
            return true;
        }

        pixpets[pixpetindex].hurt(pixpetindex, this.Type == "WinterStorm" ? 18 : this.Type == "FalsePresent" ? 2 : this.Type == "Snowball" ? 0.15 : 1);

        if (this.Type == "FalsePresent" || this.Type == "WinterStorm") {
            this.Velocity = 0;
        } else {
            this.delete(index);
        }

    } else {
        return false;
    }

}

itembuild.prototype.draw = function(index) {

    ctx.save();

    this.Type.split("Icon").length > 1 ? ctx.globalAlpha = (this.X % 100) / 100 : ctx.globalAlpha = 1;

    ctx.translate(this.X * (hs / 297), this.Y * (hs / 297));
    ctx.rotate(Math.PI / 180 * this.Rotate);
    ctx.drawImage(this.Image, -this.Image.width / 3 / 2 * (hs / 297), -this.Image.height / 3 / 2 * (hs / 297), this.Image.width / 3 * (hs / 297), this.Image.height / 3 * (hs / 297));
    ctx.restore();

    //touching the sides of a chimney will destroy the item   
    if (collision(chimneyfound[0], chimneyfound[1] + (80 / 3), 5, (gifload[14].height - 80) / 3, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3) || collision(chimneyfound[0] + gifload[14].width / 3 - 5, chimneyfound[1] + (80 / 3), 5, (gifload[14].height - 80) / 3, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3)) {
        soundeffect("Audio Files/ItemBreak.mp3");
        this.delete(index);
    } else if ((this.Type == "SweetDelivery" || this.Type == "SilverDelivery" || this.Type == "GoldenDelivery") && collision(chimneyfound[0], chimneyfound[1] + (80 / 3), gifload[14].width / 3, 5, this.X - this.Image.width / 3 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3, this.Image.height / 3) && chimneyfound[2] == false) {
        score += this.Type == "GoldenDelivery" ? 8 * (6 - livestotal) : this.Type == "SilverDelivery" ? 4 * (6 - livestotal) : 2 * (6 - livestotal);
        chimneyfound[2] = true;
        soundeffect("Audio Files/Score.mp3");
    }

    if (this.Type == "SweetDelivery" || this.Type == "SilverDelivery" || this.Type == "GoldenDelivery" || this.Type == "FalsePresent") {
        this.Y += this.Velocity;
        this.Velocity += this.Type == "FalsePresent" ? 1 : 0.5;

        if (this.Type == "FalsePresent") {
            for (let pixpetfind = 1; pixpetfind < pixpets.length; pixpetfind++) {
                if (pixpets[pixpetfind].FadeOut == 0) {
                    this.pixpetcollision(index, pixpetfind)
                }
            }
        }

    }

    if (this.Type == "TaffygliderTaffy") {

        this.X -= 8;
        if (pixpets[0].FadeOut == 0 && pixpets[0].Health > 0 && pixpets[0].Invincibility <= 0) {
            this.pixpetcollision(index, 0)
        }

    }

    if (this.Type == "Tricicle") {

        this.X += 8;
        this.Y += this.Rotate / 15;

        for (let pixpetfind = 1; pixpetfind < pixpets.length; pixpetfind++) {
            this.pixpetcollision(index, pixpetfind)
        }

    }

    if (this.Type == "Snowball") {

        this.X += 8;
        this.Rotate += 4

        for (let pixpetfind = 1; pixpetfind < pixpets.length; pixpetfind++) {
            this.pixpetcollision(index, pixpetfind)
        }

    }


    if (this.Type == "WinterStorm") {

        this.Rotate += this.Velocity;
        this.Velocity += 20;

        //Winter Storm takes time to recharge
        if (this.Velocity > 200) {

            if (pixpets.length > 1) {
                this.X += (pixpets[1].X - this.X) / 10;
                this.Y += (pixpets[1].Y - this.Y) / 10;
            } else {
                this.X -= 25;
            }

        }

        for (let pixpetfind = 1; pixpetfind < pixpets.length; pixpetfind++) {
            if (pixpets[pixpetfind].FadeOut == 0) {
                this.pixpetcollision(index, pixpetfind)
            }
        }

    }

    //Code that automatically makes every skill bubble have the same ability
    if (this.Type.split("Icon").length > 1) {

        this.X -= 4;
        this.Rotate += 4;

        if (this.pixpetcollision(index, 0)) {

            //Bonus points if the skill is switch
            if (pixpets[0].ownedItems[this.SkillChosen] !== this.Type.split("Icon")[0]) {
                score += 5;
            }
            soundeffect("Audio Files/Score.mp3");

            pixpets[0].ownedItems[this.SkillChosen] = this.Type.split("Icon")[0];

            //Refreshes quantity and reload time is set to 0 automatically when switched
            if (items[pixpets[0].ownedItems[this.SkillChosen]].Current_Quantity !== undefined) {
                items[pixpets[0].ownedItems[this.SkillChosen]].Current_Quantity = items[pixpets[0].ownedItems[this.SkillChosen]].Max_Quantity;
            } else {
                items[pixpets[0].ownedItems[this.SkillChosen]].Current_Time = 0;
            }

            this.delete(index);
        }

    }

    //Item boundaries
    if (this.Y > 300 || this.X < -20 || this.X > 550 || this.Y < 25) {
        this.delete(index);
    }

}
