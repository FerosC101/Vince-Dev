import { useEffect, useState } from "react";
import { SITE } from "../config.js";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: SITE.timezone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
});

export default function Clock() {
  const [now, setNow] = useState(() => fmt.format(new Date()));
  useEffect(() => {
    const t = setInterval(() => setNow(fmt.format(new Date())), 1000);
    return () => clearInterval(t);
  }, []);
  return <time>{now}</time>;
}
