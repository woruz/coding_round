import React, { useState, useEffect } from "react";
import Select from "react-select";
import useOrderHooks from "../hooks/useOrderHooks";
import Burger from "./Burger";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { data, loading, error, add_burger, orderId } = useOrderHooks();
  const [sliceList, setSliceList] = useState([]);
  const [sliceCtr, setSliceCtr] = useState(0);
  const [burgerCtr, setBurgerCtr] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState();
  const [sliceSelecetd, setSliceSelected] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (data && data?.result?.length) {
      const options = data.result.map((val) => {
        const { _id, slice } = val;
        return {
          value: _id,
          label: slice,
        };
      });

      setSliceList(options);
    }
  }, [data]);

  const addSliceCtr = () => {
    setSliceCtr((prev) => prev + 1);
  };

  const removeSliceCtr = () => {
    setSliceCtr((prev) => prev - 1);
  };

  const addBurgerCtr = () => {
    setBurgerCtr((prev) => prev + 1);
  };

  const removeBurgerCtr = () => {
    setBurgerCtr((prev) => prev - 1);
  };

  const orderHandler = () => {
    const body = {
      order_quantity: burgerCtr,
      customer_modile_number: phoneNumber,
      slices: sliceSelecetd,
    };

    add_burger(body);
    setBurgerCtr(0)
    setSliceCtr(0)
  };

  if (loading) {
    return <h1>Loading........</h1>;
  }

  console.log({ sliceList, sliceSelecetd, orderId });

  return (
    <div
      className="Order"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div className="phoneNumber">
        <label for="phone">Enter your phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
      </div>
      <div className="selectSlice">
        No of slice:-{sliceCtr}
        <div>
          <button onClick={addSliceCtr}>Add</button>
          <button onClick={removeSliceCtr}>Remove</button>
        </div>
      </div>
      <div>
        <Select
          isDisabled={!sliceCtr}
          options={sliceList}
          isMulti
          onChange={(e) => {
            let body = e.map((val) => {
              const { value, label } = val;
              return {
                slice_name: label,
                slice_id: value,
                price: data.result.filter((slice) => slice._id === value)[0]
                  .slice_price,
                slice_quantity: sliceCtr,
              };
            });
            setSliceSelected(body);
          }}
        />
      </div>
      <div className="selectSliceQuantity">
        No of slice:-{burgerCtr}
        <div>
          <button onClick={addBurgerCtr}>Add</button>
          <button onClick={removeBurgerCtr}>Remove</button>
        </div>
      </div>
      <div className="totalPrice">
        Total Amount:-{total_amount(sliceSelecetd, burgerCtr)}
      </div>
      <div>
        <button disabled={!phoneNumber || !sliceCtr || !burgerCtr || !sliceSelecetd} onClick={orderHandler}>Order</button>
      </div>
      {sliceSelecetd && sliceCtr && (
        <Burger sliceSelected={sliceSelecetd} sliceCtr={sliceCtr} />
      )}
    </div>
  );
};

export default Order;

function total_amount(sliceSelecetd, burgerCtr) {
  let total = 0;
  sliceSelecetd &&
    sliceSelecetd.length &&
    sliceSelecetd.forEach((slice) => {
      total = total + slice.price * slice.slice_quantity;
    });

  return total * burgerCtr;
}
