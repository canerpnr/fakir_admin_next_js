import { useEffect, useState } from "react"
import { ProjectApis } from "./services/api.service.ts";
import { Dropdown } from "primereact/dropdown";

export default function Departman(props){
    const [departmanList,setDepartmanList] = useState([]);
    const [userInformation,setUserInfomation] = useState();
    
    useEffect(()=>{
        async function fetchData(){
            if(props.selectedPerson != null){
                const user = await ProjectApis.getPerson(props.selectedPerson);
                console.log(user);
                setUserInfomation(user);
            }


        }
       fetchData();
    },[])
    
    return(
        <div className="form-group row mt-2">
        <label className="form-label col-md-4" >Departman</label>
        <div className="col-md-8">
            <Dropdown style={{width:'100%'}} value={props.value} options={props.departmanList} onChange={props.onChange} />
           {/*
        <select value={props.value} onChange={props.onChange} style={{width:150}}>
            <option value={0}>Seçiniz</option>
            {
                props.selectedPerson != null ?
                (
                    props.departmanList?.map(s=>{
                        return(
                        userInformation.departmanId === s.id ? 
                        (<option selected value={s.id}>{s.name}</option>)
                        :
                        (<option value={s.id}>{s.name}</option>)
                    )})
                ):
                (
                    props.departmanList?.map(s=>{
                        return(
                            (<option value={s.id}>{s.name}</option>)
                        )
                    })
                )

            }
        </select>
        */
}
            
        </div>
    </div>
    )
}