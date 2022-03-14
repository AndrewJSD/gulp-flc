export const checkWebpCompatibility = () => {
  const testWebP = (callback) => {
    let webP = new Image();
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    webP.onload = webP.onerror = () => callback(webP.height);
  };
  testWebP((support) => {
    const className = support ? "webp" : "no-webp";
    document.documentElement.classList.add(className);
  })
}