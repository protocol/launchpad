document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const text = new SplitType(".split-type", {
    types: "lines, words",
    lineClass: "split-line",
    wordClass: "split-word"
  });

  const splitBlocks = [...document.querySelectorAll(".split-type")];
  gsap.set(".split-type", { autoAlpha: 1 });

  for (const block of splitBlocks) {
    const words = block.querySelectorAll(".split-word");

    const tl = new gsap.timeline({
      defaults: {
        duration: 1.5,
        ease: "power4.out"
      },
      scrollTrigger: {
        trigger: block,
        start: "top 80%"
      }
    });

    tl.from(words, { y: "120%" });
  }
});
