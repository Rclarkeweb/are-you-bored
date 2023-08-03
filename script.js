// Select elements

// Select button that will generate a random activity when clicked
let random_btn = document.getElementById("random");

// Select the go button
let chosen_category_btn = document.getElementById("chosen_category");

// Select element that will display a random activity to the user
let random_display = document.getElementById("display_activity");

// Select element to display random category name
let display_category = document.getElementById("category");

// Select element to display random activity
let display_activity = document.getElementById("activity");

// Select all the radio buttons
let ele = document.getElementsByName('category');

// Select the error message
let error = document.getElementById("error-msg");



// Functions

// Function to call the Bored API and display the activity its category
const generate_activity = (category) => {
    let url = `http://www.boredapi.com/api/activity?type=${category}`;
    fetch(url).then(response => {
        return response.json();
        })
        .then(data => {
            display_category.innerHTML = `${data.type.toUpperCase()}`;
            display_activity.innerHTML = `${data.activity}`;
        });
};


// Function that selects category (radio button) option and triggers the generate activity function
const display_chosen_category = () => {
    // Loop through radio buttons, if checked pass the checked category to the generate activity function
    for (i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
            let result = ele[i].value;
            generate_activity(result);
        }
    };
    
};

// Function that checks if radio buttons are unchecked, if yes, display error message
const error_message = () => {
    // Select all checked radio buttons
    var selected = document.querySelector('input[name="category"]:checked');   
    
    // if radio button is selected don't display error msg. If none are checked display error msg
    if (selected) {
        error.style.display = 'none';
    } else {
        error.style.display = 'block';
    }
};


// Function to display a random activity
const pick_random_activity = () => {
    // uncheck any checked radio buttons
    for(var i=0; i<ele.length; i++) {
        ele[i].checked = false;
    };

    // create array of categories
    const categories = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"];

    // Generate a random number between one and 9
    const random = Math.floor(Math.random() * 9);

    // Pick a random category from categories array
    const random_category = categories[random];

    // Call the function to generate an activity
    generate_activity(random_category);

};


// Event Listeners on buttons

// Add event listener to random activity button
random_btn.addEventListener("click", pick_random_activity);

// Add event listener to 'go' button
chosen_category_btn.addEventListener("click", display_chosen_category);

// Add event listener to 'go' button to check for error
chosen_category_btn.addEventListener("click", error_message);


