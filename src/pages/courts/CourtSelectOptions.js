import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourts } from "../../store/actions/court";
import Select from "../../components/SelectOption";

const CourtSelectOptions = ({ getCourts, court: { courts, loading } }) => {
  useEffect(() => {
    getCourts();
    // eslint-disable-next-line
  }, []);

  const [court, setCourt] = useState(null);

  const options =
    !loading &&
    courts !== null &&
    courts.map(court => ({
      value: court.id,
      label: court.name
    }));

  const handleChangeSingle = e => {
    if (e != null) {
      setCourt(e.value);
    } else {
      setCourt(0);
    }
  };

  return (
    <Select
      name={"court"}
      labelName={"ศาล"}
      // value={single}
      onChange={handleChangeSingle}
      options={options}
    />
  );
};

CourtSelectOptions.propTypes = {
  court: PropTypes.object.isRequired,
  getCourts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  court: state.court
});

export default connect(
  mapStateToProps,
  { getCourts }
)(CourtSelectOptions);
