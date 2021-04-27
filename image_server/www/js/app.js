function getQueryString(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const image = "url(" + getQueryString("image") + ")";

document.querySelector("div.bg").style.backgroundImage = image;
document.querySelector(".image").style.backgroundImage = image;
document.querySelector(".user").innerHTML = getQueryString("user");
document.querySelector(".title").innerHTML = getQueryString("title");
document.querySelector(".artist").innerHTML = getQueryString("artist");
document.querySelector(".album").innerHTML = getQueryString("album");
document.querySelector(".bot").innerHTML = getQueryString("bot");
