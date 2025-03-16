const player = document.getElementById("player");
const goal = document.getElementById("goal");
const walls = document.querySelectorAll(".wall");
const winMessage = document.getElementById("winMessage");
const gameArea = document.getElementById("gameArea");
const gameTitle = document.getElementById("gameTitle");
const gameInstructions = document.getElementById("gameInstructions");

let playerX = 10, playerY = 10;
const speed = 15;

// Oyun alanının sınırlarını al
const gameAreaRect = gameArea.getBoundingClientRect();
const goalRect = goal.getBoundingClientRect();

// Sürekli olarak çok sayıda kalp oluşturan fonksiyon
function createHearts() {
    setInterval(() => {
        for (let i = 0; i < 10; i++) { // Daha fazla kalp üret
            let heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerHTML = "💖";
            heart.style.left = `${Math.random() * window.innerWidth}px`;
            heart.style.top = `${Math.random() * window.innerHeight}px`;
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 3000); // Kalpler 3 saniye sonra kaybolacak
        }
    }, 200); // Her 200 milisaniyede bir kalp fırlat
}

// Topun oyun alanından çıkmasını engelleyen fonksiyon
function isInsideGameArea(x, y) {
    return (
        x >= 0 &&
        y >= 0 &&
        x + player.clientWidth <= gameArea.clientWidth &&
        y + player.clientHeight <= gameArea.clientHeight
    );
}

// Klavye ile hareket kontrolü
document.addEventListener("keydown", function (event) {
    let newX = playerX, newY = playerY;

    if (event.key === "ArrowUp") newY -= speed;
    if (event.key === "ArrowDown") newY += speed;
    if (event.key === "ArrowLeft") newX -= speed;
    if (event.key === "ArrowRight") newX += speed;

    // Eğer yeni konum oyun alanı içindeyse hareket etmesine izin ver
    if (isInsideGameArea(newX, newY)) {
        playerX = newX;
        playerY = newY;
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }

    // Çıkış noktasına ulaşıldı mı? (Anında algılaması için hassas çarpışma kontrolü)
    let playerRect = player.getBoundingClientRect();
    let goalRect = goal.getBoundingClientRect();

    if (
        playerRect.left < goalRect.right &&
        playerRect.right > goalRect.left &&
        playerRect.top < goalRect.bottom &&
        playerRect.bottom > goalRect.top
    ) {
        document.body.style.backgroundColor = "#FFB6C1"; // Toz pembe arka plan
        winMessage.style.display = "block"; // Kazanma mesajını göster
        gameArea.classList.add("hidden"); // Labirenti kaybet
        gameTitle.classList.add("hidden"); // Başlık kaybolsun
        gameInstructions.classList.add("hidden"); // Açıklama kaybolsun
        createHearts(); // Kalp efektini başlat
    }
});
