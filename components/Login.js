import { useContext, useState } from "react";
import styled from "styled-components";
import { ProjectApis } from "./services/api.service.ts";
import UserContext from "./authflow/UserContext.js";
import { Dialog } from "primereact/dialog";

const LoginBtn = styled.button`
margin-left:25px;
background-color:#5887DA;
height:60px;
width:100px;
margin:auto;
border-width:1px;
border-radius:5px;

`;
const Login = (props)=>{

    const {login} = useContext(UserContext);
    const [email,SetEmail] = useState('');
    const [password,setPassword] = useState('');
    const [forgetPasswordDialog,setForgetPasswordDialog] = useState(false);
    const [forgetEmail,setForgetEmail] = useState();
    return(
        <div className="row mt-5">
                 
                <div className="col-md-4 m-auto p-4 rounded" style={{backgroundColor: '#cccccc57'}}>
                    <div className="form-group p-2">
                        <label className="form-label">Email</label>
                        <input value={email} onChange={(e)=>SetEmail(e.target.value)} className="form-control" type="text" required/>
                    </div>
                    <div className="form-group p-2">
                        <label className="form-label">Şifre</label>
                        <input value={password} onChange={(e)=>setPassword(e.target.value)}  className="form-control" type="password" required/>
                    </div>
                    <div className="form-group p-2 d-flex justify-content-end">
                        <a href="javascript:;" onClick={()=>setForgetPasswordDialog(true)}>Şifremi Unuttum</a>
                    </div>
                    <button className="btn btn-primary w-100 p-2 btn-lg" type="button" onClick={(e)=>{                    
                        try {
                            const request = {email:email,password:password}
                            //console.log(request)
                            const data = login(email,password);

                            //console.log(JSON.stringify(data));
                        } catch (error) {
                            console.log(error)
                            if(error.response.status === 400){
                                alert("Kullanıcı adı şifre hatalı")
                            }
                        }

                        }}>Giriş Yap</button>
                </div>
                
                
                <Dialog visible={forgetPasswordDialog} style={{ width: '50vw' }} onHide={()=>setForgetPasswordDialog(false)}>
                    Kullanmış olduğunuz email adresinizi giriniz.<br/>
                    <input value={forgetEmail} onChange={(e=>setForgetEmail(e.target.value))} type="text" /><br/>
                    <button onClick={async ()=>
                    {
                        const request = {email:forgetEmail};
                        const response = await ProjectApis.sendEmail(request);
                        setForgetEmail("");
                        setForgetPasswordDialog(false);
                    }
                    }>Password Doğrula</button>
                </Dialog>
           

          </div>
    )
}
export default Login;