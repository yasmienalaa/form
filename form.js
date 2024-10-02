
let ss=document.getElementById("s2");
let sss=document.getElementById("s1");
function fun(){
    ss.style.display="block";
    sss.style.display="none"
}
var userName = document.getElementById("userName");
var age = document.getElementById("age");
var password = document.getElementById("password");
var email = document.getElementById("email");
var submit = document.getElementById("submit");
var users = [];
var errorMessage = document.getElementById('error-message');

if (localStorage.getItem("user") != null) {
    users = JSON.parse(localStorage.getItem("user"));
    display();
} else {
    users = [];
}
submit.addEventListener("click", function () {
    event.preventDefault();
    var user = {
        name: userName.value,
        age: age.value,
        password: password.value,
        email: email.value,
    };
    validateEmail();
    if (validateEmail(email.value)) {
        errorMessage.textContent = 'Email is valid';
        errorMessage.style.color = 'green';
        users.push(user);
        localStorage.setItem("user", JSON.stringify(users));
        resetInput();
        display();
    } else {
        errorMessage.textContent = 'Invalid email address';
        errorMessage.style.color = 'red';
    }
});
function resetInput() {
    userName.value = "";
    age.value = "";
    password.value = "";
    email.value = "";
}
function display() {
    var tbody = document.querySelector("tbody");
    while (tbody.rows.length > 0) {
        tbody.deleteRow(0);
    }
    users.forEach(function (item, index) {
        var row = document.createElement("tr");
        var cell0 = document.createElement("td");
        cell0.innerHTML = item.name;
        row.appendChild(cell0);
        var cell1 = document.createElement("td");
        cell1.innerHTML = item.age;
        row.appendChild(cell1);
        var cell2 = document.createElement("td");
        cell2.innerHTML = item.password;
        row.appendChild(cell2);
        var cell3 = document.createElement("td");
        cell3.innerHTML = item.email;
        row.appendChild(cell3);
        var cell4 = document.createElement("td");
        cell4.innerHTML = `<button id="delBtn" onclick=deleteProduct(${index})>Delete</button>`;
        row.appendChild(cell4);
        tbody.appendChild(row);
    });
}
function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function deleteProduct(index) {
    users.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(users));
    display();
}