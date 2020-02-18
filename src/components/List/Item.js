import React from "react";
import PropTypes from "prop-types";
import { Stars } from "./Stars";

export const Item = ({ item }) => (
  <li className="list-group-item d-flex flex-column flex-lg-row justify-content-between align-items-start align-items-lg-center flex-nowrap">
    <div>
      <div>
        <b>{item.name}</b>{" "}
        <a href={item.html_url} target="_blank" rel="noopener noreferrer">
          {item.full_name}
        </a>
      </div>
      <div>Лицензия: {(item.license && item.license.name) || "Не указано"}</div>
    </div>
    <Stars count={item.stargazers_count} />
  </li>
);

Item.propTypes = {
  data: PropTypes.object
};
