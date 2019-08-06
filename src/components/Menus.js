import React from "react";
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import ReceiptIcon from "@material-ui/icons/ReceiptOutlined";

const Menus = [
  {
    id: 1,
    text: "หน้าหลัก",
    icon: <HomeIcon />,
    path: "/",
    roleID: [1, 2]
  },
  {
    id: 2,
    text: "จัดการผู้ใช้งาน",
    icon: <PeopleIcon />,
    path: "/user",
    roleID: [1]
  },
  {
    id: 3,
    text: "เจ้าหน้าที่รักษาความปลอดภัย",
    icon: <AssignmentIndIcon />,
    path: "/secperson",
    roleID: [2]
  },
  {
    id: 4,
    text: "รายงานการตรวจรับ",
    icon: <ReceiptIcon />,
    path: "/courtreport",
    roleID: [2]
  }
];

export default Menus;
