
var username = document.getElementById("username");
var logoutbtn = document.getElementById("logout");
var btnGames = document.getElementById('btnGames');
var xmlhttp = new XMLHttpRequest(); 

function dataInfo() {
    var logInUser = localStorage.getItem("logInUser");
    if (logInUser) {
        username.innerText = "Welcome " + logInUser;
    }
}
dataInfo();

function logout() {
    localStorage.removeItem('logInUser');
}

logoutbtn.addEventListener("click", function () {
    logout();
});

/////////////////////////
let links = document.querySelectorAll(".nav-item a");

function getGames(categories) {
    const loader = document.querySelector(".loading");
    loader.classList.remove("d-none");

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            diplayGames(data);
            console.log(data)
            show();
            loader.classList.add("d-none");
        }
    };

    xmlhttp.open("GET", `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categories}`, true);
    xmlhttp.setRequestHeader('X-RapidAPI-Key', '3c21bc6b27msh607677cf77cc5afp1a3f83jsn269afbe53bbe');
    xmlhttp.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
    xmlhttp.send();
}

getGames("mmorpg");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (e) {
        document.querySelector(".nav-link.active").classList.remove("active");
        e.target.classList.add("active");
        let cardCategory = e.target.getAttribute("card-category");
        getGames(cardCategory);
    });
}

function diplayGames(data) {
    let cartona = '';
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3">
            <div class="card cardClick h-100" card-id="${data[i].id}">
                <img card-id="${data[i].id}" src="${data[i].thumbnail}" class="card-img-top" alt="card-img">
                <span card-id="${data[i].id}" class='badge w-100 fw-bolder mt-3 clickHere'>Click here to show Details Game</span>
                <div card-id="${data[i].id}" class="mt-3 card-head d-flex justify-content-around align-items-center cardsWrap">
                    <h4 card-id="${data[i].id}" class="card-title">${data[i].title}</h4>
                    <span card-id="${data[i].id}" class="p-2 badge bg-primary">free</span>
                </div>
                <p card-id="${data[i].id}" class="card-text mt-3 text-center mb-1 small">${data[i].short_description.split(" ", 10)}</p>
                <div card-id="${data[i].id}" class="card-body d-flex justify-content-around align-items-center cardsWrap">
                    <span card-id="${data[i].id}" class="badge me-3 text-uppercase">${data[i].genre}</span>
                    <span card-id="${data[i].id}" class="badge ">${data[i].platform}</span>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("displayGames").innerHTML = cartona;
}

function show() {
    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", function (e) {
            let cardID = e.target.getAttribute("card-id");
            getGameDetails(cardID);
            document.getElementById("game-details").classList.remove("d-none");
            document.getElementById("games").classList.add("d-none");
        });
    }
}

function getGameDetails(cardID) {
    const loader = document.querySelector(".loading");
    loader.classList.remove("d-none");

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            displaygame(data);
            console.log(data)
            loader.classList.add("d-none");
        }
    };

    xmlhttp.open("GET", `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${cardID}`, true);
    xmlhttp.setRequestHeader('X-RapidAPI-Key', '3c21bc6b27msh607677cf77cc5afp1a3f83jsn269afbe53bbe');
    xmlhttp.setRequestHeader('X-RapidAPI-Host', 'free-to-play-games-database.p.rapidapi.com');
    xmlhttp.send();
}

function displaygame(data) {
    let cartona = `
    <div class="row">
        <div class="col-md-4">
            <div class="game-img">
                <img src="${data.thumbnail}" class="w-100" alt="game">
            </div>
        </div>
        <div class="col-md-8">
            <div class="game-info">
                <h3>Title: ${data.title}</h3>
                <p>Category: <span class="badge text-bg-info text-uppercase">${data.genre}</span></p>
                <p>Platform: <span class="badge text-bg-info">${data.platform}</span></p>
                <p>Status: <span class="badge text-bg-info">${data.status}</span></p>
                <p>${data.description}</p>
                <a href="${data.game_url}" target="_blank"><button class="btn btn-outline-warning">SHOW GAME</button></a>
            </div>
        </div>
    </div>
    `;

    document.getElementById("game").innerHTML = cartona;
    document.getElementById("btnClose").addEventListener("click", function () {
        document.getElementById("games").classList.remove("d-none");
        document.getElementById("game-details").classList.add("d-none");
    });
}

btnGames.addEventListener('click', function () {
    let cartona = `
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/back.jpg" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game1.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Identical Cards Game</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Memory game designed to enhance concentration and memory skills. The game consists of a set of cards with different images or symbols, where each image or symbol appears on two matching cards.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/2048-game.jpg" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game2.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">2048 Game</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Popular single-player sliding block puzzle game. The objective is to slide numbered tiles on a grid to combine them and create a tile with the number 2048.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/download.jfif" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game3.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Racing Cars Game</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Thrilling and competitive driving game where players race against each other or against the clock to reach the finish line first.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/candy.jpeg" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game4.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Candy Crush</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Players complete levels by swapping colored pieces of candy on a game board to make a match of three or more of the same color, eliminating those candies from the board and replacing them with new ones, which could potentially create further matches.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/quick.png" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game5.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Quick Dodger</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">The player moves left and right to dodge the objects, which fall from the top of the screen. The goal is to survive as long as possible without being hit by any falling objects. The game starts when the player clicks the start button, and background music plays during the game. If the player collides with a falling object, the game ends.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/whack.png" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game6.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Whack A Mole</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">The player scores points by clicking on the tiles with moles, but if they click on a tile with a plant, the game ends. The goal is to score as many points as possible before accidentally clicking on a plant. The game features a game-over sound that plays when the player clicks on a plant tile.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/02fb4057-ae00-4cb6-8350-9d20cf8bcf34.jfif" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game7.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Tic-Tac-Toe</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Players take turns putting their marks in empty squares. The first player to get 3 of her marks in a row (up, down, across, or diagonally) is the winner. When all 9 squares are full, the game is over.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/26.jpg" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game8.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Puzzle</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Sliding puzzle where players rearrange image pieces to form a complete picture. Initially, the game board is filled with blank tiles, and a set of numbered image pieces are displayed separately. Players can drag an image piece onto a blank tile on the board, swapping its position with the tile already there.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/flappy-bird.jpg" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game9.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Flappy Bird</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">The game is a side-scroller where the player controls a bird attempting to fly between columns of green pipes without hitting them.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    <div class="col-md-3">
        <div class="card h-100">
            <img src="../images/snake.jpeg" class="card-img-top cardy" alt="card-img">
            <a href="../pages/game10.html" class='text-center' target="_blank"><button class="btn btn-outline-warning mt-3 ">SHOW GAME</button></a>
            <div class="mt-3 card-head d-flex justify-content-around align-items-center">
                <h4 class="card-title">Snake</h4>
                <span class="p-2 badge bg-primary">free</span>
            </div>
            <p class="card-text mt-3 text-center mb-1 small">Snake is a classic arcade game where the player controls a snake that moves around a board. The objective is to eat food items that appear randomly on the board, which causes the snake to grow longer.</p>
            <div class="card-body d-flex justify-content-around align-items-center">
            </div>
        </div>
    </div>
    `;
    document.getElementById("displayGames").innerHTML = cartona;
});
