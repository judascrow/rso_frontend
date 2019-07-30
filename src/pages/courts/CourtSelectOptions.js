import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCourts } from "../../store/actions/court";
import Select from "../../components/SelectOption";

const CourtSelectOptions = ({
  getCourts,
  court: { courts, loading },
  onChange,
  value,
  labelName
}) => {
  useEffect(() => {
    getCourts();
    // eslint-disable-next-line
  }, []);

  const options =
    !loading &&
    courts !== null &&
    courts.map(court => ({
      value: court.id,
      label: court.name
    }));

  return (
    <Select
      options={options}
      onChange={onChange}
      value={value}
      labelName={labelName}
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
