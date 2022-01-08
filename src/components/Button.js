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

const VideoButton = styled(UploadButton)``;
const MusicButton = styled(UploadButton)``;
const OnlineButton = styled(UploadButton)``;

// const DynamicButton = styled.button`
//   display: inline-block;
//   color: ${(props) => props.color || "palevioletred"};
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
//   display: block;
// `;

export { UploadButton, MusicButton, VideoButton, OnlineButton };
