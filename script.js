function checkRisk() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const bp = document.getElementById("bp").value;
            const heart_rate = document.getElementById("heart_rate").value;
            const spo2 = document.getElementById("spo2").value;

            fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bp: parseInt(bp),
                    heart_rate: parseInt(heart_rate),
                    spo2: parseInt(spo2),
                    lat: lat,
                    lon: lon
                })
            })
            .then(response => response.json())
            .then(data => {

                document.getElementById("result").innerText =
                    "Risk Level: " + data.risk;

                document.getElementById("hospital").innerText =
                    "Recommended Hospital: " + data.recommended_hospital;

                document.getElementById("mapLink").innerHTML =
                    "<a target='_blank' href='https://www.google.com/maps?q=" +
                    data.hospital_lat + "," + data.hospital_lon +
                    "'>Open in Google Maps</a>";

                if (data.risk === "HIGH") {
                    alert("HIGH RISK DETECTED! Visit hospital immediately.");
                }

            });

        });

    } else {
        alert("Geolocation not supported.");
    }
}