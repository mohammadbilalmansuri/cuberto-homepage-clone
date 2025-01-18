(() => {
  const lenis = new Lenis();
  gsap.registerPlugin(ScrollTrigger);
  lenis.on("scroll", ScrollTrigger.update);

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  window.addEventListener("unload", () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    window.scrollTo(0, 0);
  });

  const mediaQuery = window.matchMedia("(min-width: 768px)");
  const setMouseFollower = () => {
    if (mediaQuery.matches) {
      Shery.mouseFollower({
        skew: true,
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.3,
      });
    } else {
      document.querySelectorAll(".mousefollower")?.forEach((el) => el.remove());
    }
  };
  setMouseFollower();
  mediaQuery.addEventListener("change", setMouseFollower);

  Shery.makeMagnet(".magnet");

  Shery.hoverWithMediaCircle("#banner-heading span", {
    videos: [
      "https://res.cloudinary.com/mohammadbilalmansuri/video/upload/v1737217357/cuberto/videos/video1.mp4",
      "https://res.cloudinary.com/mohammadbilalmansuri/video/upload/v1737217359/cuberto/videos/video2.mp4",
      "https://res.cloudinary.com/mohammadbilalmansuri/video/upload/v1737217358/cuberto/videos/video3.mp4",
    ],
  });

  const setOnScrollBgChange = (bp) => {
    ScrollTrigger.create({
      trigger: "#featured",
      scroller: "body",
      start: "top top",
      end: "top -325%",
      scrub: true,
      onUpdate: (prog) => {
        const scrollProgress = prog.progress;
        if (scrollProgress >= 0 && scrollProgress <= bp[0]) {
          document.body.style.backgroundColor = "var(--lightIndigo)";
        } else if (scrollProgress > bp[0] && scrollProgress <= bp[1]) {
          document.body.style.backgroundColor = "var(--lightSlate)";
        } else if (scrollProgress > bp[1] && scrollProgress <= bp[2]) {
          document.body.style.backgroundColor = "var(--lightOrange)";
        } else if (scrollProgress > bp[2] && scrollProgress <= 1) {
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
  };

  if (mediaQuery.matches) {
    setOnScrollBgChange([0.12, 0.288, 0.54]);

    let featuredLeftItems = document.querySelectorAll(".project");

    gsap.to(featuredLeftItems, {
      yPercent: -300,
      ease: "Power1.out",
      scrollTrigger: {
        trigger: "#projects",
        scroller: "body",
        pin: true,
        start: "top top",
        end: "bottom bottom",
        endTrigger: ".project:last-child",
        scrub: true,
      },
    });

    Shery.imageEffect("#projects-images", {
      style: 1,
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
  } else {
    setOnScrollBgChange([0.22, 0.462, 0.705]);

    Shery.imageEffect(".project-mobile img", {
      style: 1,
      config: { onMouse: { value: 1 } },
    });
  }

  Shery.imageEffect("#resources img", {
    style: 2,
    config: { onMouse: { value: 1 } },
  });

  Shery.imageEffect("#inspiro img", {
    style: 4,
    config: { onMouse: { value: 1 } },
  });

  ScrollTrigger.refresh();
})();
