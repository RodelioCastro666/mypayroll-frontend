import { CheckBox } from "./CheckBox";
import { useState } from "react";

export const CheckBoxes = ({ title }) => {
  const listOptions = ["Create", "Read", "Update", "Delete"];
  const [selected, setSelected] = useState([]);

  const [selectedParam, setselectedParam] = useState([]);

  const handleSelect = (value, name) => {
    if (value) {
      setSelected([...selected, name]);
      setselectedParam([
        ...selectedParam,
        { action: name.toLowerCase(), subject: title.toLowerCase() },
      ]);
    } else {
      setSelected(selected.filter((item) => item.action !== name));
    }
  };

  function selectAll(value) {
    if (value) {
      // if true
      setSelected(listOptions); // select all
      listOptions.map((list) => {
        setselectedParam([
          ...selectedParam,
          { action: list.toLowerCase(), subject: title.toLowerCase() },
        ]);
      });
    } else {
      // if false
      setSelected([]); // unselect all
    }
  }

  const onHandleSubmit = () => {
    console.log(selected);

    console.log(selectedParam);
  };

  return (
    <div>
      <h1></h1>
      <button onClick={() => onHandleSubmit()}>xxxx</button>
      <CheckBox
        name="all"
        value={selected.length === listOptions.length}
        updateValue={selectAll}
      >
        Manage
      </CheckBox>
      {listOptions.map((list) => {
        return (
          <CheckBox
            value={selected.includes(list)}
            name={list}
            updateValue={handleSelect}
          >
            {list}
          </CheckBox>
        );
      })}
    </div>
  );
};
