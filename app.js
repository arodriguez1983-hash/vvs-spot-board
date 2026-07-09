let totalSpots = 100;
let takenSpots = [];

const board = document.getElementById("board");
const spotCount = document.getElementById("spotCount");
const total = document.getElementById("total");
const taken = document.getElementById("taken");
const remaining = document.getElementById("remaining");
const buildBtn = document.getElementById("buildBtn");
const resetBtn = document.getElementById("resetBtn");

function loadGame(){
    const saved = localStorage.getItem("vvsSpotBoard");

    if(saved){
        const data = JSON.parse(saved);
        totalSpots = data.totalSpots || 100;
        takenSpots = data.takenSpots || [];
    }

    spotCount.value = totalSpots;
}

function saveGame(){
    localStorage.setItem("vvsSpotBoard", JSON.stringify({
        totalSpots,
        takenSpots
    }));
}

function updateStats(){
    total.textContent = totalSpots;
    taken.textContent = takenSpots.length;
    remaining.textContent = totalSpots - takenSpots.length;
}

function renderBoard(){
    board.innerHTML = "";

    for(let i = 1; i <= totalSpots; i++){
        const spot = document.createElement("div");
        spot.className = "spot";
        spot.textContent = i;

        if(takenSpots.includes(i)){
            spot.classList.add("taken");
        }

        spot.addEventListener("click", () => {
            if(takenSpots.includes(i)){
                takenSpots = takenSpots.filter(num => num !== i);
            }else{
                takenSpots.push(i);
            }

            saveGame();
            renderBoard();
        });

        board.appendChild(spot);
    }

    updateStats();
}

buildBtn.addEventListener("click", () => {
    const newTotal = Number(spotCount.value);

    if(!newTotal || newTotal < 1){
        alert("Enter a valid number of spots.");
        return;
    }

    totalSpots = newTotal;
    takenSpots = takenSpots.filter(num => num <= totalSpots);

    saveGame();
    renderBoard();
});

resetBtn.addEventListener("click", () => {
    if(confirm("Reset all taken spots?")){
        takenSpots = [];
        saveGame();
        renderBoard();
    }
});

loadGame();
renderBoard();