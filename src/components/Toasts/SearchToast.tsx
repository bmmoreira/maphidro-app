import React, { ChangeEvent } from 'react'
import Toast from "react-bootstrap/Toast";
import CloseButton from "react-bootstrap/CloseButton";
import ToastContainer, { ToastPosition } from "react-bootstrap/ToastContainer";
import "./searchtoast.css";


type StationData = {
  id: number;
  attributes: {
    stCode: string;
    stLongitude: number;
    stLatitude: number;
    stName: string;
    stUF: string;
  }
}

export type SearchData = {
  content?: boolean;
  loading?: boolean;
  stationData?: StationData[];
  value?: string;
}

interface SearchProp {
  showSb: boolean;
  toggleSb(): void;
  position: ToastPosition;
  searchData: SearchData;
  onSearchChangeHandler(e: { target: { value: string; };}): void;
  flyTo(coord:[long:number,lat:number]): void;
}

const SearchToast = (props: SearchProp) => {
    return (
      <>
        <ToastContainer
          style={{ zIndex: "3", width: "300px", marginBottom: '120px'  }}
          position={props.position}
        >
          <Toast show={props.showSb} onClose={props.toggleSb}>
            <Toast.Header
              style={{ backgroundColor: "#3887BE", color: "white" }}
              closeButton={false}
            >
              <strong className="mr-auto">Search for Stations</strong>
              <input
          
          onChange={e => props.onSearchChangeHandler(e)}
          placeholder="Type station name"
        />
              <CloseButton
                variant="white"
                onClick={() => props.toggleSb}
                style={{ right: "20px", position: "absolute" }}
              />
            </Toast.Header>
            <Toast.Body><div className="overflow-auto search-nav-items" style={{height: '150px'}}>
              {" "}
              Stations List: {""}
              <ul>
              {props.searchData.content &&
                  props.searchData.stationData!.map((item, idx) => (
                    
                 <li key={idx} ><button className='btn btn-default' 
                  onClick={()=>{props.flyTo([item.attributes.stLongitude,item.attributes.stLatitude])}}>
                    <span className="font-search">{item.attributes.stCode} - {item.attributes.stName} - {item.attributes.stUF}</span>
                    </button></li>
                  ))}
                  </ul>
                  </div>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </>
    );
  };

  export default SearchToast;