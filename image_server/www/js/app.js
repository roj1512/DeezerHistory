function getQueryString(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

document.querySelector("div.bg").style.backgroundImage =
  "url(" + getQueryString("image") + ")";
document.querySelector(".image").style.backgroundImage =
  "url(" + getQueryString("image") + ")";
document.querySelector(".user").innerHTML = getQueryString("user");
document.querySelector(".title").innerHTML = getQueryString("title");
document.querySelector(".artist").innerHTML = getQueryString("artist");
document.querySelector(".bot").innerHTML = getQueryString("bot");
