import styled from "styled-components";

const Search = styled.input.attrs((props) => ({
  // we can define static props
  type: "text",
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
  width: 720px;
  background: rgb(254, 249, 228);
`;

export default Search;
