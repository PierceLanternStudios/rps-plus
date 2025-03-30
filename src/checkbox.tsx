import checkboxCSS from "./checkbox.module.css";

function checkbox(isOn: boolean, onToggle: () => void) {
  return (
    <>
      <input
        type="checkbox"
        checked={isOn}
        onChange={onToggle}
        className={checkboxCSS.checkbox}
      />
      <label className={checkboxCSS.label} />
      <span className={checkboxCSS.checkbox_button}></span>
    </>
  );
}

export default checkbox;
