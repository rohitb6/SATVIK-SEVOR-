// EmailJS Initialization Wrapper
// This script initializes EmailJS when the library loads

// Set a flag to check if EmailJS is available
var emailjsReady = false;

// Check for EmailJS library
if (typeof emailjs !== 'undefined') {
    emailjsReady = true;
    console.log('EmailJS library detected');
    emailjs.init({
        publicKey: 'cUQj-L8UX_uB68Rtu'
    });
    console.log('EmailJS initialized with public key');
}

// Create a wrapper function for sending emails
window.sendContactEmail = function(templateParams) {
    if (!emailjsReady) {
        console.error('EmailJS is not ready yet');
        return Promise.reject('EmailJS not initialized');
    }
    
    return emailjs.send('service_soyqm3r', 'template_g2emh1a', templateParams);
};

// Mark as ready
document.addEventListener('DOMContentLoaded', function() {
    window.emailjsReady = true;
    console.log('EmailJS wrapper ready');
});
