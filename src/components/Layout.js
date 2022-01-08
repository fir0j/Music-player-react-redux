import styled from "styled-components";

// const Layout = (props) => <div>{props.children}</div>;
const Div = styled.div`
  outline: 1px solid;
  display: flex;
  justify-content: space-between;
  background-color: rgb(254, 249, 228);
`;

const Search = styled.input.attrs((props) => ({
  // we can define static props
  type: "text",

  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

export { Search };
