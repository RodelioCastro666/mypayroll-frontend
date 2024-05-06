// interface CheckBox {
//   name: string;
//   chil: boolean;
//   onchange: void;
// }

export const CheckBox = ({
  name,
  value = false,
  updateValue = () => {},
  children,
}) => {
  //const [checked, setChecked] = useState(false);

  const handleChange = () => {
    updateValue(!value, name);
  };

  return (
    <div className="my-5">
      <input
        type="checkbox"
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <label>{children}</label>
    </div>
  );
};
