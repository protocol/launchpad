document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const animBlocks = [...document.querySelectorAll(".anim-2")];
  gsap.set(".anim-2", { autoAlpha: 1 });

  animBlocks.forEach((block) => {
    const children = block.children;

    const tl = new gsap.timeline({
      defaults: {
        duration: 1.2,
        ease: "power3.inOut",
        stagger: {
          each: 0.1
        }
      },
      scrollTrigger: {
        trigger: block,
        start: "top 80%"
      }
    });

    tl.from(children, { opacity: 0, y: "80%", x: "80%" });
  });
});
