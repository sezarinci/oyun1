const player = document.getElementById("player");
const goal = document.getElementById("goal");
const walls = document.querySelectorAll(".wall");
const winMessage = document.getElementById("winMessage");
const gameArea = document.getElementById("gameArea");

let playerX = 10, playerY = 10;
const speed = 10;

// Çarpışma kontrol fonksiyonu
function checkCollision(x, y) {
    for (let wall of walls) {
        const wallRect = wall.getBoundingClientRect();
        const playerRect = player.getBoundingClientRect();

        if (
            x < wallRect.right - gameArea.offsetLeft &&
            x + 20 > wallRect.left - gameArea.offsetLeft &&
            y < wallRect.bottom - gameArea.offsetTop &&
            y + 20 > wallRect.top - gameArea.offsetTop
        ) {
            return true; // Çarpışma varsa hareket etme
        }
    }
    return false;
}

// Kalp efekti oluştur
function createHearts() {
    setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "💖";
        heart.style.left = `${Math.random() * window.innerWidth}px`;
        heart.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2000);
    }, 100);
}

// Klavye ile hareket kontrolü
document.addEventListener("keydown", function(event) {
    let newX = playerX, newY = playerY;

    if (event.key === "ArrowUp") newY -= speed;
    if (event.key === "ArrowDown") newY += speed;
    if (event.key === "ArrowLeft") newX -= speed;
    if (event.key === "ArrowRight") newX += speed;

    if (!checkCollision(newX, newY)) {
        playerX = newX;
        playerY = newY;
        player.style.left = playerX + "px";
        player.style.top = playerY + "px";
    }

    // Çıkış noktasına ulaşıldı mı?
    if (playerX >= goal.offsetLeft && playerY >= goal.offsetTop) {
        document.body.style.backgroundColor = "#FFB6C1"; // Toz pembe arka plan
        winMessage.style.display = "block"; // Kazanma mesajını göster
        gameArea.classList.add("hidden"); // Labirenti kaybet
        createHearts();
    }
});
