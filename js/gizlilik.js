document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("privacy-modal");
    const acceptBtn = document.getElementById("accept-privacy");

    // Daha önce kabul edilmişse modalı gösterme
    if (localStorage.getItem("privacyAccepted") === "true") {
        modal.style.display = "none";
        return;
    }

    // İlk kez geliyorsa modalı göster
    modal.style.display = "flex";

    // Kabul edince kayıt yap
    acceptBtn.addEventListener("click", function () {
        localStorage.setItem("privacyAccepted", "true");
        modal.style.display = "none";
    });
});
