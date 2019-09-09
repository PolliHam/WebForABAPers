window.onload = function () {

    var nameField = document.getElementById("name");
    var altNameField = document.getElementById("altName");
    var googlebtn = document.getElementById("googlebtn");
    var deletebtn = document.getElementById("deletebtn");

    googlebtn.addEventListener("click", goToGoogle);
    deletebtn.addEventListener("click", deleteNames);

    var name = prompt('Enter your name');
    if (hasNumber(name) == true) {
        var altName = reverseString(name);
        document.getElementById('altNameHead').innerHTML = "Changed name (with numbers)";
    } else {
        var altName = upperLowerCase(name);
        document.getElementById('altNameHead').innerHTML = "Changed name (without numbers)";
    }

    nameField.innerHTML = name;
    altNameField.innerHTML = altName;

    function goToGoogle() {
        window.open("https://google.com");
    };

    function deleteNames() {
        nameField.innerHTML = "";
        altNameField.innerHTML = "";
    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    };

    function reverseString(str) {
        var splitString = str.split("");
        var reverseArray = splitString.reverse();
        var joinArray = reverseArray.join("");
        return joinArray;
    }

    function upperLowerCase(str) {
        var splitString = [];
        splitString = str.split("");
        var newArray = [];
        for (var i = 0; i < str.length; i++) {
            if (i % 2 != 0) {
                newArray.push(splitString[i].toUpperCase());
            } else {
                newArray.push(splitString[i].toLowerCase());
            }
        }
        var joinArray = newArray.join("");
        return joinArray;
    }
}