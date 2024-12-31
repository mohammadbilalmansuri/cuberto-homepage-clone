(() => {
  const lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // ---------------------------------------------------

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("unload", () => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  });

  // ---------------------------------------------------

  if (window.innerWidth >= 1024) {
    Shery.mouseFollower({
      //Parameters are optional.
      skew: true,
      ease: "cubic-bezier(0.23, 1, 0.320, 1)",
      duration: 0.3,
    });
  }

  Shery.makeMagnet(".magnet");

  Shery.hoverWithMediaCircle("#banner-heading span", {
    videos: [
      "./assets/cuberto-video1.mp4",
      "./assets/cuberto-video2.mp4",
      "./assets/cuberto-video3.mp4",
    ],
  });

  ScrollTrigger.create({
    trigger: "#featured",
    scroller: "body",
    start: "top top",
    end: "top 40%",
    endTrigger: "#resources",
    scrub: true,
    onUpdate: (prog) => {
      const scrollProgress = prog.progress;
      if (scrollProgress > 0 && scrollProgress <= 0.184) {
        document.body.style.backgroundColor = "var(--lightIndigo)";
      } else if (scrollProgress > 0.184 && scrollProgress <= 0.33) {
        document.body.style.backgroundColor = "var(--lightSlate)";
      } else if (scrollProgress > 0.33 && scrollProgress <= 0.554) {
        document.body.style.backgroundColor = "var(--lightOrange)";
      } else if (scrollProgress > 0.554 && scrollProgress <= 1) {
        document.body.style.backgroundColor = "var(--lightPurple)";
      }
    },
    onLeaveBack: () => {
      document.body.removeAttribute("style");
    },
    onLeave: () => {
      document.body.removeAttribute("style");
    },
  });

  let featuredLeftItems = document.querySelectorAll(".project");

  gsap.to(featuredLeftItems, {
    yPercent: -300,
    ease: "Power1.out",
    scrollTrigger: {
      trigger: "#projects",
      scroller: "body",
      pin: true,
      start: "top top",
      end: "bottom 115%",
      endTrigger: ".project:last-child",
      scrub: true,
    },
  });

  Shery.imageEffect("#projects-images", {
    style: 1,
    // debug: true,
    config: { onMouse: { value: 1 } },
    slideStyle: (setScroll) => {
      featuredLeftItems.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          scroller: "body",
          start: "top top",
          scrub: true,
          onUpdate: function (prog) {
            setScroll(prog.progress + index + 0.4);
          },
          onLeaveBack: () => {
            setScroll(0);
          },
        });
      });
    },
  });

  Shery.imageEffect("#resources img", {
    style: 2,
    config: { onMouse: { value: 1 } },
  });

  Shery.imageEffect("#inspiro img", {
    style: 4,
    config: { onMouse: { value: 1 } },
  });

  const footer = document.querySelector("footer");
  footer.style.position = "absolute";
  footer.style.left = 0;
  footer.style.bottom = `-${footer.offsetHeight}px`;

  gsap.to(footer, {
    bottom: 0,
    ease: "power4.out",
    scrollTrigger: {
      trigger: "#inspiro",
      scroller: "body",
      start: "bottom bottom",
      end: `bottom ${window.innerHeight - footer.offsetHeight}`,
      scrub: 2,
      pin: true,
    },
  });

  ScrollTrigger.refresh();
})();
