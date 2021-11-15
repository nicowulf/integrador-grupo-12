import React from 'react';


function ChartRow(props){
    return (
      <tr>
        <td>{props.brand}</td>
        <td>{props.style}</td>
        <td>{props.origin}</td>
        <td>{props.description}</td>
        <td>
          <a href={props.detail}>
            <i className="fas fa-info-circle fa-2x text-gray-300 text-center"></i>
          </a>
        </td>
      </tr>
    );
    }
    
        

export default ChartRow;