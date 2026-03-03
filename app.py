from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json

    age = int(data['age'])
    weight = int(data['weight'])
    symptoms = data['symptoms']
    latitude = data['latitude']
    longitude = data['longitude']

    # Risk Logic
    if age >= 40 or weight >= 90 or symptoms == "severe":
        risk = "HIGH"
        hospital = "Apollo Hospitals"
    elif age >= 30 or weight >= 75 or symptoms == "mild":
        risk = "MODERATE"
        hospital = "Government Hospital"
    else:
        risk = "LOW"
        hospital = "Primary Health Center"

    maps_link = f"https://www.google.com/maps/search/{hospital.replace(' ', '+')}/@{latitude},{longitude}"

    return jsonify({"risk": risk, "hospital": hospital, "map": maps_link})

if __name__ == '__main__':
    app.run(debug=True)