import { InterrailLine, InterrailLocation } from "./lib/types";

declare module "*eurail.json" {
  const value: {
    cities: InterrailLocation[];
    lines: InterrailLine[];
  };
  export default value;
}
