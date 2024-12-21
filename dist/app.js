gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,
});
locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },

  pinType: document.querySelector("main").style.transform
    ? "transform"
    : "fixed",
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();

// ---------------------------------------------------

Shery.mouseFollower({
  //Parameters are optional.
  skew: true,
  ease: "cubic-bezier(0.23, 1, 0.320, 1)",
  duration: 0.3,
});

Shery.makeMagnet(".magnet");

Shery.hoverWithMediaCircle("#banner h1 span", {
  videos: [
    "https://res.cloudinary.com/samaxy50/video/upload/v1734744650/cubertovideo1.mp4",
    "https://res.cloudinary.com/samaxy50/video/upload/v1734744650/cubertovideo2.mp4",
    "https://res.cloudinary.com/samaxy50/video/upload/v1734744650/cubertovideo3.mp4",
  ],
});

ScrollTrigger.create({
  trigger: "#featured-section",
  scroller: "main",
  start: "top top",
  end: "top 40%",
  endTrigger: "#resources-section",
  scrub: true,
  onUpdate: (prog) => {
    const scrollProgress = prog.progress;
    if (scrollProgress > 0 && scrollProgress <= 0.184) {
      document.body.style.backgroundColor = "#dbeafe";
    } else if (scrollProgress > 0.184 && scrollProgress <= 0.33) {
      document.body.style.backgroundColor = "#cbd5e1";
    } else if (scrollProgress > 0.33 && scrollProgress <= 0.554) {
      document.body.style.backgroundColor = "#ffedd5";
    } else if (scrollProgress > 0.554 && scrollProgress <= 1) {
      document.body.style.backgroundColor = "#f3e8ff";
    }
  },
  onLeaveBack: () => {
    document.body.removeAttribute("style");
  },
  onLeave: () => {
    document.body.removeAttribute("style");
  },
});

let featuredLeftItems = document.querySelectorAll(".featured-left-item");

gsap.to(featuredLeftItems, {
  yPercent: -300,
  ease: "Power1.out",
  scrollTrigger: {
    trigger: ".featured",
    scroller: "main",
    pin: true,
    start: "top top",
    end: "bottom 115%",
    endTrigger: ".featured-left-item-last",
    scrub: true,
  },
});

Shery.imageEffect(".featured-right", {
  style: 1,
  // debug: true,
  config: { onMouse: { value: 1 } },
  slideStyle: (setScroll) => {
    featuredLeftItems.forEach((item, index) => {
      ScrollTrigger.create({
        trigger: item,
        scroller: "main",
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

Shery.imageEffect("#resources-section img", {
  style: 2,
  config: { onMouse: { value: 1 } },
});

Shery.imageEffect("#inspiro-section img", {
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
    trigger: "#inspiro-section",
    scroller: "main",
    start: "bottom bottom",
    end: `bottom ${window.innerHeight - footer.offsetHeight}`,
    scrub: 2,
    pin: true,
  },
});

ScrollTrigger.refresh();
