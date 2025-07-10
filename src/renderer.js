window.addEventListener("DOMContentLoaded", () => {
  /** @type {HTMLElement | null} */
  const btn = document.getElementById("btn");
  if (btn !== null) {
    btn.innerText = "click !!";
    btn.addEventListener("click", () => {
      alert("Button clicked!");
    });
  }
});
