import styled from "styled-components";

const StyledButton = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const TomatoButton = styled(StyledButton)`
  color: tomato;
  border-color: tomato;
`;

const DynamicButton = styled.button`
  display: inline-block;
  color: ${(props) => props.color || "palevioletred"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

export { StyledButton, TomatoButton, DynamicButton };
