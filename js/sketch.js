var theta;
var len;
var sentence;
var rules;
var kelp;
var reset;
var a;
var aLabel;
var offset;
var offsetLabel;
var grow;
var canvas;
var maxLen = 20;

function generate(instructions) {
    var next = "";
    for (i = 0; i < instructions.length; i++) {
        next += rules[instructions.charAt(i)];
    }
    return next;
}

function setup() {
    var canvas = createCanvas(500, 500);
    canvas.parent("#canvas");
    responsive();
    rules = {
        "X": "FL[[X]RX]RF[RFX]LX",
        "F": "FF",
        'R': "R",
        "]": "]",
        "[": "[",
        "L": "L"
    };
    aLabel = createP("Angle");
    aLabel.parent("#controls");
    a = createSlider(0, 45, 25);
    a.parent("#controls");
    offsetLabel = createP("Offset");
    offsetLabel.parent("#controls");
    offset = createSlider(0, 30, 0);
    offset.parent("#controls");
    grow = createButton("Grow");
    grow.mousePressed(go);
    grow.parent("#controls");
    reset = createButton("Reset");
    reset.mousePressed(resetKelp);
    reset.parent("#controls");
    kelp = createP("Kelp is fully grown!");
    kelp.id("alert");
    kelp.hide();
    kelp.parent("#controls");
    theta = radians(a.value());

}

function go() {
    if (sentence.length > 10000) {
        kelp.show();
    } else {
        theta = radians(a.value());
        sentence = generate(sentence);
        follow(sentence, len, theta);
        len *= .7;
    }

    
}

function resetKelp() {
    sentence = "X";
    background(51);
    kelp.hide();
    len = maxLen;
}

function windowResized() {
    responsive();
}

function responsive() {
    if (windowWidth < 1100) {
        resizeCanvas(windowWidth*.5, windowWidth*.5);
        maxLen = floor(.05*windowWidth);
    } else {
        resizeCanvas(500, 500);
        maxLen = 20;
    }
    background(51);
    sentence = "X";
    len = maxLen;
}

function follow(instructions, len, angle) {
    var options = [
        {letter: "F",
         action: function() {
            line(0,0,0,-len);
            translate(0, -len);
        }},
        {letter: "L",
        action:  function() {
            rotate(angle);
        }},
        {letter: "R",
        action: function() {
            rotate(-angle+radians(offset.value()));
        }},
        {letter: "[",
        action: function() {push();}},
        {letter: "]",
        action: function() {pop();}},
        {letter: "X",
        action: function(){}}
    ]
    resetMatrix();
    translate(width/2, height);
    
    background(51);
    stroke(255);
    console.log(instructions);
    for (i=0; i < instructions.length; i++) {
        for (j=0; j < options.length; j++) {
            if (options[j].letter == instructions.charAt(i)) {
                options[j].action();
                break;
            }
        }
    }
}
