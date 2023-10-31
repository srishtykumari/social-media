import React from 'react'
import {MDBBadge} from "mdb-react-ui-kit";
const Badge = ({children,styleInfo}) => {
    const colorKey = {
        Friends:"primary",
        Fashion: "success",
        wedding: "danger",
        Sports: "warning",
        Food: "info",
        Study: "dark"
    }
  return (
    <h5 style={styleInfo}>
      <MDBBadge color={colorKey[children]}>{children}</MDBBadge>
    </h5>
  )
}

export default Badge
