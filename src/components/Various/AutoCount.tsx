import React from "react";
import CountUp from "react-countup";

function AutoCount({ value }: { value: number }) {
  const [previousValue, setPreviousValue] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    setPreviousValue(count);
    setCount(value);
  }, [value]);

  return <CountUp start={previousValue} end={count} />;
}

export default AutoCount;
