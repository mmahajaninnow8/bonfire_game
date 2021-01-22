import React from "react";
import { Button } from "reactstrap";

import logo from "../../assets/images/logo.png";
const PageNotFound = (props) => {
  const handleOnClick = () => {
    // props.history.replace(ROUTES.user.welcome);
  };

  return (
    <div
      className={"text-center d-flex align-items-center justify-content-center"}
      style={{
        minHeight: "100vh",
      }}
    >
      <div>
        <img
          src={logo}
          alt="Bonfire"
          className="mb-4"
          style={{ height: 46 }}
        ></img>
        <h2 className="mb-4">Sorry, requested page not found!!</h2>
        {/* <Button color="primary" className="px-4 py-2" onClick={handleOnClick}>
          Go To Home
        </Button> */}
      </div>
    </div>
  );
};

export default PageNotFound;
