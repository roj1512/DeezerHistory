const getQueryString = (key) => {
    var regex = new RegExp(
        "[?&]" + key.replace(/[\[\]]/g, "\\$&") + "(=([^&#]*)|&|#|$)"
      ),
      results = regex.exec(window.location.href);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },
  image = `url("${getQueryString("image")}")`;
document.querySelector("div.bg").style.backgroundImage = image;
document.querySelector(".image").style.backgroundImage = image;
document.querySelector(".user").innerHTML = getQueryString("user");
document.querySelector(".title").innerHTML = getQueryString("title");
document.querySelector(".artist").innerHTML = getQueryString("artist");
document.querySelector(".album").innerHTML = getQueryString("album");
