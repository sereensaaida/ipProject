//Script For the Forms part of the order Page!
function confirmOrder() {
   

    // Get form elements
    const form = document.getElementById('orderForm');
    const elements = form.elements;

    // Check mandatory fields
    let mandatoryFields = ['name', 'phoneNumber', 'address', 'city', 'province', 'cardholderName', 'cardNumber', 'code', 'expiryDay', 'expiryMonth'];
    if (elements['pickupCheckbox'].checked) {
        // If pickup checkbox is checked, remove address, city, province from mandatory fields
        mandatoryFields = mandatoryFields.filter(field => !['address', 'city', 'province'].includes(field));
    } else {
        // If pickup checkbox is not checked, pickup date is mandatory
        mandatoryFields.push('pickupDate');
    }

    let missingFields = [];
    mandatoryFields.forEach(field => {
        const value = elements[field].value.trim();
        if (!value) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        alert(`Please fill in the following mandatory fields: ${missingFields.join(', ')}`);
        highlightMandatoryFields(missingFields);
        return;
    }
    
   
    
    
    let name = document.getElementsByName('name')[0].value;
    let phoneNumber = document.getElementsByName('phoneNumber')[0].value;
    let address = document.getElementsByName('address')[0].value;
    let city = document.getElementsByName('city')[0].value;
    let province = document.getElementsByName('province')[0].value;
    let pickupDate = document.getElementsByName('pickupDate')[0].value;
    let pickupCheckbox = document.getElementsByName('pickupCheckbox')[0].checked ? 'Pick up from shop' : 'Delivery';
    
    // Create a JSON object
    const orderData = {
        order: document.getElementById("addedItems").textContent,
        price: document.getElementById("totalPrice").textContent,
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        city: city,
        province: province,
        pickupDate: pickupDate,
        pickupOption: pickupCheckbox
    };
    
    // Convert the JSON object to a string
    const jsonString = `{
        "order": "${document.getElementById("addedItems").textContent}",
        "price": "${document.getElementById("totalPrice").textContent}",
        "name": "${name}",
        "phoneNumber": "${phoneNumber}",
        "address": "${address}",
        "city": "${city}",
        "province": "${province}",
        "pickupDate": "${pickupDate}",
        "pickupOption": "${pickupCheckbox}"
    }`;
    
    // Create a paragraph element
    const par = document.createElement("p");
    
    // Create a text node with the JSON string
    const node = document.createTextNode(jsonString);
    
    // Append the text node to the paragraph
    par.appendChild(node);
    
    // Append the paragraph to the history div
    document.getElementById("history").appendChild(par);
    
    // Display order placed alert
    alert('Order has been placed!');
    
    // Reset styles
    resetStyles();
    
    // Clear form fields
    clearFields(form);
}

function resetStyles() {
    const mandatoryFields = document.querySelectorAll('.mandatory');
    mandatoryFields.forEach(field => {
        field.style.border = 'none';
    });
}

function highlightMandatoryFields(fields) {
    fields.forEach(field => {
        const element = document.getElementsByName(field)[0];
        element.style.border = '2px solid red';
    });
}

function clearFields(form) {
    form.reset();
}

    function addToCart() {
        const radioButtons = document.querySelectorAll('input[type="radio"]:checked');

        const cartInfo = Array.from(radioButtons).reduce((acc, radioButton) => {
            const itemName = radioButton.value;
            const itemCost = parseFloat(radioButton.getAttribute('data-cost'));

            acc.cartItems.push(itemName);
            acc.totalCost += itemCost;

            return acc;
        }, { cartItems: [], totalCost: 0 });

        // Redirect to the order.html page with parameters
        window.location.href = `Order.html?items=${cartInfo.cartItems.join('%0A')}&totalCost=${cartInfo.totalCost.toFixed(2)}`;
    }

    //JSON array to hold all listings for the cup: with their cost, image and title
    const cupOptions = [
        { "type": "Paper cup with lid", "image": "cup1.png", "cost": 0.00 },
        { "type": "Sundae plastic cup", "image": "cup2.png", "cost": 0.75 },
        { "type": "Melting paper cup", "image": "cup3.png", "cost": 0.00 },
        { "type": "Pleated paper cup", "image": "cup4.png", "cost": 0.00 },
        { "type": "Shiny border paper cup", "image": "cup5.png", "cost": 0.00 },
        { "type": "Chocolate mousse cup", "image": "cup6.png", "cost": 1.00 },
        { "type": "Plastic square cup", "image": "cup7.png", "cost": 0.75 },
        { "type": "Plastic round cup", "image": "cup8.png", "cost": 0.75 }
    ];


    const dessertOptions = [
        { "type": "Ice cream", "image": "main1.png", "cost": 5.00 },
        { "type": "Shaved ice", "image": "main2.png", "cost": 4.00 },
        { "type": "Smoothie", "image": "main3.png", "cost": 4.00 }
    ];

    const toppingOptions = [
        { "type": "Strawberries", "image": "top1.png", "cost": 1.00 },
        { "type": "Cherries", "image": "top2.png", "cost": 1.00 },
        { "type": "Melted chocolate", "image": "top3.png", "cost": 0.50 },
        { "type": "Melted white chocolate", "image": "top4.png", "cost": 0.50 },
        { "type": "Fruit syrup", "image": "top5.png", "cost": 0.50 },
        { "type": "Sprinkles", "image": "top6.png", "cost": 0.75 },
        { "type": "Chocolate chip", "image": "top7.png", "cost": 0.75 },
        { "type": "Caramel", "image": "top8.png", "cost": 0.50 },
        { "type": "Blueberries", "image": "top9.png", "cost": 1.00 },
        { "type": "Raspberries", "image": "top10.png", "cost": 1.00 }
    ]

    // Function to generate HTML for cup options from the previous array
    function generateCupOptions() {
        const cupOptionsContainer = document.getElementById('cupOptions');

        cupOptions.forEach(option => {
            const div = document.createElement('div');
            div.style.margin = "10px";

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'cup';
            radioInput.value = option.type;
            radioInput.dataset.cost = option.cost;

            const cupImage = document.createElement('img');
            cupImage.src = option.image;
            cupImage.alt = option.type;
            cupImage.style.height = "250px";
            cupImage.style.width = "250px";

            div.appendChild(radioInput);
            div.appendChild(cupImage);

            cupOptionsContainer.appendChild(div);
        });
    }

    function generateDessertOptions(){
        const dessertOptionsContainer = document.getElementById('mainOptions');

        dessertOptions.forEach(option => {

            const div = document.createElement('div');
            div.style.margin = "10px";
            

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'main';
            radioInput.value = option.type;
            radioInput.dataset.cost = option.cost;

            const mainImage = document.createElement('img');
            mainImage.src = option.image;
            mainImage.alt = option.type;
            mainImage.style.height = "300px";
            mainImage.style.width = "300px";

            div.appendChild(radioInput);
            div.appendChild(mainImage);

            dessertOptionsContainer.appendChild(div);
        });
    }

    function generateToppingOptions(){
        const toppingOptionsContainer = document.getElementById('toppingOptions');

        toppingOptions.forEach(option => {
            const div = document.createElement('div');
            div.style.margin = "10px";

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'top';
            radioInput.value = option.type;
            radioInput.dataset.cost = option.cost;

            const topImage = document.createElement('img');
            topImage.src = option.image;
            topImage.alt = option.type;
            topImage.style.height = "200px";
            topImage.style.width = "200px";

            div.appendChild(radioInput);
            div.appendChild(topImage);

            toppingOptionsContainer.appendChild(div);
        });
    }


    //function to load doc (AJAX)
    function loadDoc(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET","homeAjax.txt", false);
        xhttp.send();
        document.getElementById("homeInformation").innerHTML = xhttp.responseText;
    }

    window.onload = function loadAboutTxt(){
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET","aboutAboutAjax.txt", false);
        xhttp.send();
        document.getElementById("aboutAboutInformation").innerHTML = xhttp.responseText;
    }

    


    // Call the function to generate cup options on page load
    generateCupOptions();
    generateDessertOptions();
    generateToppingOptions();
