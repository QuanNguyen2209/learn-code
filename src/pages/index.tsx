import React, { useState } from "react";

type Props = {};

export default function Index({}: Props) {
  const [a, setA] = useState(0);
  function count() {
    setA((prev) => ++prev);
  }
  console.log(a);
  return (
    <div>
      {a} <button onClick={() => count()}>click me</button>
    </div>
  );
}
