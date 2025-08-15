const tasks = [
    { question: "Wo ist ___ Kantstraße? - ___ ist hier.", answer: "die - Sie" },
    { question: "Wo ist hier ___ Telefon? - ___ ist dort.", answer: "das - Es" },
    { question: "Wie gefällt Ihnen ___ Lampe? - ___ ist sehr schön.", answer: "die - Sie" },
    { question: "Woher kommt ___ Mann? - ___ kommt aus Österreich.", answer: "der - Er" },
    { question: "Wo sind ___ Tomaten? - ___ sind hier.", answer: "die - Sie" },
    { question: "Wo ist ___ Verkäufer? - ___ kommt sofort.", answer: "der - Er" },
    { question: "Entschuldigung, wo ist ___ Toilette? - ___ ist hier.", answer: "die - Sie" },
    { question: "Gefällt Ihnen ___ Wohnung? - Ja, ___ ist schön.", answer: "die - sie" },
    { question: "Wo ist ___ Bad? - ___ ist dort.", answer: "das - Es" },
    { question: "Wo ist ___ Garage? - ___ ist da.", answer: "die - Sie" },
    { question: "Was kosten ___ Stühle? - ___ sind nicht billig: 180 Euro.", answer: "die - Sie" },
    { question: "Wo ist ___ Wein? - ___ ist dort.", answer: "der - Er" },
    { question: "Welche Farbe hat ___ Schrank? - ___ ist weiß.", answer: "der - Er" },
    { question: "Wie sind ___ Betten? - ___ sind breit.", answer: "die - Sie" },
    { question: "Gefällt Ihnen ___ Haus? - Nein, ___ ist sehr klein.", answer: "das - es" },
    { question: "Wie viel kostet ___ Brot? - ___ kostet 2,90 Euro.", answer: "das - Es" },
    { question: "Wie gefallen Ihnen ___ Möbel? - ___ sind schön.", answer: "die - Sie" },
    { question: "Wie alt ist ___ Tisch? - ___ ist sechs Jahre alt.", answer: "der - Er" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        // card.addEventListener("click", () => {
        //     if (!card.classList.contains("flipped")) {
        //         card.classList.add("flipped");
        //     }
        // });


        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });


        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Prevent card flip
            card.classList.add("fade-out"); // fades out a card when you click the "checked" sign

            // Wait for the transition to finish before removing
            setTimeout(() => {
                card.remove();
                checkEnd();
            }, 600); // Match the CSS transition duration
        };


        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}



// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);

// layout toggling logic

const toggleBtn = document.getElementById("toggleLayoutBtn");
let isStacked = false;

toggleBtn.addEventListener("click", () => {
    isStacked = !isStacked;
    container.classList.toggle("stack-mode", isStacked);
    container.classList.toggle("grid-mode", !isStacked);
});
