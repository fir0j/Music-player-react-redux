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
  outline: 1px solid rgb(252, 228, 148);
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
  z-index: 1;
  @media screen and (max-width: 480px) {
    padding: 2px 4px;
    font-size: 1rem;
  }
`;

const PlayButton = styled.button`
  min-height: 40px;
  min-width: 50px;
  display: inline-block;
  margin: 0px;
  padding: 8px;
  border-radius: 0px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  background-color: rgb(51, 45, 25);
  color: rgb(252, 228, 148);
  cursor: pointer;
  position: absolute;
  margin-left: -50px;
`;

export { UploadButton, ControlButton, PlayButton };
