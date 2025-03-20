 
const apiKey = "abbb29-ca5586-b2f834-5e21d3-19abd4";  
const apiUrl = "https://api.apisarena.com/coins/price/avg?coinId=";

const coins = [
    { id: "bitcoin", elementId: "bitcoin-price" },
    { id: "ethereum", elementId: "ethereum-price" },
    { id: "dogecoin", elementId: "dogecoin-price" }
];
 
async function fetchCryptoPrices() {
    try {
        for (const coin of coins) {
            const response = await fetch(`${apiUrl}${coin.id}&timestamp=${Math.floor(Date.now() / 1000)}`, {
                method: "GET",
                headers: {
                    "X-API-KEY": apiKey,
                    "accept": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching ${coin.id} price. Status: ${response.status}`);
            }

            const data = await response.json();
            document.getElementById(coin.elementId).innerText = `$${data.price.toFixed(2)}`;
        }
    } catch (error) {
        console.error("Error fetching crypto prices:", error);
    }
}
setInterval(fetchCryptoPrices, 30000);
 
fetchCryptoPrices();
 
function showSignupForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-container').innerHTML = `
        <div class="form-box">
            <h2>Sign Up</h2>
            <input type="text" id="signupUsername" placeholder="Enter Username" required>
            <input type="password" id="signupPassword" placeholder="Enter Password" required>
            <button onclick="signupUser()">Sign Up</button>
            <br><br>
            <button onclick="hideForm()">Close</button>
        </div>
    `;
}
 
function showLoginForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('form-container').innerHTML = `
        <div class="form-box">
            <h2>Login</h2>
            <input type="text" id="loginUsername" placeholder="Enter Username" required>
            <input type="password" id="loginPassword" placeholder="Enter Password" required>
            <button onclick="loginUser()">Login</button>
            <br><br>
            <button onclick="hideForm()">Close</button>
        </div>
    `;
}
 
function signupUser() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;

    if (username && password) {
        localStorage.setItem(username, password);
        alert('Signup successful! Please login now.');
        showLoginForm();
    } else {
        alert('Please fill out all fields.');
    }
}
 
function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedPassword = localStorage.getItem(username);

    if (storedPassword === password) {
        alert('Login successful! Welcome back, ' + username);
    } else {
        alert('Invalid username or password. Please try again or sign up.');
    }
}
 
function hideForm() {
    document.getElementById('form-container').style.display = 'none';
}

function convertCrypto() {
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCoin = document.getElementById("fromCoin").value;
    const toCoin = document.getElementById("toCoin").value;

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").innerHTML = "Please enter a valid amount.";
        return;
    }
    const conversionRates = {
        "BTC": { "ETH": 15, "DOGE": 50000, "BTC": 1 },
        "ETH": { "BTC": 1 / 15, "DOGE": 3333, "ETH": 1 },
        "DOGE": { "BTC": 1 / 50000, "ETH": 1 / 3333, "DOGE": 1 }
    };

    const convertedAmount = amount * conversionRates[fromCoin][toCoin];
    document.getElementById("result").innerHTML = `
        <p>${amount} ${fromCoin} can be converted to:</p>
        <strong>${convertedAmount.toFixed(6)} ${toCoin}</strong>
    `;
}
