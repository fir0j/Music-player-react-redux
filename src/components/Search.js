import styled from "styled-components";

const Search = styled.input.attrs((props) => ({
  // we can define static props
  type: "search",
  placeholder: "Search...",

  // or we can define dynamic ones
  size: props.size || "0.5rem",
}))`
  color: rgb(52, 43, 12);
  font-size: 1em;
  border: 1px solid;
  border-radius: 20px;
  width: 100%;
  padding: 2px;
  padding-left: 1rem;
  height: 35px;
  max-width: 500px;
  background: rgb(254, 249, 228);
  &:focus {
    border-color: rgb(52, 43, 12);
    outline: 1px solid rgb(252, 228, 148);
  }
`;

export default Search;
