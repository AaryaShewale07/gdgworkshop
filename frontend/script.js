const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async function (e) {
e.preventDefault();

const data = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
phone: document.getElementById("phone").value,
college: document.getElementById("college").value,
year: document.getElementById("year").value,
branch: document.getElementById("branch").value,
event: document.getElementById("event").value
};

try {

const res = await fetch("https://gdgworkshop-2.onrender.com/register", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(data)
});

const result = await res.json();

successMessage.innerText = result.message;
form.reset();

} catch (error) {

successMessage.innerText = "❌ Server Error!";

}

});