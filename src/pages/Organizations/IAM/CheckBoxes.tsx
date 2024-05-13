export const CheckBoxes = ({
  id,
  type,
  name,
  handleClick,
  isChecked,
  subject,
}) => {
  return (
    <div className="w-full h-full bg-red-100">
      <input
        className="text-lg"
        id={id}
        name={name}
        type={type}
        onChange={handleClick}
        checked={isChecked}
        data-subject={subject}
      />
    </div>
  );
};
