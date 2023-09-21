document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  //mobile nav settings
  if (window.innerWidth < 768) {
    const navButton = document.querySelector(".nav-button");
    const navLines = [...navButton.querySelectorAll(".nav-button-line")];
    const navWrapper = document.querySelector(".nav-links");
    const navLinks = [...document.querySelector(".nav-links-wrapper").children];

    const tl = new gsap.timeline({
      defaults: {
        duration: 0.5,
        ease: "power3.inOut"
      }
    });

    tl.paused(true);

    tl.to(navWrapper, { height: "100dvh" })
      .to(navButton, { backgroundColor: "#002256" }, "<")
      .to(navLines, { backgroundColor: "#ffffff" }, "<")
      .to(".nav-logo.is-light", { opacity: 0 }, "<")
      .to(".nav-logo.is-dark", { opacity: 1 }, "<")
      .from(
        navLines[0],
        {
          y: "-3px"
        },
        "<"
      )
      .from(
        navLines[1],
        {
          y: "3px"
        },
        "<"
      )
      .from(
        navLinks,
        {
          y: "100%",
          opacity: 0,
          delay: 0.5,
          stagger: {
            each: 0.05
          }
        },
        "<"
      )
      .to(
        navLines[0],
        {
          rotateZ: "45deg"
        },
        "<"
      )
      .to(
        navLines[1],
        {
          rotateZ: "-45deg"
        },
        "<"
      );

    navButton.onclick = () => {
      if (navButton.classList.contains("is-open")) {
        navButton.classList.remove("is-open");
        tl.reverse();
      } else {
        navButton.classList.add("is-open");
        tl.restart();
      }
    };
  }

  //hide nav on scroll
  const nav = document.querySelector(".nav");
  let scrollPos = window.scrollY;

  window.onscroll = () => {
    if (scrollPos < window.scrollY && window.scrollY > 100) {
      scrollPos = window.scrollY;
      gsap.to(nav, { opacity: 0, y: "-100%" });
    } else {
      scrollPos = window.scrollY;
      gsap.to(nav, { opacity: 1, y: "0%" });
    }
  };

  //make nav dark
  const darkSections = [...document.querySelectorAll("[data-nav='dark']")];

  function addDarkNav() {
    nav.classList.add("is-dark");
  }

  function removeDarkNav() {
    nav.classList.remove("is-dark");
  }

  darkSections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        addDarkNav();
      },
      onEnterBack: () => {
        addDarkNav();
      },
      onLeave: () => {
        removeDarkNav();
      },
      onLeaveBack: () => {
        removeDarkNav();
      }
    });
  });
});
