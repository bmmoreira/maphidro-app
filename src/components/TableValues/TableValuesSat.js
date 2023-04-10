import React from 'react';
import {useState, useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import './TableValues.css';
import { useTranslation } from "react-i18next";


const TableValues = (props) => {
    const { t } = useTranslation();
    const[loaded,setLoaded] = useState(false);
    const [satValues,setYearValues] = useState(props.satValues);
    useEffect(() => {
        
        setYearValues(props.satValues);
        // eslint-disable-next-line no-prototype-builtins
        if(satValues.hasOwnProperty('max')){
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
            <div className='col-sm-12 sat'> IMERGE-(INPE-CPTEC) - {t('year')}: {satValues.year} </div>
        </div>
    </div>
        <div className="station-sat">
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
             <td><span>{loaded ? satValues.max[0] : ''}</span></td>
             <td><span>{loaded ? satValues.max[1] : ''}</span></td>
             <td><span>{loaded ? satValues.max[2] : ''}</span></td>
             <td><span>{loaded ? satValues.max[3] : ''}</span></td>
             <td><span>{loaded ? satValues.max[4] : ''}</span></td>
             <td><span>{loaded ? satValues.max[5] : ''}</span></td>
             <td><span>{loaded ? satValues.max[6] : ''}</span></td>
             <td><span>{loaded ? satValues.max[7] : ''}</span></td>
             <td><span>{loaded ? satValues.max[8] : ''}</span></td>
             <td><span>{loaded ? satValues.max[9] : ''}</span></td>
             <td><span>{loaded ? satValues.max[10] : ''}</span></td>
             <td><span>{loaded ? satValues.max[11] : ''}</span></td>
             </tr>
             <tr>
             <td><span>Total</span></td>
             <td><span>{loaded ? satValues.total[0] : ''}</span></td>
             <td><span>{loaded ? satValues.total[1] : ''}</span></td>
             <td><span>{loaded ? satValues.total[2] : ''}</span></td>
             <td><span>{loaded ? satValues.total[3] : ''}</span></td>
             <td><span>{loaded ? satValues.total[4] : ''}</span></td>
             <td><span>{loaded ? satValues.total[5] : ''}</span></td>
             <td><span>{loaded ? satValues.total[6] : ''}</span></td>
             <td><span>{loaded ? satValues.total[7] : ''}</span></td>
             <td><span>{loaded ? satValues.total[8] : ''}</span></td>
             <td><span>{loaded ? satValues.total[9] : ''}</span></td>
             <td><span>{loaded ? satValues.total[10] : ''}</span></td>
             <td><span>{loaded ? satValues.total[11] : ''}</span></td>
             </tr>
           </tbody>
        </Table>
        </div>     
 
    </div>
       )
 };
 export default TableValues