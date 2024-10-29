function setCookie(name, value) {
  const maxAge = 30 * 24 * 60 * 60;
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/`;
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value?.split(`; ${name}=`);
  if (parts?.length === 2) return parts?.pop()?.split(";")?.shift();
}

function ccc(name) {
  const expirationDate = "Fri, 10 Feb 2000 00:00:00 GMT";
  document.cookie = `${name}=; Path=/; Expires=${expirationDate};`;
}

export { setCookie, getCookie, ccc };
