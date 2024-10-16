document.getElementById("heatingType").addEventListener("change", function() {
    const selectedValue = this.value;
    const additionalQuestions = document.getElementById("additionalQuestions");

    if (selectedValue) {
        additionalQuestions.style.display = "block";
    } else {
        additionalQuestions.style.display = "none";
    }
});

document.getElementById("modernization").addEventListener("change", function() {
    const selectedValue = this.value;
    const modernizationA = document.getElementById("modernizationA");
    const modernizationB = document.getElementById("modernizationB");

    modernizationA.style.display = "none";
    modernizationB.style.display = "none";

    if (selectedValue === "a") {
        modernizationA.style.display = "block";
    } else if (selectedValue === "b") {
        modernizationB.style.display = "block";
    }
});

document.getElementById("wallsInsulated").addEventListener("change", function() {
    const wallsThicknessDiv = document.getElementById("wallsThicknessDiv");
    wallsThicknessDiv.style.display = this.value === "tak" ? "block" : "none";
});

document.getElementById("futureWallsInsulated").addEventListener("change", function() {
    const futureWallsThicknessDiv = document.getElementById("futureWallsThicknessDiv");
    futureWallsThicknessDiv.style.display = this.value === "tak" ? "block" : "none";
});

document.getElementById("heatingForm").addEventListener("submit", function(event){
    event.preventDefault();
    fetch('http://192.168.1.113:3000/code', { // Updated to localhost for consistency
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    })
    .then(response => response.json())
    .then(data => {
        alert('Dane zostały przesłane pomyślnie.');
        window.location.href = '../dashboard_ekodoradca/dashboard.html'
    })
    .catch((error) => {
        console.error('Błąd:', error);
        alert('Wystąpił błąd podczas przesyłania danych.');
    });
});
