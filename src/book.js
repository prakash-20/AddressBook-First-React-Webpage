import React, { useState, useEffect } from "react";
import "./index.css";
function Book() {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [peoples, setPeoples] = useState([]);
  const LOCAL_STORAGE_KEY = "peoples";

  useEffect(() => {
    const retrivePeoples = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retrivePeoples) setPeoples(retrivePeoples);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(peoples));
  }, [peoples]);

  const submithandler = () => {
    if (name !== "" && number !== "") {
      let id = new Date().getTime().toString();
      const person = { id, name, number };
      setPeoples([...peoples, person]);
      console.log(person);
      console.log(peoples);
      setName("");
      setNumber("");
      console.log(name + number);
    } else alert("*All Fields are required");
  };
  const removehandler = (e) => {
    const clonedvalue = peoples.filter((value) => {
      return value.id !== e.target.value;
    });
    setPeoples(clonedvalue);
  };
  const clearAll = () => {
    setPeoples([]);
  };
  return (
    <>
      <div className="content">
        <span id="heading">Address Book</span>
        <br />
        <h4>Name</h4>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <h4>Ph Number</h4>
        <input
          type="text"
          placeholder="Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <br />
        <button type="submit" onClick={submithandler}>
          ADD
        </button>
      </div>
      <br />
      <div className="people_list">
        <div id="list">
          <h2 style={{ color: "#e73131" }}>Name</h2>
          <h2 style={{ color: "#e73131" }}>Number</h2>
          <button
            type="button"
            style={{
              backgroundColor: "transparent",
              border: "none",
              cursor: "default",
            }}
          ></button>
        </div>
        {peoples.map((person) => {
          const { id, name, number } = person;
          return (
            <>
              <div key={id} id="list">
                <h2>{name}</h2>
                <h2>{number}</h2>
                <button type="button" value={id} onClick={removehandler}>
                  Del
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div classname="clear_btn" id="clear">
        <button type="button" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </>
  );
}
export default Book;
