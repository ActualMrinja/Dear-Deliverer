canvas = document.getElementById("Canvas-DearDeliverer");
ctx = canvas.getContext("2d");

/**
0 is header
1 is full screen button
2 is small screen button
3 is snow
4 is cloud
5 is pydeer
6 is player joystick
7 is Joystick Top
8 is Deliver Icon
9 is Sweet Delivery
10 is Snow Heart
11 is Empty Heart
12 is Taffyglider Taffy
13 is Sleigher Icon
14 is Chimney
15 is Silver Delivery
16 is Golden Delivery
17 is FalsePresent
18 is FalsePresent Icon
19 is Tricicle
20 is Tricicle Icon
21 is Wintry Fury Icon
22 is Snowball
23 is Invincible Heart
24 is Heart Of Ice Icon
25 is Winter Storm
26 is The Winter Storm Icon
27 is Music On 
28 is Music Off
29 is Sound On
30 is Sound Off
31 is Button Unclick
32 is Button Click
**/

gifname = ["Gif Files/Header.gif", "Gif Files/FullScreenButton.gif", "Gif Files/SmallScreenButton.gif", "Gif Files/Snow.gif", "Gif Files/Cloud.gif", "Gif Files/Pydeer.gif", "Gif Files/PlayerJoystick.gif", "Gif Files/JoystickTop.gif", "Gif Files/Sweet_DeliveryIcon.gif", "Gif Files/SweetDelivery.gif", "Gif Files/SnowHeart.gif", "Gif Files/EmptyHeart.gif", "Gif Files/TaffygliderTaffy.gif", "Gif Files/SleigherIcon.gif", "Gif Files/Chimney.gif", "Gif Files/SilverDelivery.gif", "Gif Files/GoldenDelivery.gif", "Gif Files/FalsePresent.gif", "Gif Files/False_PresentIcon.gif", "Gif Files/Tricicle.gif", "Gif Files/TricicleIcon.gif", "Gif Files/Wintry_FuryIcon.gif", "Gif Files/Snowball.gif", "Gif Files/InvincibleHeart.gif", "Gif Files/Heart_Of_IceIcon.gif", "Gif Files/WinterStorm.gif", "Gif Files/The_Winter_StormIcon.gif", "Gif Files/MusicOn.gif", "Gif Files/MusicOff.gif", "Gif Files/SoundOn.gif", "Gif Files/SoundOff.gif", "Gif Files/ButtonUnclick.gif", "Gif Files/ButtonClick.gif"];
gifload = [];

preloadname = ["Png Files/Pydeer.png", "Png Files/Taffyglider.png", "Png Files/SleigherTracks.png", "Png Files/Mobath.png", "Png Files/Troffinch.png", "Png Files/Parrogrine.png"];
preload = [];

for (let loader = 0; loader < gifname.length; loader++) {
    gifload.push(new Image());
    gifload[loader].src = gifname[loader];
}

for (let loader = 0; loader < preloadname.length; loader++) {
    preload.push(new Image());
    preload[loader].src = preloadname[loader];
}

ws = 528;
hs = 297;

mousex = 0;
mousey = 0;
mousedown = false;
mouseup = true;
keyup = [];

livestotal = 3;
score = 99999;
seconds = 0;

chimneyfound = [550, 250, false];

//contains items and skills used by the main character
items = {
    Sweet_Delivery: {
        Description: "USE TO DROP A WELL-CRAFTED PRESENT DOWN CHIMNEYS\n(WILL FAIL WHEN USED NEAR A CHIMNEY)",
        BubbleIndex: 8,
        Reload_Time: 0.5,
        Current_Time: 0,
    },
    Sleigher: {
        Description: "USE TO BECOME INVINCIBLE FROM ENEMY CONTACT DAMAGE FOR 3 SECONDS\nDURING THIS TIME YOU CAN DEAL CONTACT DAMAGE",
        BubbleIndex: 13,
        Reload_Time: 4.5,
        Current_Time: 0,
    },
    Wintry_Fury: {
        Description: "USE TO ENTER INTO A SNOWBALL FRENZY FOR 4 SECONDS\nSNOWBALLS CAN ALSO DAMAGE RECOVERING ENEMIES",
        BubbleIndex: 21,
        Reload_Time: 8,
        Current_Time: 0,
    },
    The_Winter_Storm: {
        Description: "USE TO SUMMON THE WINTER STORM, A COMPACT BLIZZARD\nIT HAPPENS TO PUNISH NEARBY PIXPETS WITH ILL INTENTIONS",
        BubbleIndex: 26,
        Reload_Time: 45,
        Current_Time: 0,
    },
    False_Present: {
        Description: "USE TO DROP A PRESENT MIMIC\nTHIS SAFE WILL SURE HURT ANYONE THAT DARES SET FOOT UNDERNEATH IT",
        BubbleIndex: 18,
        Max_Quantity: 12,
        Current_Quantity: 12,
    },
    Tricicle: {
        Description: "USE TO SHOOT THREE SHARP ICICLES THAT SPREAD\nICICLES CAN DAMAGE EVEN WHEN ENEMIES ARE RECOVERING",
        BubbleIndex: 20,
        Max_Quantity: 9,
        Current_Quantity: 9,
    },
    Heart_Of_Ice: {
        Description: "USE TO BECOME INVINCIBLE FROM ANY ATTACK FOR 5 SECONDS\nALSO GRANTS A HEART",
        BubbleIndex: 24,
        Max_Quantity: 1,
        Current_Quantity: 1,
    }
}
primarySkills = ["Wintry_Fury", "Sleigher", "The_Winter_Storm"]
secondarySkills = ["False_Present", "Tricicle", "Heart_Of_Ice"]

pixpets = [new pixpet("Pydeer", 150, 140)]
itemsmake = []

//dummy variables
PATS = 3;
prize = 0;

//music handler, intro >> main theme, main theme is preloaded
music = new Audio("Audio Files/DearDelivererMainTheme.mp3")
music = new Audio("Audio Files/DearDelivererIntro.mp3");
music.volume = 0.7;
music.loop = false;
music.play()

music.onended = function() {
    let keepvolume = music.volume; //makes the music keep its volume when resetting
    music.pause();
    music = new Audio("Audio Files/DearDelivererMainTheme.mp3")
    music.volume = keepvolume
    music.loop = true;
    music.play();
}

sounds = [0, 0, 0, 0, 0, 0];
soundeffectvolume = 1;
soundsloop = 0;
endgame = true;
tipon = false;

//x,y,degrees, and type
backgroundmake = [];

for (let loader = 0; loader < 15; loader++) {
    backgroundmake.push(Math.ceil(Math.random() * 528), Math.ceil(Math.random() * 297), 0, (Math.floor(Math.random() * 10) + 1 == 1) ? 4 : 3)
}


//basic non-advanced collision
collision = function(x1, y1, w1, h1, x2, y2, w2, h2) {

    if (x1 <= x2 + w2 && x1 + w1 >= x2 && y1 <= y2 + h2 && y1 + h1 >= y2) {
        return true;
    } else {
        return false;
    }

}

//circle collision
circlecollision = function(x1, x2, y1, y2, radius) {

    if (Math.pow(Math.pow(x1 - x2 * (hs / 297), 2) + Math.pow(y1 - y2 * (hs / 297), 2), 0.5) <= (radius * hs / 297)) {
        return true;
    } else {
        return false;
    }

}

//global sound effects to deal with multiple sound effects efficently
soundeffect = function(file) {

    sounds[soundsloop] = new Audio(file);
    sounds[soundsloop].volume = soundeffectvolume;
    sounds[soundsloop].play();
    soundsloop += 1;
    if (soundsloop > 5) {
        soundsloop = 0;
    }

}

mousemake = function(event, mousedown) {
    mousex = event.clientX - canvas.getBoundingClientRect().left;
    mousey = event.clientY - canvas.getBoundingClientRect().top;
}

mousedowncheck = function() {
    mousedown = true;
    mouseup = false;

    //music does not play unti clicked in some browsers
    if (music.volume == 0.7 && pixpets[0].Health > 0) {
        music.play()
    }
}

keydowncode = function(keyhandler = 0) {

    //can only use hotkeys during gameplay 
    if (event !== undefined && keyup.indexOf(event.keyCode) == -1) {
        keyup.push(event.keyCode)
    }
    pixpets[0].keyDown(keyhandler !== 0 ? keyhandler : event.keyCode);

}



textmaker = function(text, x, y, size, sizeswitch = false) {

    //loop allows line breaks to be available with \n
    for (let textsplit = 0; textsplit < text.split("\n").length; textsplit++) {

        if (sizeswitch) {
            ctx.font = "900 " + size * (hs / 297) + "px SG12";
            ctx.strokeStyle = "black";
            ctx.lineWidth = (size / 25) * 4 * (hs / 297);
            ctx.strokeText(text.split("\n")[textsplit], x * (hs / 297) - (ctx.measureText(text.split("\n")[textsplit]).width / 1.95), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width);
            ctx.fillStyle = "white";
            ctx.fillText(text.split("\n")[textsplit], x * (hs / 297) - (ctx.measureText(text.split("\n")[textsplit]).width / 1.95), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width);
        } else {
            ctx.font = "900 " + size * (hs / 297) + "px SG12";
            ctx.strokeStyle = "black";
            ctx.lineWidth = (size / 25) * 4 * (hs / 297);
            ctx.strokeText(text.split("\n")[textsplit], x * (hs / 297), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width * (hs / 297));
            ctx.fillStyle = "white";
            ctx.fillText(text.split("\n")[textsplit], x * (hs / 297), (y + (textsplit * size * 1.25)) * (hs / 297), ctx.measureText(text.split("\n")[textsplit]).width * (hs / 297));
        }

    }

}

fullscreencode = function() {

    if (ws == 528) {

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            /* Firefox */
            canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            canvas.webkitRequestFullscreen();
        } else if (canvas.msRequestFullscreen) {
            /* IE/Edge */
            canvas.msRequestFullscreen();
        }

        //If both are supported choose the lesser, if not choose the one that is supported. This helps with mobile support
        ws = (window.innerWidth && document.documentElement.clientWidth) ?
            Math.min(window.innerWidth, document.documentElement.clientWidth) :
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;

        hs = Math.floor(ws / (528 / 297));
        canvas.width = ws
        canvas.height = hs;
        mousedown = false;
    } else {

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }

        ws = 528;
        hs = 297;
        canvas.width = 528;
        canvas.height = 297;
        mousedown = false;
    }

}

//skill buttons display and code goes here
skillbuttons = function(x, y, itemOwned) {
    circlecollision(mousex, x + 15, mousey, y + 15, 15) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    ctx.drawImage(gifload[items[pixpets[0].ownedItems[itemOwned]].BubbleIndex], x * (hs / 297), y * (hs / 297), 30 * (hs / 297), 30 * (hs / 297))

    if (ctx.globalAlpha == 1) {
        textmaker(pixpets[0].ownedItems[itemOwned].split("_").join(" ").toUpperCase() + (itemOwned == 2 ? " x" + items[pixpets[0].ownedItems[itemOwned]].Current_Quantity + "" : "") + " (HOTKEY: " + (itemOwned + 1) + ")", 110, 265, 10)
        textmaker(items[pixpets[0].ownedItems[itemOwned]].Description, 110, 275, 8)

        if (mousedown && (itemOwned == 2 ? items[pixpets[0].ownedItems[itemOwned]].Current_Quantity > 0 : items[pixpets[0].ownedItems[itemOwned]].Current_Time == 0)) {
            itemOwned == 2 ? items[pixpets[0].ownedItems[itemOwned]].Current_Quantity -= 1 : items[pixpets[0].ownedItems[itemOwned]].Current_Time = items[pixpets[0].ownedItems[itemOwned]].Reload_Time;
            pixpets[0].skill(0, pixpets[0].ownedItems[itemOwned]);
            mousedown = false;
        }

    }

    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5 * (hs / 297);
    ctx.arc((x + 15) * (hs / 297), (y + 15) * (hs / 297), 15 * (hs / 297), Math.PI / 180 * -90, (((360 / (itemOwned == 2 ? items[pixpets[0].ownedItems[itemOwned]].Max_Quantity : items[pixpets[0].ownedItems[itemOwned]].Reload_Time)) * (itemOwned == 2 ? items[pixpets[0].ownedItems[itemOwned]].Current_Quantity : items[pixpets[0].ownedItems[itemOwned]].Current_Time)) - 90) * Math.PI / 180, false)
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "#ff7f73";
    ctx.lineWidth = 1.75 * (hs / 297);
    ctx.arc((x + 15) * (hs / 297), (y + 15) * (hs / 297), 15 * (hs / 297), Math.PI / 180 * -90, (((360 / (itemOwned == 2 ? items[pixpets[0].ownedItems[itemOwned]].Max_Quantity : items[pixpets[0].ownedItems[itemOwned]].Reload_Time)) * (itemOwned == 2 ? items[pixpets[0].ownedItems[itemOwned]].Current_Quantity : items[pixpets[0].ownedItems[itemOwned]].Current_Time)) - 90) * Math.PI / 180, false)
    ctx.stroke();
    ctx.closePath();
}

//loads snow animation
backgroundload = function() {

    for (let loader = 0; loader < backgroundmake.length; loader += 4) {

        ctx.globalAlpha = 1;

        ctx.save();
        ctx.translate(backgroundmake[loader] * (hs / 297), backgroundmake[loader + 1] * (hs / 297))
        ctx.rotate((Math.PI / 180) * backgroundmake[loader + 2]);
        ctx.drawImage(gifload[backgroundmake[loader + 3]], -(hs / 297) * gifload[backgroundmake[loader + 3]].width / 3 / 2, -(hs / 297) * gifload[backgroundmake[loader + 3]].height / 3 / 2, (hs / 297) * gifload[backgroundmake[loader + 3]].width / 3, (hs / 297) * gifload[backgroundmake[loader + 3]].height / 3);
        ctx.restore();

        if (backgroundmake[loader + 3] == 4) {
            backgroundmake[loader] -= 2.5
        }
        if (backgroundmake[loader + 3] == 3) {
            backgroundmake[loader + 1] += 2.5
        }
        if (backgroundmake[loader + 3] == 3) {
            backgroundmake[loader + 2] += 10
        }

        if (backgroundmake[loader + 1] > 300 || backgroundmake[loader] < -50) {

            (Math.floor(Math.random() * 10) + 1 == 1) ? backgroundmake[loader + 3] = 4: backgroundmake[loader + 3] = 3

            if (backgroundmake[loader + 3] == 3) {
                backgroundmake[loader] = Math.ceil(Math.random() * 528)
                backgroundmake[loader + 1] = 0
            } else {
                backgroundmake[loader] = 600;
                backgroundmake[loader + 1] = Math.random() * 297;
                backgroundmake[loader + 2] = 0;
            }
        }

    }

if(pixpets[0].Health > 0&&!endgame){
    
    /**
    Mobath Spawning
    Score 100-200 - 5% chance every second
    Score 50-99 - 20% chance every second
    Score 0-49 - 10% chance every second
    **/
    if (score < 50 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 10) + 1 == 1) {
        pixpets.push(new pixpet("Mobath", 550, Math.random() * 147 + 50));
    } else if (score >= 50 && score < 100 && Math.floor(Math.random() * 5) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Mobath", 550, Math.random() * 147 + 50));
    } else if (score >= 100 && score < 200 && Math.floor(Math.random() * 20) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Mobath", 550, Math.random() * 147 + 50));
    }

    /**
    Taffyglider Spawning
    Score 200+ - 10% chance every second
    Score 150-199 - 6.6% chance every second
    Score 50-149 - 5% chance every second
    **/
    if (score >= 200 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 10) + 1 == 1) {
        pixpets.push(new pixpet("Taffyglider", 550, Math.random() * 147 + 50));
    } else if (score >= 150 && score < 200 && Math.floor(Math.random() * 15) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Taffyglider", 550, Math.random() * 147 + 50));
    } else if (score >= 50 && score < 150 && Math.floor(Math.random() * 20) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Taffyglider", 550, Math.random() * 147 + 50));
    }

    /**
    Troffinch Spawning
    Score 400+ - 5% chance every second
    Score 300-399 - 4% chance every second
    Score 200-299 - 3.3% chance every second
    **/
    if (score >= 400 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 20) + 1 == 1) {
        pixpets.push(new pixpet("Troffinch", 550, Math.random() * 147 + 50));
    } else if (score >= 300 && score < 400 && Math.floor(Math.random() * 25) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Troffinch", 550, Math.random() * 147 + 50));
    } else if (score >= 200 && score < 300 && Math.floor(Math.random() * 30) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Troffinch", 550, Math.random() * 147 + 50));
    }

    /**
    Parrogrine Spawning
    Score 750+ - 5% chance every second
    Score 600-749 - 3.3% chance every second
    Score 500-599 - 2.8% chance every second
    Score 400-499 - 2.5% chance every second
    **/
    if (score >= 750 && seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 20) + 1 == 1) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    } else if (score >= 600 && score < 750 && Math.floor(Math.random() * 30) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    } else if (score >= 500 && score < 600 && Math.floor(Math.random() * 35) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    } else if (score >= 400 && score < 500 && Math.floor(Math.random() * 40) + 1 == 1 && seconds % 1 > 0.9 + 2 / 30) {
        pixpets.push(new pixpet("Parrogrine", 550, Math.random() * 147 + 50));
    }
    
}

    //A skill bubble generates every 8 seconds, 50% for primary or secondary skill
    if (Math.ceil(seconds) % 8 == 0 && seconds % 1 > 0.9 + 2 / 30) {

        if (Math.floor(Math.random() * 2) + 1 == 1) {
            let primaryskillpicked = Math.floor(Math.random() * primarySkills.length);

            while (primarySkills[primaryskillpicked] == pixpets[0].ownedItems[1]) {
                primaryskillpicked = Math.floor(Math.random() * primarySkills.length);
            }
            itemsmake.push(new itembuild(primarySkills[primaryskillpicked] + "Icon", 450, Math.random() * 147 + 50));

        } else {
            itemsmake.push(new itembuild(secondarySkills[Math.floor(Math.random() * 3)] + "Icon", 450, Math.random() * 147 + 50));
        }

    }

    //50% a chimney spawns every second  
    if (seconds % 1 > 0.9 + 2 / 30 && Math.floor(Math.random() * 2) + 1 == 1 && chimneyfound[2] == true && chimneyfound[1] >= 300) {
        chimneyfound[0] = 550;
        chimneyfound[1] = 200 + Math.floor(Math.random() * 51);
        chimneyfound[2] = false;
    }


}

endgamemake = function() {

    if (!endgame) {
        ctx.globalAlpha = 1;
        textmaker("YOU SURVIVED FOR " + Math.floor(seconds) + " " + (Math.floor(seconds) == 1 ? "SECOND" : "SECONDS") + "\nSCORE: " + score, 264, 100, 20, true);

        //Dummy variables go here
        if (PATS > 0) {

            collision(mousex, mousey, 0, 0, 155 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
            ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[32] : gifload[31], 155 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));
            if (ctx.globalAlpha == 1 && mousedown) {
                mousedown = false;
                endgame = true;
                
                //End jingle is paused  
                for (let autopause = 0; autopause < sounds.length; autopause++) {
                  if (sounds[autopause].pause) {
                  sounds[autopause].volume = 0
                   }
                }
                
                music.play();
            }

            collision(mousex, mousey, 0, 0, 275 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
            ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[32] : gifload[31], 275 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));
            if (ctx.globalAlpha == 1 && mousedown) {
                mousedown = false;
                PATS -= 1;
                prize += 1;
                endgame = true;
                
                //End jingle is paused  
                for (let autopause = 0; autopause < sounds.length; autopause++) {
                  if (sounds[autopause].pause) {
                  sounds[autopause].volume = 0
                   }
                }
                
                music.play();
            }
            ctx.globalAlpha = 1;
            textmaker("TRY AGAIN", 204, !mouseup && collision(mousex, mousey, 0, 0, 155 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 182 : 180, 10, true);
            textmaker("SEND SCORE", 324, !mouseup && collision(mousex, mousey, 0, 0, 275 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 182 : 180, 10, true);
        } else {

            collision(mousex, mousey, 0, 0, 215 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
            ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[32] : gifload[31], 215 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));
            if (ctx.globalAlpha == 1 && mousedown) {
                mousedown = false;
                endgame = true;
                
                //End jingle is paused  
                for (let autopause = 0; autopause < sounds.length; autopause++) {
                  if (sounds[autopause].pause) {
                  sounds[autopause].volume = 0
                   }
                }
                
                music.play();
            }
            ctx.globalAlpha = 1;
            textmaker("TRY AGAIN", 264, !mouseup && collision(mousex, mousey, 0, 0, 215 * (hs / 297), 160 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 182 : 180, 10, true);
        }

    } else {
        pixpets.splice(1, pixpets.length - 1);

        collision(mousex, mousey, 0, 0, 400 * (hs / 297), 150 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[32] : gifload[31], 400 * (hs / 297), 150 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));

        if (ctx.globalAlpha == 1 && mousedown) {
            score = 0;
            seconds = 0;
            endgame = false;
            tipon = false;
            items.Sweet_Delivery.Current_Time = 0;
            items.Sleigher.Current_Time = 0;
            items.False_Present.Current_Quantity = 12;
            pixpets = [new pixpet("Pydeer", pixpets[0].X, pixpets[0].Y)];
        }

        ctx.globalAlpha = 1;
        textmaker("PLAY", 449, !mouseup && collision(mousex, mousey, 0, 0, 400 * (hs / 297), 150 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 174 : 172, 12, true);

        collision(mousex, mousey, 0, 0, 350 * (hs / 297), 100 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[32] : gifload[31], 350 * (hs / 297), 100 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));

        if (ctx.globalAlpha == 1 && mousedown) {
            livestotal += 1;
            if (livestotal > 3) {
                livestotal = 1
            }
        }

        ctx.globalAlpha = 1;
        textmaker("LIVES: " + livestotal, 399, !mouseup && collision(mousex, mousey, 0, 0, 350 * (hs / 297), 100 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 124 : 122, 12, true);

        collision(mousex, mousey, 0, 0, 350 * (hs / 297), 200 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(!mouseup && ctx.globalAlpha == 1 ? gifload[32] : gifload[31], 350 * (hs / 297), 200 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297));

        if (ctx.globalAlpha == 1 && mousedown) {
            tipon = !tipon
        }

        ctx.globalAlpha = 1;
        textmaker("TIPS", 399, !mouseup && collision(mousex, mousey, 0, 0, 350 * (hs / 297), 200 * (hs / 297), 96 * (hs / 297), 30 * (hs / 297)) ? 224 : 222, 12, true);

        if (tipon == true) {
            textmaker("Collect points by:\n-Dropping presents through chimneys\n-Defeating enemies\n-Switching skills through skill bubbles\n\nPresents give more points depending on\ntheir coloring and amount of lives\nstarted off with\n\nMove with arrow keys, touchpad, or WASD\n\nHotkeys\n1:Drop Presents\n2:Infinite Skills (Have Cooldown)\n3:Finite Skills (Have Limited USAGE)".toUpperCase(), 20, 70, 12);
        }

    }

}

maingame = function() {

    //if made small screen through tab hiding it will be become small screen automatically

    if ((!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && !document.webkitCurrentFullScreenElement)) {
        canvas.width = 528;
        canvas.height = 297;
        ws = canvas.width;
        hs = canvas.height;
    }

    if (canvas.width !== 528) {
        ws = (window.innerWidth && document.documentElement.clientWidth) ?
            Math.min(window.innerWidth, document.documentElement.clientWidth) :
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
        hs = Math.floor(ws / (528 / 297));
        canvas.width = ws
        canvas.height = hs;
    }


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pixpets[0].Health > 0 && !endgame) {
        seconds += 1 / 30;
    }

    //chimney is split into two parts to create a depth illusion and must be drawn before items and after items
    if (chimneyfound[2] == false || chimneyfound[1] < 300) {
        chimneyfound[0] -= 4;
        if (chimneyfound[2] == true) {
            chimneyfound[1] += 5
        }
        if (chimneyfound[0] < -100) {
            chimneyfound[2] = true
        }

        ctx.drawImage(gifload[14], 0, 0, gifload[14].width, 80, chimneyfound[0] * (hs / 297), chimneyfound[1] * (hs / 297), gifload[14].width / 3 * (hs / 297), 80 / 3 * (hs / 297));
    }

    if (pixpets[0].Health > 0) {
        for (loaditems = 0; loaditems < itemsmake.length; loaditems++) {
            itemsmake[loaditems].draw(loaditems);
        }
    }

    if (chimneyfound[2] == false || chimneyfound[1] < 300) {
        ctx.drawImage(gifload[14], 0, 80, gifload[14].width, gifload[14].height - 40, chimneyfound[0] * (hs / 297), (chimneyfound[1] + (80 / 3)) * (hs / 297), gifload[14].width / 3 * (hs / 297), (gifload[14].height - 80) / 3 * (hs / 297));
    }

    for (loadpixpets = 0; loadpixpets < pixpets.length; loadpixpets++) {
        pixpets[loadpixpets].draw(loadpixpets);
    }

    //if a key is still being pressed continue to move character
    if (keyup.length > 0) {

        for (multikey in keyup) {
            keydowncode(keyup[multikey])
        }

    }

    //header
    backgroundload();

    ctx.globalAlpha = 1;
    ctx.drawImage(gifload[0], 0, 0, (hs / 297) * 528, (hs / 297) * 50);
    ctx.drawImage(gifload[5], 220 * (hs / 297), 1 * (hs / 297), gifload[5].width / 5.5 * (hs / 297), gifload[5].height / 5.5 * (hs / 297));
    textmaker("DEAR DELIVERER", 280, 33.5, 20);

    if (score > 99999) {
        score = 99999
    }
    textmaker("SCORE: " + (endgame ? "000" : score), 20, 33.5, 20);


    (collision(mousex, mousey, 0, 0, (hs / 297) * 485, (hs / 297) * 8, (hs / 297) * 30, (hs / 297) * 30)) ? ctx.globalAlpha = 1: ctx.globalAlpha = 0.85;
    ctx.drawImage((ws == 528) ? gifload[1] : gifload[2], (hs / 297) * 485, (hs / 297) * 8, (hs / 297) * 30, (hs / 297) * 30);

    if (collision(mousex, mousey, 0, 0, (hs / 297) * 485, (hs / 297) * 8, (hs / 297) * 30, (hs / 297) * 30) && mousedown) {
        fullscreencode();
    }

    if (!endgame && pixpets[0].Health > 0) {

        //Joystick button uses pythagoream theorem to make it more exact
        circlecollision(mousex, 27.5, mousey, 267.5, 22.5) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
        ctx.drawImage(gifload[6], 5 * (hs / 297), 245 * (hs / 297), 45 * (hs / 297), 45 * (hs / 297));
        ctx.drawImage(gifload[7], (ctx.globalAlpha == 1 && (!mouseup||mousedown)) ? mousex - 6.5 * (hs / 297) : 20 * (hs / 297), (ctx.globalAlpha == 1 && mouseup == false) ? mousey - 7.5 * (hs / 297) : 260 * (hs / 297), 15 * (hs / 297), 15 * (hs / 297));

        //Scaling applies here to match moving through keys as much as possible
        if (ctx.globalAlpha == 1 && (!mouseup||mousedown)) {
            pixpets[0].keyDown(0, [(mousex - 27.5 * (hs / 297)) / 1.5 / (hs / 297), (mousey - 267.5 * (hs / 297)) / 1.5 / (hs / 297)]);
        }

        ctx.globalAlpha = 1;
        skillbuttons(12, 210, 0);
        skillbuttons(45, 228, 1);
        skillbuttons(58, 260, 2);
    }

    if (pixpets[0].Health <= 0 || endgame) {
        endgamemake();
    } else {

        //code for lives goes here
        for (let livecount = 0; livecount < livestotal; livecount++) {
            ctx.globalAlpha = 1;
            ctx.drawImage(livecount + 1 <= pixpets[0].Health ? (pixpets[0].Invincibility > 0 ? gifload[23] : gifload[10]) : gifload[11], (10 + (livecount * 30)) * (hs / 297), 55 * (hs / 297), 19 * (hs / 297), 19 * (hs / 297));
        }

    }

    collision(mousex, mousey, 0, 0, 185 * (hs / 297), 2 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    if (ctx.globalAlpha == 1 && mousedown) {
        music.volume = (music.volume == 0.7 ? 0 : 0.7)
    }
    ctx.drawImage(music.volume == 0.7 ? gifload[27] : gifload[28], 185 * (hs / 297), 2 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297));

    collision(mousex, mousey, 0, 0, 185 * (hs / 297), 25 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297)) ? ctx.globalAlpha = 1 : ctx.globalAlpha = 0.85;
    if (ctx.globalAlpha == 1 && mousedown) {
        soundeffectvolume = (soundeffectvolume == 1 ? 0 : 1)
        for (let autopause = 0; autopause < sounds.length; autopause++) {
            if (sounds[autopause].pause) {
                sounds[autopause].volume = soundeffectvolume
            }
        }
    }
    ctx.drawImage(soundeffectvolume == 1 ? gifload[29] : gifload[30], 185 * (hs / 297), 25 * (hs / 297), 21 * (hs / 297), 21 * (hs / 297));

    mousedown = false;
}

//buttons, mouse moving, clicking
canvas.addEventListener("keydown", keydowncode);
canvas.addEventListener("keyup", keyupcode => keyup.splice(keyup.indexOf(event.keyCode), 1));
canvas.addEventListener("mousemove", mousemake);
canvas.addEventListener("mousedown", mousedowncheck);
canvas.addEventListener("mouseup", mouseupcheck => mouseup = true);

//game animation
setInterval(maingame, 1000 / 30);
