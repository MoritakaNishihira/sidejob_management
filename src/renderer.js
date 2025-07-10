window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  if (btn !== null) {
    btn.addEventListener("click", () => {
      alert("Button clicked!");
    });
  }
});
