const shapeSelect = document.getElementById("shapeSelect"),
    kinematicSelect = document.getElementById("kinematicSelect"),
    materialSelect = document.getElementById("materialSelect"),
    shapeList = document.getElementById("shapeList"),
    kinematicList = document.getElementById("kinematicList"),
    materialList = document.getElementById("materialList");




/**
 * Convert a string into a friendly link string
 * @param {String} string - string to convert
 * @returns {String} - return a friendly link string
 */
function transform_to_string_link(string) {
    return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^A-Za-z]/g,'-');
}

/**
 * Create a title div for images
 * @param {String} eltName - name of the image
 * @param {int} i - occurence of the images in the module
 * @returns {HTMLElement} - return a div for the image title
 */
function create_element_title(eltName, i) {
    let divTag = document.createElement("div");
    let h3Tag = document.createElement("h3");
    let aTag = document.createElement("a");

    divTag.classList.add("flex-row");

    h3Tag.innerText = eltName;
    h3Tag.classList.add( (i%2==0) ? "text-align-left" : "text-align-right" );

    aTag.innerText = "#";
    aTag.href = "#" + transform_to_string_link(eltName);

    h3Tag.appendChild(aTag);
    divTag.appendChild(h3Tag);

    return divTag;
}

/**
 * Create a tips div for images
 * @param {Object} elt - element containing image, link and tips
 * @param {int} i - occurence of the images in the module
 * @returns {HTMLElement} - return a div for the image tips
 */
function create_element_tips(elt, i) {
    let divTag = document.createElement("div");
    let pTag = document.createElement("p");

    divTag.classList.add("flex-column");

    pTag.classList.add( (i%2==0) ? "text-align-left" : "text-align-right" );
    pTag.innerHTML = (typeof elt["tips"] === 'undefined' || elt["tips"] == "") ? "Aucun tips" : elt["tips"];

    divTag.appendChild(create_element_title(elt["name"], i));
    divTag.appendChild(pTag);

    return divTag;
}

/**
 * Create line HTMLElement for an image
 * @param {Object} elt - element containing image, link and tips
 * @param {int} i - occurence of the images in the module
 * @returns {HTMLElement} - return a line for the image
 */
function create_element_line(elt, i) {
    let liTag = document.createElement("li");
    let imgTag = document.createElement("img");
    
    liTag.classList.add( (i%2==0) ? "flex-row" : "flex-row-reverse");
    
    imgTag.src = elt["file"];

    liTag.appendChild(imgTag);
    liTag.appendChild(create_element_tips(elt, i));

    liTag.id = transform_to_string_link(elt["name"]);

    return liTag;
}

/**
 * Create an option HTMLElement to add in a select HTMLElement
 * @param {Object} elt - element containing image, link and tips
 * @returns {HTMLElement} - return a option HTMLElement
 */
function create_element_option(elt) {
    let optionTag = document.createElement("option");

    optionTag.value = elt["name"];
    optionTag.innerText = elt["name"];

    return optionTag;
}

/**
 * Add element into module list and select
 * @param {Array} shapeRef - array containing usual shape element containing itself image, link and tips
 * @param {Array} kinematicRef - array containing kinematic link element containing itself image, link and tips
 * @param {Array} materialRef - array containing material element containing itself image, link and tips
 */
function create_module_lists(shapeRef, kinematicRef, materialRef) {
    /*shapeList.appendChild(create_element_line(shapeRef[3], 3));*/
    for (let i = 0; i<shapeRef.length; i++) {
        shapeList.appendChild(create_element_line(shapeRef[i], i));
        shapeSelect.appendChild(create_element_option(shapeRef[i]));
    }

    for (let i = 0; i<kinematicRef.length; i++) {
        kinematicList.appendChild(create_element_line(kinematicRef[i], i));
        kinematicSelect.appendChild(create_element_option(kinematicRef[i]));
    }

    for (let i = 0; i<materialRef.length; i++) {
        materialList.appendChild(create_element_line(materialRef[i], i));
        materialSelect.appendChild(create_element_option(materialRef[i]));
    }
}



/**
 * Get the reference from all module
 * @returns {Array[Array]} - return usual shape reference, kinematic link refernce and material reference
 */
async function get_references() {
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
    let kinematicRef = json_data["name_file_fr"].map((elt) => {
        elt["file"] = "./assets/kinematic/" + elt["file"];
        return elt;
    });

    response = await fetch("./assets/material/image.json");
    json_data = await response.json();
    let materialRef = json_data["name_file_fr"].map((elt) => {
        elt["file"] = "./assets/material/" + elt["file"];
        return elt;
    });

    
    return [shapeRef, kinematicRef, materialRef];
}


//Select event handlers
shapeSelect.addEventListener("change", (event) => {
    window.location.href = "#" + transform_to_string_link(event.target.value);
    shapeSelect.value = "";
});

kinematicSelect.addEventListener("change", (event) => {
    window.location.href = "#" + transform_to_string_link(event.target.value);
    kinematicSelect.value = "";
});

materialSelect.addEventListener("change", (event) => {
    window.location.href = "#" + transform_to_string_link(event.target.value);
    materialSelect.value = "";
});





//create module list
get_references().then( (value) => {
    create_module_lists(value[0], value[1], value[2]);
});