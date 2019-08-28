import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { patch, post } from "axios";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import AssignmentIndIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import LinearProgress from "@material-ui/core/LinearProgress";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";

// Modal
import { apiHost, apiUrl } from "../../config";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Moment from "moment";

import {
  getCourtReports,
  deleteCourtReport
} from "../../store/actions/courtReport";
import ConvertMonth from "../../components/ConvertMonth";

const useStyles = makeStyles(theme => ({
  titleIcon: {
    verticalAlign: "middle",
    margin: theme.spacing(1)
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3)
  }
}));

const CourtReportTable = ({
  getCourtReports,
  deleteCourtReport,
  courtReport: { courtReports, loading },
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    getCourtReports();
  }, [getCourtReports]);

  const onDelete = async rowData => {
    var r = confirm("คุณต้องการลบข้อมูลใช่หรือไม่ ?"); //eslint-disable-line
    if (r) {
      await deleteCourtReport(rowData.id);
      await getCourtReports();
    }
  };

  const onEdit = rowData => {
    history.push(`/courtreport/edit/` + rowData.id);
    // alert(rowData.id);
  };

  // Modal
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [docNo, setDocNo] = useState("");

  function handleCloseModal() {
    setOpen(false);
  }

  const onChange = e => {
    setDocNo(e.target.value);
  };

  const onChangeModal = e => {
    if (e.target.files[0].type === "application/pdf") {
      setFile(e.target.files[0]);
    } else {
      alert("อัพโหลดได้เฉพาะไฟล์ PDF เท่านั้น");
      setFile(null);
      e.target.value = "";
    }
  };

  const onSubmitModal = async e => {
    e.preventDefault(); // Stop form submit
    if (docNo !== "") {
      if (file === null) {
        alert("กรุณาเลือกไฟล์");
      } else {
        await fileUpload(file, data.id, docNo).then(response => {
          setOpen(false);
        });
        await getCourtReports();
        await setFile(null);
        await setDocNo("");
      }
    } else {
      alert("กรุณากรอกเลขหนังสือ");
    }
  };

  const fileUpload = (file, id, docNo) => {
    const url = `${apiUrl}/court_reports/${id}`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("doc_no", docNo);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return patch(url, formData, config);
  };

  const [state] = useState({
    columns: [
      {
        title: "เดือน - ปี",
        field: "year",
        lookup: { 2562: "2562", 2563: "2563" },
        render: rowData => ConvertMonth(rowData.month) + " " + rowData.year
      },
      {
        title: "สถานะการส่งรายงาน",
        field: "status",
        lookup: {
          A: "ลงรับแล้ว",
          S: "ส่งรายงานแล้ว รอลงรับ",
          W: "ยังไม่ได้ส่งรายงาน"
        },
        render: rowData =>
          rowData.status === "A" ? (
            <Chip label="ลงรับแล้ว" color="secondary" size="small" />
          ) : rowData.status === "S" ? (
            <Chip label="ส่งรายงานแล้ว รอลงรับ" color="primary" size="small" />
          ) : (
            <Chip label="ยังไม่ได้ส่งรายงาน" size="small" />
          )
      },
      {
        title: "วันที่สร้าง",
        field: "created_at",
        filtering: false,
        headerStyle: {
          width: "300px"
        },
        render: rowData =>
          Moment(rowData.created_at).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "วันที่แก้ไขล่าสุด",
        field: "updated_at",
        filtering: false,
        headerStyle: {
          width: "300px"
        },
        render: rowData =>
          Moment(rowData.updated_at).format("YYYY-MM-DD HH:mm:ss")
      }
    ],
    actions: [
      rowData => ({
        icon: "edit",
        iconProps: { color: rowData.status === "A" ? "disabled" : "primary" },
        tooltip: "แก้ไขรายงาน",
        onClick: (event, rowData) => onEdit(rowData),
        disabled: rowData.status === "A"
      }),

      rowData => ({
        icon: "printer",
        iconProps: { color: rowData.status === "A" ? "disabled" : "action" },
        tooltip: "ปริ้นเอกสาร",
        onClick: (event, rowData) => {
          const config = {
            responseType: "arraybuffer",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/pdf"
            }
          };
          post(`http://10.8.22.11/project01/print.php`, rowData, config)
            .then(response => {
              const url = window.URL.createObjectURL(new Blob([response.data]));
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute(
                "download",
                rowData.court.court_code +
                  "_" +
                  rowData.year +
                  rowData.month +
                  ".pdf"
              ); //or any other extension
              document.body.appendChild(link);
              link.click();
            })
            .catch(error => console.log(error));
        },
        disabled: rowData.status === "A"
      }),
      rowData => ({
        icon: "send",
        iconProps: { color: rowData.status === "A" ? "disabled" : "secondary" },
        tooltip: "ส่งรายงาน",
        onClick: async (event, rowData) => {
          await setOpen(true);
          await setData(rowData);
        },
        disabled: rowData.status === "A"
      }),
      rowData => ({
        icon: "picture_as_pdf",
        iconProps: { color: rowData.status === "W" ? "disabled" : "error" },
        tooltip: "Download เอกสาร",
        onClick: (event, rowData) =>
          window.open(`${apiHost}/files/${rowData.file_path}`, "_blank"),
        disabled: rowData.status === "W"
      }),
      rowData => ({
        icon: "delete",
        iconProps: { color: rowData.status !== "W" ? "disabled" : "error" },
        tooltip: "ลบรายงาน",
        onClick: (event, rowData) => onDelete(rowData),
        disabled: rowData.status !== "W"
      })
    ],
    options: {
      filtering: true,
      actionsColumnIndex: -1,
      pageSize: 10,
      headerStyle: {
        backgroundColor: "#29b6f6",
        color: "#fff"
      },
      padding: "dense"
    }
  });

  const TableTitle = (
    <div>
      <AssignmentIndIcon className={classes.titleIcon} fontSize="large" />
      {"รายงานการตรวจรับพัสดุจ้างเหมารักษาความปลอดภัยประจำเดือน"}
    </div>
  );

  return (
    <Fragment>
      {courtReports !== null && !loading ? (
        <MaterialTable
          columns={state.columns}
          data={courtReports.data}
          title={TableTitle}
          actions={state.actions}
          options={state.options}
        />
      ) : (
        <LinearProgress />
      )}
      <Tooltip title="เพิ่มบัญชีวันทำงานฯ" aria-label="Add">
        <Fab
          color="primary"
          aria-label="Add"
          className={classes.fab}
          component={Link}
          to="/courtreport/add"
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          ส่งข้อมูลประจำเดือน {data && ConvertMonth(data.month)}{" "}
          {data && data.year}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="doc_no"
            name="doc_no"
            label="เลขหนังสือ"
            className={classes.textField}
            margin="normal"
            onChange={onChange}
            required
            autoFocus
          />
          <DialogContentText>
            กรุณาอัพโหลดไฟล์เอกสารที่เกี่ยวข้อง
          </DialogContentText>
          <input type="file" name="file" onChange={onChangeModal} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={onSubmitModal} color="primary">
            ส่งข้อมูล
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

CourtReportTable.propTypes = {
  getCourtReports: PropTypes.func.isRequired,
  courtReport: PropTypes.object.isRequired,
  deleteCourtReport: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  courtReport: state.courtReport
});

export default connect(
  mapStateToProps,
  { getCourtReports, deleteCourtReport }
)(withRouter(CourtReportTable));
