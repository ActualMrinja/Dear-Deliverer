pixpet = function(species, x, y) {

    this.Image = preload[preloadname.indexOf("Png Files/" + species + ".png")]
    this.Animation = 0;
    this.Species = species;
    this.X = x;
    this.Y = y;
    this.Rotate = 0;
    this.ownedItems = ["Sweet_Delivery", "Sleigher", "False_Present"]

    if (this.Species == "Taffyglider" || this.Species == "Mobath" || this.Species == "Parrogrine") {
        this.Rotate = 310;
    }

    this.FadeOut = 0;

    //Health is for both players and enemies
    this.Species == "Pydeer" ? this.Health = livestotal : this.Species == "Parrogrine" ? this.Health = 18 : this.Species == "Troffinch" ? this.Health = 3 : this.Species == "Mobath" ? this.Health = 2 : this.Health = 5;

    //EnemyReload is only for Taffygliders and Parrogrines
    this.EnemyReload = this.Species == "Parrogrine" ? 5 : 1;

    this.Sleigher = 0;
    this.Frenzy = 0;
    this.Invincibility = 0;

    this.BatVelocity = 1.5;
    this.BatVelocityY = 1.5;

}

pixpet.prototype.keyDown = function(keyCode, sprintAmount = []) {

    if (!endgame && this.Health > 0) {

        if (this.X < 500 && (keyCode == 39 || keyCode == 68)) {
            this.X += 10;
        } else if (this.X > 0 && (keyCode == 37 || keyCode == 65)) {
            this.X -= 10;
        } else if (this.Y < 280 && (keyCode == 40 || keyCode == 83)) {
            this.Y += 10;
        } else if (this.Y > 50 && (keyCode == 38 || keyCode == 87)) {
            this.Y -= 10;
        }

        if (items[this.ownedItems[0]].Current_Time == 0 && keyCode == 49) {
            items[this.ownedItems[0]].Current_Time = items[this.ownedItems[0]].Reload_Time;
            this.skill(0, this.ownedItems[0]);
        }

        if (items[this.ownedItems[1]].Current_Time == 0 && keyCode == 50) {
            items[this.ownedItems[1]].Current_Time = items[this.ownedItems[1]].Reload_Time;
            this.skill(0, this.ownedItems[1]);
        }

        if (items[this.ownedItems[2]].Current_Quantity > 0 && keyCode == 51) {
            items[this.ownedItems[2]].Current_Quantity -= 1;
            this.skill(0, this.ownedItems[2]);
            keyup.splice(keyup.indexOf(31), 1);
        }

        //Moving with a joystick has a wider amount of options
        if (sprintAmount !== []) {
            if ((sprintAmount[0] > 0 && this.X < 500) || (sprintAmount[0] < 0 && this.X > -28)) {
                this.X += sprintAmount[0]
            };
            if ((sprintAmount[1] > 0 && this.Y < 280) || (sprintAmount[1] < 0 && this.Y > 25)) {
                this.Y += sprintAmount[1]
            };
        }

    }

    //coordinate constraints
    if (this.X > 500) {
        this.X = 500
    }
    if (this.X < 0) {
        this.X = 0
    }
    if (this.Y > 280) {
        this.Y = 280
    }
    if (this.Y < 50) {
        this.Y = 50
    }

}

pixpet.prototype.delete = function(index) {

    //lowers index by one so an item is not missed when looping
    if (index + 1 < pixpets.length && loadpixpets > -1) {
        loadpixpets -= 1;
    }

    if (this.Health <= 0) {
        score += this.Species == "Parrogrine" ? 36 : this.Species == "Taffyglider" ? 10 : this.Species == "Troffinch" ? 6 : 4;
    }

    pixpets.splice(index, 1);
    return;
}

//hurt function which includes all pixpets
pixpet.prototype.hurt = function(index, damage) {
    soundeffect("Audio Files/HeartBreak.mp3");
    this.Health -= damage;
    this.Species == "Pydeer" ? this.FadeOut = 12 : this.FadeOut = 4;

    if (this.Health <= 0 && this.Species !== "Pydeer") {
        this.delete(index);
    } else if (this.Health <= 0 && this.Species == "Pydeer") {
        music.pause();
        soundeffect("Audio Files/DearDelivererEndJingle.mp3");
    }

}

//player collision is text heavy, so a command for any enemy to use is more efficent
pixpet.prototype.playercollision = function(index) {

    if (collision(pixpets[0].X - pixpets[0].Image.width / 3 / 2 / 2, pixpets[0].Y - pixpets[0].Image.height / 3 / 2, pixpets[0].Image.width / 3 / 2, pixpets[0].Image.height / 3, this.X - this.Image.width / 3 / 2 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3 / 2, this.Image.height / 3)) {


        //If the player is using sleigher, contact damage is reflected
        if (pixpets[0].Sleigher > 0) {
            soundeffect("Audio Files/Whoosh.mp3");
            this.hurt(index, 2);
        } else if (pixpets[0].Sleigher <= 0) {
            pixpets[0].hurt(0, 1);

            //Troffinches faint after contact damage
            if (this.Species == "Troffinch") {
                this.delete(index);
            }
        }

        return true;
    } else {
        return false;
    }

}

//skills can be used by anyone, however they must be called beforehand
pixpet.prototype.skill = function(index, skilltype) {

    switch (skilltype) {

        case "Sweet_Delivery":

            //Presents have a 5% to be golden, 15% to be silver, 80% to be normal
            let rarityChance = Math.floor(Math.random() * 100) + 1;

            if (collision(chimneyfound[0], chimneyfound[1], gifload[14].width / 3, gifload[14].height, this.X - this.Image.width / 3 / 2 / 2, this.Y - this.Image.height / 3 / 2, this.Image.width / 3 / 2, this.Image.height / 3)) {
                soundeffect("Audio Files/Failure.mp3");
            } else {
                itemsmake.push(new itembuild(rarityChance <= 5 ? "GoldenDelivery" : rarityChance <= 20 ? "SilverDelivery" : "SweetDelivery", this.X, this.Y + 25))
            }

            break;

        case "False_Present":

            itemsmake.push(new itembuild("FalsePresent", this.X, this.Y + 25))

            break;

        case "Tricicle":

            //Icicle's direction changes based on their rotation
            itemsmake.push(new itembuild("Tricicle", this.X + 30, this.Y))
            itemsmake[itemsmake.length - 1].Rotate = 45;
            itemsmake.push(new itembuild("Tricicle", this.X + 30, this.Y))
            itemsmake[itemsmake.length - 1].Rotate = -45;
            itemsmake.push(new itembuild("Tricicle", this.X + 30, this.Y))

            break;

        case "Heart_Of_Ice":
            soundeffect("Audio Files/GlassBreakHarsh.mp3");
            this.Invincibility = 5;
            if (this.Health < livestotal) {
                this.Health += 1
            }
            break;

        case "Sleigher":
            this.Sleigher = 3;
            soundeffect("Audio Files/SleighBell.mp3");
            break;

        case "Wintry_Fury":
            this.Frenzy = 120;
            break;

        case "The_Winter_Storm":
            soundeffect("Audio Files/GlassBreakHarsh.mp3");
            itemsmake.push(new itembuild("WinterStorm", this.X + 30, this.Y))
            break;

        case "Parrogrine":

            if (this.X > 485) {
                this.X -= 2.5
            }

            this.Y += this.BatVelocity;
            this.BatVelocity += this.BatVelocity > 0 ? (Math.random() * 2 / 40) + 0.05 : -(Math.random() * 2 / 40) - 0.05;

            if (Math.abs(this.BatVelocity) > 3) {
                this.BatVelocity *= -0.5
            }

            //Parrogrine's have contact damage
            if ((pixpets[0].FadeOut == 0||pixpets[0].Sleigher > 0) && pixpets[0].Health > 0 && this.FadeOut == 0 && pixpets[0].Invincibility <= 0) {
                this.playercollision(index)
            }

            if (this.EnemyReload == 0) {
                this.X += 15;
                pixpets.push(new pixpet("Troffinch", this.X - 20, this.Y))
                soundeffect("Audio Files/SleighBell.mp3");
                this.EnemyReload = 5;
            }

            break;

        case "Troffinch":

            if (this.X > -20) {
                this.X += (pixpets[0].X - this.X) / 20;
                this.Y += (pixpets[0].Y - this.Y) / 20;
                this.Rotate = Math.atan2(this.Y - pixpets[0].Y, this.X - pixpets[0].X) * (180 / Math.PI)

                //Taffyglider's have contact damage
                if ((pixpets[0].FadeOut == 0||pixpets[0].Sleigher > 0) && pixpets[0].Health > 0 && this.FadeOut == 0 && pixpets[0].Invincibility <= 0) {
                    this.playercollision(index)
                }

            } else {
                this.delete(index);
            }
            break;

        case "Taffyglider":

            if (this.X > -20) {
                this.X -= 5;
                this.Y += (pixpets[0].Y - this.Y) / 20;

                //Taffyglider's have contact damage
                if ((pixpets[0].FadeOut == 0||pixpets[0].Sleigher > 0) && pixpets[0].Health > 0 && this.FadeOut == 0 && pixpets[0].Invincibility <= 0) {
                    this.playercollision(index)
                }

                //Taffyglider's shoot taffy when near the player
                if (Math.abs(this.Y - pixpets[0].Y) < 20 && this.X > pixpets[0].X && this.EnemyReload == 0) {
                    itemsmake.push(new itembuild("TaffygliderTaffy", this.X - 20, this.Y))
                    this.EnemyReload = 1;
                }


            } else {
                this.delete(index);
            }
            break;

        case "Mobath":

            if (this.X > -20) {
                this.X -= 5;
                this.Y += this.BatVelocity;
                this.BatVelocity += this.BatVelocity > 0 ? (Math.random() * 2 / 40) + 0.05 : -(Math.random() * 2 / 40) - 0.05;

                if (Math.abs(this.BatVelocity) > 3) {
                    this.BatVelocity *= -0.5
                }

                //Mobath's have contact damage
                if ((pixpets[0].FadeOut == 0||pixpets[0].Sleigher > 0) && pixpets[0].Health > 0 && this.FadeOut == 0 && pixpets[0].Invincibility <= 0) {
                    this.playercollision(index)
                }

            } else {
                this.delete(index);
            }
            break;

    }

}

pixpet.prototype.draw = function(index) {

    //Invincibility through losing lives includes a fading out sequence
    if (this.FadeOut > 0) {
        ctx.globalAlpha = 1 - (this.FadeOut % 4 / 4);
        this.FadeOut -= 1 / 6
    } else {
        this.FadeOut = 0;
        ctx.globalAlpha = 1;
    }

    ctx.save();
    ctx.translate(this.X * (hs / 297), this.Y * (hs / 297));
    ctx.rotate(Math.PI / 180 * this.Rotate);
    ctx.drawImage(this.Image, this.Image.width / 2 * Math.floor(this.Animation) + 0.3, 0, this.Image.width / 2 - 0.3, this.Image.height, -this.Image.width / 3 / 2 / 2 * (hs / 297), -this.Image.height / 3 / 2 * (hs / 297), this.Image.width / 3 / 2 * (hs / 297), this.Image.height / 3 * (hs / 297));

    if (this.Sleigher > 0) {
        ctx.drawImage(preload[2], preload[2].width / 2 * Math.floor(this.Animation) + 0.3, 0, preload[2].width / 2 - 0.3, preload[2].height, -(this.Image.width + 240) / 3 / 2 / 2 * (hs / 297), -(preload[2].height - 80) / 3 / 2 * (hs / 297), preload[2].width / 3 / 2 * (hs / 297), preload[2].height / 3 * (hs / 297));
        this.Sleigher -= 1 / 30;
    }

    ctx.restore();

    this.Animation += this.Species == "Troffinch" ? 0.5 : 0.2;
    if (this.Animation >= 2) {
        this.Animation = 0;
    }

    if (this.Species !== "Pydeer") {

        this.skill(index, this.Species);

    }

    if (this.Frenzy > 0) {
        if (this.Frenzy % 3 == 0) {
            itemsmake.push(new itembuild("Snowball", this.X + 30, this.Y))
        }
        this.Frenzy -= 1;
    }

    if (this.Invincibility > 0) {
        this.Invincibility -= 1 / 30
    }

    if (this.Species == "Mobath" || this.Species == "Taffyglider" || this.Species == "Troffinch" || this.Species == "Parrogrine") {
        this.EnemyReload -= 1 / 30

        if (this.EnemyReload < 0) {
            this.EnemyReload = 0;
        }

    } else {
        items[this.ownedItems[0]].Current_Time -= 1 / 30;
        items[this.ownedItems[1]].Current_Time -= 1 / 30;

        if (items[this.ownedItems[0]].Current_Time < 0) {
            items[this.ownedItems[0]].Current_Time = 0;
        }
        if (items[this.ownedItems[1]].Current_Time < 0) {
            items[this.ownedItems[1]].Current_Time = 0;
        }

    }

    //Starting screen animation
    if (endgame) {

        if (this.X < 100 && this.BatVelocity < 0) {
            this.BatVelocity += 1;
        } else if (this.X > 350 && this.BatVelocity > 0) {
            this.BatVelocity -= 1;
        } else {
            this.X += this.BatVelocity;
        }

        this.BatVelocity += (this.BatVelocity > 0) ? Math.random() * 3 / 50 : -Math.random() * 3 / 50;

        if (this.Y < 80 && this.BatVelocityY < 0) {
            this.BatVelocityY += 1;
        } else if (this.Y > 200 && this.BatVelocityY > 0) {
            this.BatVelocityY -= 1;
        } else {
            this.Y += this.BatVelocityY;
        }

        this.BatVelocityY += (this.BatVelocityY > 0) ? Math.random() * 3 / 50 : -Math.random() * 3 / 50;
    }

}
