export const randomPokemon = () => {
  return Math.floor(Math.random() * (898 - 1) + 1);
};

export function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
export function eraseCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

export function storePokeId() {
  const cookie = getCookie("poke_id");

  if (!cookie) {
    const id = randomPokemon();
    setCookie("poke_id", id, 7);
    return id;
  }
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function catchPokemon(data) {
  const catchNum = getCookie("catch_num");
  if (!catchNum) {
    let max = data.capture_rate;
    if (data.is_baby) max /= 3;
    if (data.is_legendary) max *= 10;
    if (data.is_mythical) max *= 15;

    const toCatch = getRandomIntInclusive(1, max);
    setCookie("catch_num", toCatch, 7);
  }

  return parseInt(catchNum);
}

export function calculateXP(event, pokemon) {
  let xp;
  let level;
  let xpCookie = getCookie("xp");
  const levelCookie = getCookie("level");
  if (!xpCookie) {
    xp = "0";
  }
  if (!levelCookie) {
    level = "0";
  }

  xp = parseInt(xpCookie);
  level = parseInt(levelCookie);
  if (event === "caught") {
    xp += pokemon.base_experience * (+level + 1);
    setCookie("xp", xp, 7);
  }
}

export const calculateUserLevel = () => {
  let xpCookie = getCookie("xp");
  const levelCookie = getCookie("level");

  let xp = parseInt(xpCookie);
  let level = parseInt(levelCookie);
  const nextLevel = level * 2000 + 1000;

  if (xp >= nextLevel) {
    level++;
    setCookie("level", level, 7);
  }

  return level;
};
