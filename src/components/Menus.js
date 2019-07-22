import React from "react";
import MailIcon from "@material-ui/icons/MailOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";

const Menus = [
  {
    id: 1,
    text: "หน้าหลัก",
    icon: <HomeIcon />,
    path: "/",
    roleLevel: 2
  },
  {
    id: 2,
    text: "จัดการผู้ใช้งาน",
    icon: <PeopleIcon />,
    path: "/user",
    roleLevel: 1
  },
  {
    id: 3,
    text: "ทดสอบ",
    icon: <MailIcon />,
    path: "/test",
    roleLevel: 2
  }
];

export default Menus;
