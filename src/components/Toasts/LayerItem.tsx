import React from "react";

export type layerType = {
  layerId: string;
  name: string;
  checked: boolean;
  added: boolean;
}

type LayerProp = {
  layer: layerType;
  handleChange(layerId: string): void;
}
 

const LayerItem = (props: LayerProp) => (
  <div className="container-sm lc-item">
  <div className="custom-control custom-checkbox">
    
    <label className="container">
    <input
      type="checkbox"
      className="custom-control-input"
      id={`customCheck1-${props.layer.layerId}`}
      checked={props.layer.checked}
      onChange={() => props.handleChange(props.layer.layerId)}
    />
  <span className="checkmark"></span>
</label>
    <label
      className="layer-item"
      htmlFor={`customCheck1-${props.layer.layerId}`}
    >
      <span className="font-title">{props.layer.name}</span>
    </label>
  </div></div>
);

export default LayerItem;