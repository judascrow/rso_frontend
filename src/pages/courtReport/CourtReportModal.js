import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { patch } from "axios";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import ConvertMonth from "../../components/ConvertMonth";
import { apiUrl } from "../../config";
import { getCourtReports } from "../../store/actions/courtReport";

const CourtReportModal = ({ open, onClose, values, getCourtReports }) => {
  const [file, setFile] = useState(null);

  const onChange = e => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async e => {
    e.preventDefault(); // Stop form submit
    await fileUpload(file, values.id).then(response => {
      setOpen(false);
    });
    await getCourtReports();
  };

  const fileUpload = (file, id) => {
    const url = `${apiUrl}/court_reports/${id}`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    return patch(url, formData, config);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          ส่งข้อมูลประจำเดือน {values && ConvertMonth(values.month)}{" "}
          {values && values.year}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            กรุณาอัพโหลดไฟล์เอกสารที่เกี่ยวข้อง
          </DialogContentText>
          <input type="file" onChange={onChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            ยกเลิก
          </Button>
          <Button onClick={onSubmit} color="primary">
            ส่งข้อมูล
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CourtReportModal.propTypes = {
  getCourtReports: PropTypes.func.isRequired
};

export default connect(
  null,
  { getCourtReports }
)(withRouter(CourtReportModal));
