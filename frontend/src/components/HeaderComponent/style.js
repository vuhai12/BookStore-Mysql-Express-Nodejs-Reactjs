import styled from "styled-components"

export const WrapperAccount = styled.div`
position: relative;
display: inline-block;
&:hover {
    .dropdown-content {
      display: block;
      right:0;
      
    }
  }
`
export const WrapperAccountItem = styled.div`
display: none;
position: absolute;
background-color: #f1f1f1;
min-width: 160px;
box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
z-index: 1;
`





