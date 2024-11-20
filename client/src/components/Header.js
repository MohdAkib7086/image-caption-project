import { useState, useContext, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import "../css/components/header.scss";
import { Button, Popover, ConfigProvider, notification } from "antd";
import { useNavigate } from "react-router-dom";
export default function Header(props) {
  const navigate = useNavigate();
  const User = localStorage.getItem("user") || "User";
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    notification.success({
      message: "Logout",
      description: "You have successfully logged out",
    });
  };
  const text = <span>Profile</span>;

  const content = (
    <div>
      <p>{User || "user"}</p>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
  console.log(props, "hello");
  return (
    <>
      <div className="header flex !justify-between items-center">
        <div className="  opacity-0">
          <FaRegUserCircle className="ml-2" />
        </div>
        <h1>{props.content}</h1>

        <div>
          <Popover placement="bottomRight" title={text} content={content}>
            <FaRegUserCircle className="ml-2" />
          </Popover>
        </div>
      </div>
    </>
  );
}
