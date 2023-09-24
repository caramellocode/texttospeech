let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

const allowedVoices = ["Google Deutsch", "Google US English", "Google Italiano", "Superstar"]; // Liste der Stimmen, die Sie zulassen möchten

const populateVoices = () => {
    voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) {
        window.setTimeout(populateVoices, 100);
    } else {
        voiceSelect.innerHTML = ""; // Zuvor hinzugefügte Optionen löschen
        voices.forEach((voice) => {
            if (allowedVoices.includes(voice.name)) {
                let option = document.createElement("option");
                option.value = voice.name;
                option.textContent = voice.name;
                voiceSelect.appendChild(option);
            }
        });
    }
};

populateVoices();

voiceSelect.addEventListener("change", () => {
    speech.voice = voices.find(v => v.name === voiceSelect.value);
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

