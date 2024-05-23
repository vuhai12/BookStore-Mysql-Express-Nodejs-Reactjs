import styled from "styled-components"

export const WrapperSideBar = styled.div`
background: ${props => props.fieldSideBar ==props.field ? "blue" : "white"};
color: ${props => props.fieldSideBar ==props.field ? "white" : "black"};
padding-top: 10px;
padding-bottom: 10px;
cursor: pointer;
&:focus {
      background:red
  }
`






