import { CheckBox } from "./CheckBox";
import { useState } from "react";
export const CheckBoxes = ({ title }) => {
  const listOptions = ["Create", "Read", "Update", "Delete"];
  const [selected, setSelected] = useState([]);

  const handleSelect = (value, name) => {
    if (value) {
      setSelected([...selected, { action: name, subject: "branch" }]);
    } else {
      setSelected(selected.filter((item) => item.action !== name));
    }
  };

  function selectAll(value) {
    if (value) {
      // if true
      setSelected(listOptions); // select all
    } else {
      // if false
      setSelected([]); // unselect all
    }
  }

  const onHandleSubmit = () => {
    console.log(selected);
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => onHandleSubmit()}>PPP</button>
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
            value={selected.action.includes(list)}
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
