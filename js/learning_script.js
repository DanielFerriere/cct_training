const shapeSelect = document.getElementById("shapeSelect"),
    kinematicSelect = document.getElementById("kinematicSelect"),
    materialSelect = document.getElementById("materialSelect"),
    shapeList = document.getElementById("shapeList"),
    kinematicList = document.getElementById("kinematicList"),
    materialList = document.getElementById("materialList");



/*
var temp = document.createElement("p");
temp.innerText = "lebron james";
shapeList.appendChild(temp);
temp = document.createElement("p");
temp.innerText = "stefen curry";
shapeList.appendChild(temp);
*/


function create_element_title(eltName) {
    let divTag = document.createElement("div");
    let h3Tag = document.createElement("h3");
    let aTag = document.createElement("a");

    divTag.classList.add("flex-row");

    h3Tag.innerText = eltName;

    aTag.innerText = "#";
    aTag.href = "#" + eltName;

    divTag.appendChild(h3Tag);
    divTag.appendChild(aTag);

    return divTag;
}

function create_element_tips(elt, i) {
    let divTag = document.createElement("div");
    let pTag = document.createElement("p");

    divTag.classList.add("flex-column");

    pTag.classList.add( (i%2==0) ? "text-align-left" : "text-align-right" );
    pTag.innerHTML = (typeof elt["tips"] === 'undefined') ? "Aucun tips" : elt["tips"];

    divTag.appendChild(create_element_title(elt["name"]));
    divTag.appendChild(pTag);

    return divTag;
}

function create_element_line(elt, i) {
    let liTag = document.createElement("li");
    let imgTag = document.createElement("img");
    
    liTag.classList.add( (i%2==0) ? "flex-row" : "flex-row-reverse");
    
    imgTag.src = elt["file"];

    liTag.appendChild(imgTag);
    liTag.appendChild(create_element_tips(elt, i));

    return liTag;
}



async function create_module_lists() {
    let response;
    let json_data;

    response = await fetch("./assets/shape/image.json");
    json_data = await response.json();
    let shapeRef = json_data["name_file_fr"].map((elt) => {
        elt["file"] = "./assets/shape/" + elt["file"];
        return elt;
    });

    response = await fetch("./assets/kinematic/image.json");
    json_data = await response.json();
    let kinematicRef = json_data["name_file_fr"];

    response = await fetch("./assets/material/image.json");
    json_data = await response.json();
    let materialRef = json_data["name_file_fr"];

    test(shapeRef);
    
}

function test(shapeRef) {
    //shapeList.appendChild(create_element_line(shapeRef[3], 3));
    for (let i = 0; i<shapeRef.length; i++) {
        shapeList.appendChild(create_element_line(shapeRef[i], i));
    }
}



create_module_lists();