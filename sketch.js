var arr = new Array(4); // answer for the game
var player = new Array(4); // answer of player
var secondd // couting playing time in secondd
var minutee // couting playing time in minute
var startingtime; // save startingtime
let font1; // font for intro
let font2;

// var for position of the first two number
var x1 = Math.random(0, 3) * 4;
var y1 = Math.random(0, 3) * 4;
var x2 = Math.random(0, 3) * 4;
var y2 = Math.random(0, 3) * 4;

// location of the block which is being choosed (in the board)
var posx = 0;
var posy = 0;

// location of the newest point on the screen that is clicked
var posix = 0;
var posiy = 0;

var page = 2; // number of page that we're in
var lock = 0; // 0 = can't answer , 1 = can answer

// choose location for the first 2 number that different to each other
x1 = x1.toFixed(0);
x2 = x2.toFixed(0);
y1 = y1.toFixed(0);
y2 = y2.toFixed(0);
if (x1 == 4) {
    x1--;
}
if (x2 == 4) {
    x2--;
}
if (y1 == 4) {
    y1--;
}
if (y2 == 4) {
    y2--;
}
while (x1 == x2 && y1 == y2) {
    x2 = Math.random(0, 3) * 4;
    y2 = Math.random(0, 3) * 4;
    x2 = x2.toFixed(0);
    y2 = y2.toFixed(0);
    if (x2 == 4) {
        x2--;
    }
    if (y2 == 4) {
        y2--;
    }
}

// setup
let img;
let img2;
let img3;
let img4;
let img5;
function preload(){
    img = loadImage('images/img2.png');
    img2 = loadImage('images/img7-min.png');
    img3 = loadImage('images/img5.png');
    img4 = loadImage('images/img4.png');
    img5 = loadImage('images/win.png');
    font1 = loadFont('images/font3.otf');
    font2 = loadFont('images/Mijas-Ultra.otf');
}
function setup() {
    createCanvas(1000,800);
    // create board for player answer and the answer of the game
    for (let i = 0; i < 4; i++) {
        arr[i] = new Array(4);
        player[i] = new Array(4);
    }
    // set all value of player answer board to 0
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            player[i][j] = 0;
        }
    }
    // init the answer of the game
    arr[0][0] = 24;
    arr[0][1] = 25;
    arr[0][2] = 3;
    arr[0][3] = 63;
    arr[1][0] = 46;
    arr[1][1] = 4;
    arr[1][2] = 60;
    arr[1][3] = 15;
    arr[2][0] = 21;
    arr[2][1] = 36;
    arr[2][2] = 12;
    arr[2][3] = 8;
    arr[3][0] = 16;
    arr[3][1] = 1;
    arr[3][2] = 7;
    arr[3][3] = 48;
    player[y1][x1] = arr[x1][y1];
    player[y2][x2] = arr[x2][y2];
    // load wallpaper for the game
}

// checking if the player's answer right or not
function check() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (arr[j][i] !== player[i][j]) {
                return 2;
            }
        }
    }
    return 1;
}

// printf out the verdict for the player's answer
function ans() {
    lock = 0;
    // player win
    if (check() == 1) {
        noLoop();
        background(img5);
        textAlign(CENTER,CENTER);
        if (secondd >= 10) {
            text('Finished in: ' + minutee + ':' + secondd, 200, 100);
        }
        else {
            text('Finished in: ' + minutee + ':0' + secondd, 200, 100);
        }
    }
    // player lose
    else if (check() == 2) {
        background(img4);
        textAlign(CENTER);
        textSize(160);
        fill(0);
        rotate(50);
        text("You Lose!!!", width / 2-100, height / 2+100);
        rotate(-50);
        textSize(45);
        stroke('black');
        image(img3,400, 550, 200, 75);
        noStroke();
        textFont(font1);
        text('Retry', 500, 605);
        textFont(font2);
        page = 1;
        // player can choose to retry or not
        if (posix >= 400 && posix <= 600 && posiy >= 550 && posiy <= 600) {
            console.log(posix);
            console.log(posiy);
            posix = 0;
            posiy = 0;
            page = 3;
        }
    }
}
// update the location of the block is being choosed, the newest point on the screen that is clicked
function mousePressed() {
    posx = (mouseX - 200) / 100;
    posy = (mouseY - 200) / 100;
    possx = posx.toFixed(0);
    possy = posy.toFixed(0);
    posix = mouseX;
    posiy = mouseY;
    if (posx - possx < 0) {
        posx = possx - 1;
    }
    else {
        posx = possx;
    }
    if (posy - possy < 0) {
        posy = possy - 1;
    }
    else {
        posy = possy;
    }
}
// erase the number that the player has typed
function keyPressed() {
    if (keyCode === BACKSPACE) {
        player[posx][posy] = (player[posx][posy] - player[posx][posy] % 10) / 10;
    }
}
// update the number in the block that is being choosed with the number that the player typed
function keyTyped() {
    var value;
    if (key == '0') value = 0;
    else if (key == '1') value = 1;
    else if (key == '2') value = 2;
    else if (key == '3') value = 3;
    else if (key == '4') value = 4;
    else if (key == '5') value = 5;
    else if (key == '6') value = 6;
    else if (key == '7') value = 7;
    else if (key == '8') value = 8;
    else if (key == '9') value = 9;
    else {
        return;
    }
    player[posx][posy] = player[posx][posy] * 10 + value;
    if (player[posx][posy] > 63 || player[posx][posy] < 1) {
        player[posx][posy] = (player[posx][posy] - player[posx][posy] % 10) / 10;
    }
}
var xx = 0;
function draw() {
    if (page == 3) {
        startingtime = millis();
        // reset the game so the player can retry
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                player[i][j] = 0;
            }
        }
        player[y1][x1] = arr[x1][y1];
        player[y2][x2] = arr[x2][y2];
        page = 0;
        loop();
    }
    if (page == 0 || page == 3) {

        background(img2);
        textFont(font2);
        var millisecond = millis() - startingtime;
        secondd = millisecond / 1000;
        secondd = secondd.toFixed(0);
        minutee = 0;
        while (secondd >= 60) {
            secondd -= 60;
            minutee++;
        }
        textSize(35);
        fill(0);
        if (secondd >= 10) {
            text('Time: ' + minutee + ':' + secondd, 800, 170);
        }
        else {
            text('Time: ' + minutee + ':0' + secondd, 800, 170);
        }
        page = 0;
        lock = 1;
        stroke(0);
        strokeWeight(5);
        textSize(50);
        textAlign(CENTER);
        fill('rgba(255,161,210,0.6)');
        stroke(0);
        // draw the selected block with green
        if (posx >= 0 && posx <= 3 && posy >= 0 && posy <= 3) {
            rect(200 + posx * 100, 200 + posy * 100, 100, 100);
        }
        // print out the condition
        fill('rgba(158,0,93,1)');
        noStroke();
        rect(650, 200, 325, 400);
        textAlign(LEFT, TOP);
        textSize(18);
        noStroke();
        fill('white');
        text('1.A1 = C2 + C3 hoặc A1 = C2 - C3\n2.A2 = A1 + D2\n3.A3 = C3 : B2\n4.A4 = A3 + B3 hoặc A4 = B2 + B3\n5.B1 = A2 + C1 hoặc B1 = A2 - C1\n6.B2 = C3/3\n7.B3 = C3 + D4\n8.B4 = A4 - A3 hoặc B4 = A4 - D4\n9.C1 = A4/3\n10.C2 = B4 + C1\n11.C3 chia hết cho 12\n12.C4 = A1 : A3\n13.D1 = B2 + C3\n14.D2 = C4 + D3 hoặc D2 = C4 - D3\n15.D3 = C1/3\n16.D4 = A3 x D1', 660, 210, 325);
        textAlign(CENTER, BASELINE);
        textSize(50);
        // print out the board and the first two number
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                stroke(158,0,93);
                noFill();
                rect(200 + i * 100, 200 + j * 100, 100, 100);24
                fill(158,0,93);
                noStroke();
                if (j == x1 && i == y1) {
                    text(arr[j][i], 250 + i * 100, 266 + j * 100);
                }
                if (j == x2 && i == y2) {
                    text(arr[j][i], 250 + i * 100, 266 + j * 100);
                }
            }
        }
        text('A', 150, 266);
        text('B', 150, 366);
        text('C', 150, 466);
        text('D', 150, 566);
        for (let i = 0; i < 4; i++) {
            text(i + 1, 250 + i * 100, 166);
        }
        fill(158,0,93);
        // print out the player answer on the board
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (player[i][j] != 0) {
                    if (j == x1 && i == y1) {
                        continue;
                    }
                    if (j == x2 && i == y2) {
                        continue;
                    }
                    text(player[i][j], 250 + i * 100, 266 + j * 100);
                }
            }
        }
        // print out the block which contain the same number with other block
        stroke(158,0,93);
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                for (let k = 0; k < 4; k++) {
                    for (let u = 0; u < 4; u++) {
                        if (i == k && j == u) {
                            continue;
                        }
                        else {
                            if (player[i][j] == player[k][u] && player[i][j] != 0) {
                                fill('rgba(112,4,76,1)');
                                rect(200 + i * 100, 200 + j * 100, 100, 100);
                                fill(255);
                                text(player[i][j], 250 + i * 100, 266 + j * 100);
                            }
                        }
                    }
                }
            }
        }
        // print the 'check' button
        fill('red');
        stroke('black');
        image(img3,300, 650, 200, 75);
        fill(255);
        noStroke();
        text('Check', 400, 705);
    }
    else if (page == 2) {
        // introduction
        background(img);
        textSize(80);
        textAlign(CENTER);
        fill(158,0,93);
        textFont(font1);
        text('Mật mã số', width / 2, 150);
        strokeWeight(4);
        stroke(0);
        image(img3,width / 2 - 100, 650, 200, 75);
        noStroke();
        fill(255);
        textSize(40);
        text('Start', width / 2, 702);
        stroke(0);
        fill('rgba(255,255,255,0.7)');
        rect(width / 2 - 290, 200, 580, 400);
        textAlign(LEFT, TOP);
        fill(241,90,36);
        noStroke();
        textSize(25);
        text("Adrian quyết định đưa trò Mật Mã Số vào quyển tiểu thuyết trinh thám đang viết, trong đó người hùng của câu chuyện - Arthur, là một giáo sư toán chuyển nghề làm thám tử tư, vừa tìm được vài manh mối và phải nhanh tìm ra câu trả lời đúng để điền vào ô số. Bạn hãy giúp Adrian một tay nào, biết rằng tất cả đều là số nguyên, không có hai số nào giống nhau, không có số nào bé hơn 1 hay lớn hơn 63. Trong khung đã có sẵn hai số để bắt đầu", width / 2 - 250, 220, 500);
        textAlign(CENTER, BASELINE);
        textSize(50);
        if (posix >= width / 2 - 100 && posix <= width / 2 + 100 && posiy >= 650 && posiy <= 725) {
            posix = 0;
            posiy = 0;
            page = 0;
            startingtime = millis();
        }
    }
    else {
        ans();
    }
    if (posix >= 300 && posiy >= 650 && posix <= 500 && posiy <= 725 && lock == 1) {
        // checking if the player click the 'check' button or not
        posix = 0;
        posiy = 0;
        ans();
    }
}
