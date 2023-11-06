import UserContext from "../components/authflow/UserContext";
import { useContext, useEffect, useState } from "react";
import { ProjectApis } from '../components/services/api.service';
import Departman from "../components/Departman";

export default function Profile(){

    const {user,logout} = useContext(UserContext);
    const [visible,setVisible] = useState();
    const[oldPassword,setOldPassword] = useState('');
    const[againPassword,setAgainPassword] = useState('');
    const[newPassword,setNewPassword] = useState('');
    const [img,setImg] = useState([]);

    useEffect(()=>{
        const fetchData =async ()=>{
            const data = window.localStorage.getItem("userInformation");
            const info = JSON.parse(data);
            console.log(JSON.stringify(info));
            const imgSource = await ProjectApis.getUserProfilePhoto(info.id);
            
            setImg(imgSource);
            
    
        }
        fetchData();
    },[])

    return(<div className="row mt-5">
        <div className="col-md-12">
            <div className="col-md-6 d-flex m-auto">
                <div className="rounded">
                    <img style={{width:100,height:100}} src={`data:image/jpeg;base64,${img}`}></img>
                </div>
                <div className="ms-3">
                    <span className="d-block">{user?.userName}</span>
                    <span className="d-block">{user?.email}</span>
                    <a href="javascript:;" onClick={logout}>Çıkış</a>
                </div>
            </div>
        </div>
        <div className="col-md-12 mt-3">

            <div className="col-md-6 m-auto">
                <div className="form-group row">
                    <label className="form-label col-md-4">Eski Şifre</label>
                    <div className="col-md-8">
                        <input className="form-control" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type="text" placeholder="Eski Şifre"/>
                    </div>
                </div>
                <div className="form-group row mt-2">
                    <label className="form-label col-md-4">Yeni Şifre</label>
                    <div className="col-md-8">
                        <input className="form-control" value={againPassword} onChange={(e)=>setAgainPassword(e.target.value)} type="text" placeholder="Yeni Şifre"/>
                    </div>
                </div>

                <div className="form-group row mt-2">
                    <label className="form-label col-md-4">Yeni Şifre Tekrar</label>
                    <div className="col-md-8">
                        <input type="text" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder="Yeni Şifre Tekrar" className="form-control"/>
                    </div>
                </div>

                <div className="w-100 mt-2">
                    <button className="btn btn-success w-100 btn-lg" onClick={async ()=>{
                                    if(newPassword !== againPassword) {
                                        alert("Şifreleriniz uyuşmuyor");
                                         return;
                                    }
                                    
                                     const request = {email:user.email,newPassword:newPassword,oldPassword:oldPassword};
                                     try {
                                        const response = await ProjectApis.passwordControl(request);
                                        alert("Şifreniz başarıyla değişitirilmiştir")
                                        setNewPassword('');
                                        setOldPassword('');
                                        setAgainPassword('')
                                        setVisible(false);
                                        
                                     } catch (error) {
                                        console.log(error);
                                        if(error.response.status === 409){
                                            alert("Eski şifrenizi kontrol ediniz")
                                            setNewPassword('');
                                            setOldPassword('');
                                            setAgainPassword('')
                                        }
                                     }
                                     

                        }}>Kaydet</button>
                </div>
                        
                </div>
                        
                        
                    </div>



        </div>)
}