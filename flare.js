svgns = "http://www.w3.org/2000/svg";

svgElem = document.getElementById("flarecontainer");
svgElem.setAttribute("xmlns", svgns);

// link number/range
for (i = 0; i < document.querySelectorAll('input[type=number]').length; i++) {
    document.querySelectorAll("input[type=range]")[i].oninput = new Function("document.querySelectorAll('input[type=number]')[" + i.toString() + "].value = document.querySelectorAll('input[type=range]')[" + i.toString() + "].value");
    document.querySelectorAll("input[type=number]")[i].onkeyup = new Function("document.querySelectorAll('input[type=range]')[" + i.toString() + "].value = document.querySelectorAll('input[type=number]')[" + i.toString() + "].value");
}

function drawFlare(flareX, flareY, hotspotscale, streakscale, randomseed) {

    // use random seed - thanks to http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html
    Math.seedrandom(randomseed);

    // clear old
    svgElem.innerHTML = "";

    // black bg
    background = document.createElementNS(svgns, "rect");
    background.setAttribute("width", 800);
    background.setAttribute("height", 450);
    background.style.fill = "black";
    svgElem.appendChild(background);

    flareCenter = [flareX - 400, flareY - 225];

    x = flareCenter[0];
    y = flareCenter[1];

    // multi-iris towards lens
    for (i = 0; i < 55; i++) {
        x += (0 - flareCenter[0]) / 20
        y += (0 - flareCenter[1]) / 20;
        if (Math.random() < 0.35) {
            iris = document.createElementNS(svgns, "path");
            iris.setAttribute("d", "M431.16 225L422.04 247.04L400 256.16L377.96 247.04L368.84 225L377.96 202.96L400 193.84L422.04 202.96L431.16 225Z");
            iris.setAttribute("transform", "translate(" + x.toString() + ", " + y.toString() + ")\nscale(" + (Math.random() * (i / 30)).toString() + ")");
            iris.setAttribute("opacity", Math.random() / 3);
            iris.style.transformOrigin = "center";
            iris.style.fill = "white";
            iris.style.mixBlendMode = "screen";
            svgElem.appendChild(iris);
        }
    }

    x = flareCenter[0];
    y = flareCenter[1];
    
    // multi-iris away from lens
    for (i = 0; i < 25; i++) {
        x -= (0 - flareCenter[0]) / 20
        y -= (0 - flareCenter[1]) / 20;
        if (Math.random() < 0.35) {
            iris = document.createElementNS(svgns, "path");
            iris.setAttribute("d", "M431.16 225L422.04 247.04L400 256.16L377.96 247.04L368.84 225L377.96 202.96L400 193.84L422.04 202.96L431.16 225Z");
            iris.setAttribute("transform", "translate(" + x.toString() + ", " + y.toString() + ")\nscale(" + (Math.random() * (i / 30)).toString() + ")");
            iris.setAttribute("opacity", Math.random() / 3);
            iris.style.transformOrigin = "center";
            iris.style.fill = "white";
            iris.style.mixBlendMode = "screen";
            svgElem.appendChild(iris);
        }
    }

    hotspot = document.createElementNS(svgns, "path");
    hotspot.setAttribute("d", "M570.33 225L416.45 229.41L547.51 310.16L412.04 237.04L485.16 372.51L404.41 241.45L400 395.33L395.59 241.45L314.84 372.51L387.96 237.04L252.49 310.16L383.55 229.41L229.67 225L383.55 220.59L252.49 139.84L387.96 212.96L314.84 77.49L395.59 208.55L400 54.67L404.41 208.55L485.16 77.49L412.04 212.96L547.51 139.84L416.45 220.59L570.33 225Z");
    hotspot.setAttribute("transform", "translate(" + flareCenter[0] + ", " + flareCenter[1] + ")\nscale(" + (0.35 * hotspotscale).toString() + ")");
    hotspot.style.transformOrigin = "center";
    hotspot.style.fill = "white";
    hotspot.style.mixBlendMode = "screen";
    svgElem.appendChild(hotspot);

    halo = document.createElementNS(svgns, "circle");
    halo.setAttribute("cx", 400);
    halo.setAttribute("cy", 225);
    halo.setAttribute("r", 50 * hotspotscale);
    halo.setAttribute("transform", "translate(" + flareCenter[0] + ", " + flareCenter[1] + ")");
    halo.setAttribute("opacity", 0.1);
    halo.style.fill = "white";
    halo.style.mixBlendMode = "screen";
    svgElem.appendChild(halo);

    streak = document.createElementNS(svgns, "path");
    streak.setAttribute("d", "M603 225L400 230L197 225L400 220L603 225Z");
    streak.setAttribute("transform", "translate(" + flareCenter[0] + ", " + flareCenter[1] + ")\nscale(" + streakscale.toString() + ", 0.4)");
    streak.style.transformOrigin = "center";
    streak.style.fill = "white";
    streak.style.mixBlendMode = "screen";
    svgElem.appendChild(streak);

}

function exportFlare() {
    file = new Blob([svgElem.outerHTML], {type: "svg"});
    downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(file);
    downloadLink.download = "my_lens_flare.svg";
    downloadLink.click();
}

// check for form updating
function readFormData() {
    x = parseFloat(document.querySelector('input[name=x]').value);
    y = parseFloat(document.querySelector('input[name=y]').value);
    novascale = parseFloat(document.querySelector('input[name=novascale]').value);
    streakscale = parseFloat(document.querySelector('input[name=streakscale]').value);
    seed = parseFloat(document.querySelector('input[name=randseed]').value);
    drawFlare(x, y, novascale, streakscale, seed);
}
for (inputbox of document.getElementsByTagName("input")) {
    inputbox.addEventListener("keyup", readFormData);
    inputbox.addEventListener("input", readFormData);
}

// drawFlare(200, 200, 1, 1, "hi");
readFormData();

/*
// animation just for fun
x_value = 0;
function animation() {
    drawFlare(x_value, 100, 1, 1, "hi");
    x_value++;
    if (x_value <= 800) {
        requestAnimationFrame(animation);
    }
}
animation();
*/