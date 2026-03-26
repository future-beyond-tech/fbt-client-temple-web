import { useEffect, useRef, useState } from "react";

export default function Counter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const previousEnd = useRef(end);

  useEffect(() => {
    if (previousEnd.current !== end) {
      previousEnd.current = end;
      started.current = false;
      setCount(0);
    }
  }, [end]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };

          animate();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [duration, end]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
