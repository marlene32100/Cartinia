function openMenu() {
  const open = document.querySelector(".navigation__open");
  const screenWidth = screen.width * window.devicePixelRatio;
  const screenHeight = screen.height * window.devicePixelRatio;

  console.log("Opening now");

  GSAP.fromTo(
    open,
    {
      autoAlpha: 0,
      width: 0,
      height: 0,
    },
    {
      autoAlpha: 1,
      zIndex: 999,
      width: screenWidth,
      height: screenHeight,
    }
  );
}
