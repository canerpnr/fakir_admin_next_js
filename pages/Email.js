import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ProjectApis } from "../components/services/api.service";
import AppLayout from "../app/layout";
export default function Email(props){

    const {uuid} = useParams();
    const [password,setPassword] = useState();
    const [passwordAgain,setPasswordAgain] = useState();
    useEffect(()=>{

        const fetchData = async ()=>{
            try {
                const data = await ProjectApis.passwordChangeControl({uuid:uuid});
            } catch (error) {
                if(error.response.status === 401){
                    alert("Kullanıcı adı şifre hatalı");
                    window.location="/sign-in"
                }
            }
        }

        fetchData();
        


    },[])

    return(<div style={{padding:50}}>
        <div>
                    <div>
                        <ul style={{listStyleType:"none",display:"flex"}}>
                            <li style={{marginTop:5,width:120}} >Password</li>
                            <li><input value={password} onChange={(e)=>setPassword(e.target.value)} style={{padding:5,display:"inline"}} type="password" required/></li>
                        </ul>
                        <ul style={{listStyleType:"none",display:"flex"}}>
                            <li style={{marginTop:5,width:120}} >Password Tekrar</li>
                            <li><input value={passwordAgain} onChange={(e)=>setPasswordAgain(e.target.value)} style={{padding:5,display:"inline"}} type="password" required/></li>
                        </ul>
                        <ul style={{listStyleType:"none",display:"flex"}}>
                            <li><button onClick={async ()=>{
                                if(password !== passwordAgain){
                                    alert("Şifreniz uyuşmuyor.");
                                    return;
                                }
                                await ProjectApis.changePassword({uuid:uuid,password:password});

                            }
                            
                            }>Kaydet</button></li>
                        </ul>
                    </div>

            
        </div>
        
    </div>)
}
Email.Layout = AppLayout;