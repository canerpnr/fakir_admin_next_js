import { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { ProjectApis } from '../components/services/api.service';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
export default function NumuneDetail(props){


    const {qr} = useParams();
    const [details,setDetails] = useState([]);
    const [versions,setversion] = useState([]);
    useEffect(()=>{
        
        const fetchData = async ()=>{
            const productVersions = await ProjectApis.getProjectVersions(qr);
            setversion(productVersions);
            const data = await ProjectApis.getDetails(qr);
            //console.log(JSON.stringify(data));
            setDetails(data);
        }
        fetchData();
    },[]);


    return(<div style={{marginTop:50}}>
        {versions.length > 0 &&
        <>
            <div>Bu ürünün alt versiyonları bulunmaktadır</div>
            {versions.map((s,i)=>{
                return(<div key={i}>{s.qr}</div>)
            })}
        </>
        }
                    <DataTable value={details} editMode='row'>
                        <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                            <Column header="Departman Adı" field='currentDepartman.name'></Column>
                            <Column header="Geliş Tarihi" field='date' ></Column>
                            <Column header="Değişiklik Yapan" field='person.nameSurname' ></Column>
                            <Column header="Durum" field='status' ></Column>
                            <Column rowEditor  headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }}></Column>
                            
                    </DataTable>

    </div>)
}