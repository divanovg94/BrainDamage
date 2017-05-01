var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var unvisible = false;

function running(startPoint, endPoint, imgPath, isLeft) {
    var isLeft = isLeft;
    var spriteWidth = 204.8;
    var spriteHeight = 258;
    var img = new Image();
    img.src = imgPath;
    var nextX = 0;
    var pos;
    if (isLeft) {
        pos = 1845;
    } else {
        pos = 0;
    }
    function act() {
        if (isLeft) {
            nextX -= 20;
            ctx.clearRect(startPoint + nextX + 20, 280, spriteWidth, spriteHeight);
        } else {
            nextX += 20;
            ctx.clearRect(startPoint + nextX - 40, 280, spriteWidth, spriteHeight);
        }
        ctx.drawImage(img, pos, 0,
            spriteWidth, spriteHeight,
            startPoint + nextX, 280,
            spriteWidth * 0.6, spriteHeight * 0.6);
        if (isLeft) {
            pos -= spriteWidth * 2;
            clearingTexture()
            if (pos <= spriteWidth) {
                pos = 1845;
            }
            if ((startPoint + nextX) <= endPoint) {
                return false;
            }
        } else {
            pos += spriteWidth;
            clearingTexture();
            if (pos >= 9 * spriteWidth) {
                pos = 0;
            }
            if ((startPoint + nextX) >= endPoint) {
                return false;
            }
        }
        pos -= spriteWidth * 2;
        clearingTexture()
        if (pos <= spriteWidth) {
            pos = 1845;
        }

        setTimeout(act, 10);
    }
    requestAnimationFrame(act);
}
function attack(position, imgPath, isLeft) {
    var isLeft = isLeft;
    var spriteWidth = 205;
    var spriteHeight = 258;
    var img = new Image();
    img.src = imgPath;
    if (isLeft) {
        var pos = 1845;
    } else {
        var pos = 0;
    }
    function act() {
        ctx.clearRect(position, 280, spriteWidth, spriteHeight);
        ctx.drawImage(img, pos, 0,
            spriteWidth, spriteHeight,
            position, 280,
            spriteWidth * 0.88, spriteHeight * 0.88);
        if (isLeft) {
            pos -= spriteWidth;
            clearingTexture();
            if (pos <= spriteWidth) {
                pos = 1845;
                return false;
            }
        } else {
            pos += spriteWidth;
            clearingTexture();
            if (pos >= 9 * spriteWidth) {
                pos = 0;
                return false;
            }
        }
        setTimeout(act, 100);
    }
    requestAnimationFrame(act);
}
function falling(position, imgPath, isLeft) {
    var spriteWidth = 204.5;
    var isLeft = isLeft;
    if (isLeft) {
        var pos = 1845;
    } else {
        var pos = 0;
    }
    var spriteHeight = 258;
    var img = new Image();
    img.src = imgPath;
    function act() {
        ctx.clearRect(position, 280, spriteWidth, spriteHeight);
        ctx.drawImage(img, pos, 0,
            spriteWidth, spriteHeight,
            position, 280,
            spriteWidth * 0.80, spriteHeight * 0.80);
        if (isLeft) {
            pos -= spriteWidth;
        } else {
            pos += spriteWidth;
        }
        clearingTexture();
        if (isLeft) {
            if (pos <= spriteWidth) {
                pos = 1845;
                return false;
            }
        } else {
            if (pos >= 9 * spriteWidth) {
                pos = 0;
                return false;
            }
        }
        setTimeout(act, 100);
    }
    requestAnimationFrame(act);
};
function idle(position, imgPath, isLeft) {
    var isLeft = isLeft;
    var spriteWidth = 204.8;
    var pos;
    var spriteHeight = 439;
    var img = new Image();
    img.src = imgPath;
    if (isLeft) {
        pos = 1845;
    } else {
        pos = 0;
    }
    function act() {
        ctx.clearRect(position, 280, spriteWidth, spriteHeight);
        if (unvisible == true) {
            return;
        }
        ctx.drawImage(img, pos, 0,
            spriteWidth, spriteHeight,
            position, 280,
            spriteWidth * 0.40, spriteHeight * 0.40);
        if (isLeft) {
            pos -= spriteWidth;
        } else {
            pos += spriteWidth;
        }

        clearingTexture();
        if (isLeft) {
            if (pos <= spriteWidth) {
                pos = 1845;
            }
        } else {
            if (pos >= 9 * spriteWidth) {
                pos = 0;
            }
        }
        setTimeout(act, 100);
    }

    requestAnimationFrame(act);
}

// function jumpAttackNaLqvo(position, imgPath) {
//     var spriteWidth = 204.8;
//     var pos = 1845;
//     var spriteHeight = 439;
//     var img = new Image();
//     img.src = imgPath;
//     function act() {
//         ctx.clearRect(position, 280, spriteWidth, spriteHeight);
//         ctx.drawImage(img, pos, 0,
//             spriteWidth, spriteHeight,
//             position, 280,
//             spriteWidth * 0.40, spriteHeight * 0.40);
//         pos -= spriteWidth;
//         clearingTexture();
//         if (pos <= spriteWidth) {
//             pos = 1845;
//         }
//         setTimeout(act, 100);
//     }
//     requestAnimationFrame(act);
// }

// function jumpAttackNaDqsno(position, imgPath, isLeft) {
//     var isLeft = isLeft;
//     var spriteWidth = 204.8;
//     var pos;
//     if (isLeft) {
//         pos = 1845;
//     } else {
//         pos = 0;
//     }
//     var spriteHeight = 439;
//     var img = new Image();
//     img.src = imgPath;
//     var flagStop = false;
//     var nextX = 0;
//     var nextY = 0;
//     var unvisible = true;
//     function act() {
//         if (280 - nextY * 2 >= 100 && flagStop == false) {
//             if (flag == true) {
//                 nextY += 10;
//             }
//         }
//         if (280 - nextY * 2 <= 100 || flag == false) {
//             flag = false;
//             nextY -= 10;
//             if (280 - nextY * 2 >= 280) {
//                 flagStop = true;
//                 flag = true;
//                 hodiNaDqsno((position + nextX - 40), 1000, 'sprites/ninja3.png')
//                 ctx.clearRect((position + nextX - 40), (280 - nextY * 2 - 60), spriteWidth, spriteHeight)
//                 setTimeout(function () {
//                     hodiNaLqvo(1000, 50, 'sprites/ninja3L.png')
//                 }
//                     , 1600)
//             }
//         }
//         if (flagStop == false) {
//             nextX += 20;
//             ctx.clearRect(position + nextX - 60, 280 - nextY * 2 - 60, spriteWidth, spriteHeight);
//             ctx.drawImage(img, pos, 0,
//                 spriteWidth, spriteHeight,
//                 position + nextX - 20, 280 - nextY * 2,
//                 spriteWidth * 0.88, spriteHeight * 0.88);
//             pos -= spriteWidth;
//             clearingTexture();

//             if (pos <= spriteWidth) {
//                 pos = 1845;
//             }
//         }
//         setTimeout(act, 100);
//     }
//     requestAnimationFrame(act);
// }


function clearingTexture() {
    ctx.clearRect(83, 0, 23, 460);
    ctx.clearRect(839, 0, 21, 460);
}

