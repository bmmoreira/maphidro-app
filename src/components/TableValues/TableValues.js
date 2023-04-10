import React from 'react';
import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from "react-i18next";


const TableValues = (props) => {
    const { t } = useTranslation();
    const[loaded,setLoaded] = useState(false);
    const [localValues,setYearValues] = useState(props.localValues);
    useEffect(() => {
        
        setYearValues(props.localValues);
        // eslint-disable-next-line no-prototype-builtins
        if(localValues.hasOwnProperty('max')){
            setLoaded(true)
        }
        
    },// optional dependency array
        [ props // 0 or more entries
        ] 
    )

    return (
    <div>
             <div className="container">        
        <div className="row">
            <div className='col-sm-12 loc'>IN SITU-(ANA) - {t('year')}: {localValues.year} </div>
        </div>
    </div>
        <div className="station-local ">
        <Table responsive striped bordered hover size="sm">
           <tbody>
             <tr>
               <th>#</th>
               <th>{t('Jan')}</th>
               <th>{t('Feb')}</th>
               <th>{t('Mar')}</th>
               <th>{t('Apr')}</th>
               <th>{t('May')}</th>
               <th>{t('Jun')}</th>
               <th>{t('Jul')}</th>
               <th>{t('Aug')}</th>
               <th>{t('Sep')}</th>
               <th>{t('Oct')}</th>
               <th>{t('Nov')}</th>
               <th>{t('Dec')}</th>
             </tr>
             <tr>
             <td><span>Max</span></td>
             <td><span>{loaded ? localValues.max[0] : ''}</span></td>
             <td><span>{loaded ? localValues.max[1] : ''}</span></td>
             <td><span>{loaded ? localValues.max[2] : ''}</span></td>
             <td><span>{loaded ? localValues.max[3] : ''}</span></td>
             <td><span>{loaded ? localValues.max[4] : ''}</span></td>
             <td><span>{loaded ? localValues.max[5] : ''}</span></td>
             <td><span>{loaded ? localValues.max[6] : ''}</span></td>
             <td><span>{loaded ? localValues.max[7] : ''}</span></td>
             <td><span>{loaded ? localValues.max[8] : ''}</span></td>
             <td><span>{loaded ? localValues.max[9] : ''}</span></td>
             <td><span>{loaded ? localValues.max[10] : ''}</span></td>
             <td><span>{loaded ? localValues.max[11] : ''}</span></td>
             </tr>
             <tr>
             <td><span>Total</span></td>
             <td><span>{loaded ? localValues.total[0] : ''}</span></td>
             <td><span>{loaded ? localValues.total[1] : ''}</span></td>
             <td><span>{loaded ? localValues.total[2] : ''}</span></td>
             <td><span>{loaded ? localValues.total[3] : ''}</span></td>
             <td><span>{loaded ? localValues.total[4] : ''}</span></td>
             <td><span>{loaded ? localValues.total[5] : ''}</span></td>
             <td><span>{loaded ? localValues.total[6] : ''}</span></td>
             <td><span>{loaded ? localValues.total[7] : ''}</span></td>
             <td><span>{loaded ? localValues.total[8] : ''}</span></td>
             <td><span>{loaded ? localValues.total[9] : ''}</span></td>
             <td><span>{loaded ? localValues.total[10] : ''}</span></td>
             <td><span>{loaded ? localValues.total[11] : ''}</span></td>
             </tr>
           </tbody>
        </Table>
        </div>     
 
    </div>
       )
 };
 export default TableValues