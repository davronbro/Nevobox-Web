document.addEventListener('DOMContentLoaded', function() {
  
  // Find all counters
  const counters = document.querySelectorAll('.counter');
  const animationDuration = 2000;

  const animate = (counter, start, end, suffix) => {
    let startTime;

    const step = (timestamp) => {
      if(!startTime){
        startTime = timestamp;
      }

      const progress = timestamp - startTime;
      const percentage = Math.min(progress / animationDuration, 1);

      counter.textContent=
        Math.floor(percentage * (end - start)+ start) + suffix;

      if(percentage < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting){
          const target = parseInt(entry.target.getAttribute("data-target"));
          const suffix = entry.target.getAttribute("data-suffix") || "";
          animate(entry.target, 0, target, suffix);
          observer.unobserve(entry.target);
       }
      });
    },
    { threshold: 0.5 }
  );


  counters.forEach((counter) => {
    observer.observe(counter);
  });
});