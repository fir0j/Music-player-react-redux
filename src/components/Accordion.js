import styled, { css } from "styled-components";

const Container = styled.main`
  position: relative;
`;

const Section = styled.section`
  position: relative;
`;

const InnerSection = styled.div`
  position: relative;
  max-width: 500px;
  padding: 2rem;
`;

const AccordionContainer = styled.div``;

const AccordionInner = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid rgba(252, 228, 148, 0.8);
  border-radius: 4px;
`;

const AccordionItem = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid rgba(252, 228, 148, 0.8);
  }
`;

const AccordionTitle = styled.h3`
  margin: 0;
  padding: 1rem;
  cursor: pointer;
  color: rgb(201, 201, 193);
  background: rgba(0, 0, 0, 0.4);
`;

const AccordionBody = styled.div`
  display: block;
  position: relative;
  padding: 0;
  margin: 0;
  height: 0;
  overflow: hidden;
  transition: height 0.3s;

  ${({ active, bodyHeight }) =>
    active &&
    css`
      height: ${bodyHeight}px;
    `}
`;

const AccordionContent = styled.p`
  margin: 0;
  padding: 0 1rem 1rem;
  height: auto;
`;

export {
  Container,
  Section,
  InnerSection,
  AccordionContainer,
  AccordionInner,
  AccordionItem,
  AccordionTitle,
  AccordionBody,
  AccordionContent,
};
