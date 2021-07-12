const getParam = (key) => {
    var regex = new RegExp(
            "[?&]" + key.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)",
        ),
        results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

const image = `url("${getParam("image")}")`;

document.querySelector(".bg").style.backgroundImage = image;
document.querySelector(".image").style.backgroundImage = image;
document.querySelector(".user").innerHTML = getParam("user");
document.querySelector(".title").innerHTML = getParam("title");
document.querySelector(".artist").innerHTML = getParam("artist");
document.querySelector(".album").innerHTML = getParam("album");
