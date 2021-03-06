import React from "react";
import AssignmentIndIcon from "@material-ui/icons/AssignmentIndOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import AssignmentTurnedIn from "@material-ui/icons/AssignmentTurnedInOutlined";
import ViewListOutlined from "@material-ui/icons/ViewListOutlined";
import CloudDownloadOutlined from "@material-ui/icons/CloudDownloadOutlined";

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
    text: "รายงานการตรวจรับ",
    icon: <AssignmentTurnedIn />,
    path: "/courtreport",
    roleID: [2]
  },
  {
    id: 4,
    text: "เจ้าหน้าที่รักษาความปลอดภัย",
    icon: <AssignmentIndIcon />,
    path: "/secperson",
    roleID: [2]
  },
  {
    id: 5,
    text: "การส่งรายงานจากศาล",
    icon: <CloudDownloadOutlined />,
    path: "/admin_accept",
    roleID: [1]
  },
  {
    id: 6,
    text: "รายงานสำหรับส่วนกลาง",
    icon: <ViewListOutlined />,
    path: "/admin_report",
    roleID: [1]
  }
];

export default Menus;
