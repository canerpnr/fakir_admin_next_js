import { useState ,useEffect} from "react";
import { ProjectApis } from "./services/api.service.ts";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/themes/lara-light-indigo/theme.css";
export default function Kategori(props){


    useEffect(()=>{

        
    },[])

    return(
        <div className="form-group row mt-2">
            <label className="form-label col-md-4">Kategori</label>
            <div className="col-md-8">
                <Dropdown id={props.id} style={{width: '100%'}} options={props.kategoriList} onChange={props.onChange}/>
                </div>
        </div>
    )
}