var theta;
var len;
var sentence;
var rules;
var kelp;
var a;
var aLabel;
var offset;
var offsetLabel;
var grow;

function generate(instructions) {
    var next = "";
    for (i = 0; i < instructions.length; i++) {
        next += rules[instructions.charAt(i)];
    }
    return next;
}

function setup() {
    var canvas = createCanvas(500, 500);
    background(51);
    sentence = "X"
    rules = {
        "X": "FL[[X]RX]RF[RFX]LX",
        "F": "FF",
        'R': "R",
        "]": "]",
        "[": "[",
        "L": "L"
    };
    len = 20;


    aLabel = createP("Angle");
    a = createSlider(0, 45, 25);
    offsetLabel = createP("Offset");
    offset = createSlider(0, 30, 0);
    createP("");
    grow = createButton("Grow");
    grow.mousePressed(go);
    kelp = createP("Kelp is fully grown!");
    kelp.id("alert");
    kelp.hide();
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

function keyPressed() {
    sentence = "X";
    background(51);
    kelp.hide();
    len = 20;
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
    for (i=0; i < instructions.length; i++) {
        for (j=0; j < options.length; j++) {
            if (options[j].letter == instructions.charAt(i)) {
                options[j].action();
                break;
            }
        }
    }
}
