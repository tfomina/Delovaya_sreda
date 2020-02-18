import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Star } from "../../icons/star.svg";

export const Stars = ({ count = 0 }) => (
  <div className="star-wrapper">
    <Star className="star" /> {count}
  </div>
);

Stars.propTypes = {
  count: PropTypes.number
};
