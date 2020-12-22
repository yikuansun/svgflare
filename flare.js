svgns = "http://www.w3.org/2000/svg";

svgElem = document.getElementById("flarecontainer");

// black bg
background = document.createElementNS(svgns, "rect");
background.setAttribute("width", 800);
background.setAttribute("height", 450);
background.style.fill = "black";
svgElem.appendChild(background);

flareCenter = [-200, -100]; // just to test

x = flareCenter[0];
y = flareCenter[1];

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
        svgElem.appendChild(iris);
    }
}

hotspot = document.createElementNS(svgns, "path");
hotspot.setAttribute("d", "M570.33 225L416.45 229.41L547.51 310.16L412.04 237.04L485.16 372.51L404.41 241.45L400 395.33L395.59 241.45L314.84 372.51L387.96 237.04L252.49 310.16L383.55 229.41L229.67 225L383.55 220.59L252.49 139.84L387.96 212.96L314.84 77.49L395.59 208.55L400 54.67L404.41 208.55L485.16 77.49L412.04 212.96L547.51 139.84L416.45 220.59L570.33 225Z");
hotspot.setAttribute("transform", "translate(" + flareCenter[0] + ", " + flareCenter[1] + ")\nscale(0.35)");
hotspot.style.transformOrigin = "center";
hotspot.style.fill = "white";
svgElem.appendChild(hotspot);