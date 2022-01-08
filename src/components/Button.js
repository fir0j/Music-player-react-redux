import styled from "styled-components";

const UploadButton = styled.button`
  display: inline-block;
  color: smokewhite;
  font-size: 2em;
  margin: $({props}=> props.margin || 2em);
  padding: $({props}) => props.padding || 0.5em 2em;
  border: 4px solid rgb(62, 57, 36);
  border-radius: 50%;
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: rgb(252, 228, 148);
  height: 50px;
  width: 50px;
`;

const ControlButton = styled.button`
  background: none;
  border: 1px solid rgb(252, 228, 148);
  color: rgb(252, 228, 148);
  font-size: 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
  font-family: cursive;
  font-weight: bold;
`;

export { UploadButton, ControlButton };
