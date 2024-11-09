function logout() {
    // In real applications, logout will involve clearing the session or redirecting.
    alert("You have logged out.");
    window.location.href = '/login'; // Redirect to login page or home page.
}

function showForm(formType) {
    // Hide all forms first
    const forms = document.querySelectorAll('.form-container');
    forms.forEach(form => form.style.display = "none");

    // Show the selected form based on the button clicked
    if (formType === 'project') {
        document.getElementById("projectForm").style.display = "block";
    } else if (formType === 'client') {
        document.getElementById("clientForm").style.display = "block";
    } else if (formType === 'contact') {
        document.getElementById("contactFormDetails").style.display = "block";
    } else if (formType === 'emails') {
        document.getElementById("subscribedEmails").style.display = "block";
    }
}
