document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const animBlocks = [...document.querySelectorAll(".anim-1")];
  gsap.set(".anim-1", { autoAlpha: 1 });

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

    tl.from(children, { opacity: 0, y: "50%" });
  });
});
