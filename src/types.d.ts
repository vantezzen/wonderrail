import { InterrailLine, InterrailLocation } from "./lib/types";

declare module "*eurail.json" {
  const value: {
    cities: InterrailLocation[];
    lines: InterrailLine[];
  };
  export default value;
}

declare global {
  interface Window {
    sa_event(name: string): void;
  }
}
