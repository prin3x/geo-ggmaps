export function setLocalStorage (latitude: number, longitude: number) {
    localStorage.setItem("latitude", latitude.toString());
    localStorage.setItem("longitude", longitude.toString());
  };