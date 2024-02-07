// content.js

// Declare the variable outside the if statement
let moreInformationLink = document.querySelector('a[href="https://www.iana.org/domains/example"]');

// Check if the variable has already been declared and select the link
if (moreInformationLink) {
    // Simulate a click on the "More information..." link
    moreInformationLink.click();
}
