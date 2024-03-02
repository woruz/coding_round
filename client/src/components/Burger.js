import React, { useEffect, useState } from "react";

const Burger = ({ sliceSelected }) => {
  const [sliceString, setSliceString] = useState("");
  console.log({ sliceSelected123: sliceSelected });
  useEffect(() => {
    setSliceString("");
    sliceSelected &&
      sliceSelected.length &&
      sliceSelected.map((slice) => {
        if (slice.slice_name === "Aloo Tikki") {
          for (let i = 0; i < slice.slice_quantity; i++) {
            setSliceString(
              (prev) => prev + "<h2>-------------------------------   Aloo Tikki</h2>"
            );
          }
        } else if (slice.slice_name === "Paneer") {
          for (let i = 0; i < slice.slice_quantity; i++) {
            setSliceString(
              (prev) => prev + "<h2>%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  Paneer</h2>"
            );
          }
        } else if (slice.slice_name === "Cheese") {
          for (let i = 0; i < slice.slice_quantity; i++) {
            setSliceString(
              (prev) => prev + "<h2>*******************************  Cheese</h2>"
            );
          }
        }
      });
  }, [sliceSelected]);

  console.log({ sliceString });
  return (
    <div className="Burger">
      <h1>======================   Bread</h1>
      <div dangerouslySetInnerHTML={{ __html: sliceString }} />
      <h1>======================   Bread</h1>
    </div>
  );
};

export default Burger;
