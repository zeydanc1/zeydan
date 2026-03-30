document.addEventListener("DOMContentLoaded", function () {
    const cookieBanner = document.getElementById("cookie-banner");
    const cookieModal = document.getElementById("cookie-modal");

    const acceptAllBtn = document.getElementById("accept-all-cookies");
    const manageBtn = document.getElementById("manage-cookies");
    const savePrefBtn = document.getElementById("save-preferences");
    const closeModalBtn = document.getElementById("close-cookie-modal");

    const analyticsCheckbox = document.getElementById("analytics-cookies");
    const marketingCheckbox = document.getElementById("marketing-cookies");

    // Check if cookies are already configured
    if (!localStorage.getItem("cookieConsent")) {
        // Show banner after a short delay
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 1000);
    }

    // Accept All
    acceptAllBtn.addEventListener("click", function () {
        saveCookies({
            necessary: true,
            analytics: true,
            marketing: true
        });
    });

    // Open Preferences (Manage)
    manageBtn.addEventListener("click", function () {
        cookieModal.classList.add("active");
    });

    // Close Modal
    closeModalBtn.addEventListener("click", function () {
        cookieModal.classList.remove("active");
    });

    // Save Preferences
    savePrefBtn.addEventListener("click", function () {
        saveCookies({
            necessary: true,
            analytics: analyticsCheckbox.checked,
            marketing: marketingCheckbox.checked
        });
    });

    function saveCookies(preferences) {
        localStorage.setItem("cookieConsent", "true");
        localStorage.setItem("cookiePreferences", JSON.stringify(preferences));

        // Hide UI
        cookieBanner.classList.remove("show");
        cookieModal.classList.remove("active");

        console.log("Cookie Preferences Saved:", preferences);
        // Here you would normally trigger analytics or pixel tags based on preferences
    }
});
