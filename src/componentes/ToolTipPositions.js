import React from "react";
import Warper from "./Warper";
import Popup from "reactjs-popup";
//

const ToolTipPositions = () => (
  <div>
    <Popup
      trigger={<button className="btn btn-info btn-block">Escoger conceptos</button>}
      position="right top"
      on="hover"
    >
      <Card title="Right Top" />
    </Popup>
  </div>
);
const Card = ({ title }) => (
  <div className="card">
    <div className="content">
      Aqui van los checkboxes de los conceptos :3
    </div>
  </div>
);

export default ToolTipPositions;
