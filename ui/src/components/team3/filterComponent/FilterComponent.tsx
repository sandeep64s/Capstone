import React from "react";
import { Button, Input } from "reactstrap";
import { GiMagnifyingGlass } from "react-icons/all";
// const Input = styled.input.attrs(props => ({
//   type: "text",
//   size: props.small ? 5 : undefined
// }));

//types to be done //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <>
      <input
        id="search"
        type="text"
        placeholder="Filter table data..."
        value={filterText}
        onChange={onFilter}
        className="filterInputClass"
        style={{ display: "inline-block" }}
      />
      <button onClick={onClear} className="filterButtonClass" style={{ display: "inline-block", marginLeft: "5px" }}><GiMagnifyingGlass style={{ height: "50px", width: "25px" }} /></button>
    </>
  </>
);

export default FilterComponent;
