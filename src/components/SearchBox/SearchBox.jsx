import { useDispatch, useSelector } from "react-redux";

import css from "./SearchBox.module.css";
import { selectorFilter } from "../../redux/filters/selectors";
import { setFilter } from "../../redux/filters/slice";

const SearchBox = () => {
  //оформлення підписки
  const filter = useSelector(selectorFilter);
  //ф-ця відправник
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilter(event.target.value));
  };
  // {const action = setFilter(evt.target.value);
  //   dispatch(action);}

  return (
    <div className={css.containerSearch}>
      <h3>Find contacts by name</h3>
      <input
        type="text"
        value={filter}
        onChange={handleChange}
        placeholder="Search contact"
        className={css.inputSearch}
      />
    </div>
  );
};

export default SearchBox;
