import AppLayout from '../app/layout';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';
import { PersonelColumn1,PersonelContainer } from '../components/PersonelElement';
import { ProjectApis } from '../components/services/api.service';
import { Tag } from 'primereact/tag';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import Departman from '../components/Departman';
import { AiOutlineClose,AiOutlinePlus } from "react-icons/ai";
import { TabPanel,TabView } from 'primereact/tabview';

export default function Personel(){
    const [products, setProducts] = useState(null);
    
    const [email,setEmail] = useState();
    const [nameSurname,setNameSurname] = useState();
    const [photo,setPhoto] = useState();
    const [departman,setDepartman] = useState("");
    const [password,setPassword] = useState();
    const [person,setPerson] = useState([]);
    const[againPassword,setAgainPassword] = useState();
    const [departmanList,setDepartmanList] = useState([]);

    const [departmanListComponent,setDepartmanListComponent] = useState([]);

    const [globalFilterValue, setGlobalFilterValue] = useState('');
    const [yetki,setYetki] = useState();
    const [yetkiList,setYetkiList] = useState([]);

    const [departmanTypeList,setDepartmanTypeList] = useState([]);
    const [departmanType,setDepartmanType] = useState([]);

    const [pozisyon,setPozisyon] = useState();
    const [departmanFilters, setDepartmanFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    function clearState(){
        setEmail("");
        setNameSurname("");
        setDepartman("");
        setPassword("");
        setAgainPassword("");
        if (typeof window !== "undefined") {
            document.querySelector("#photo").value="";
          }
        
    }



    useEffect(() => {

        async function fetchData(){
            const person = await ProjectApis.getPersonsForAdmin()
            setPerson(person);
            //console.log(person);
            const departmanList_ = await ProjectApis.getDepartmanString();
            //console.log(departmanList_)
            setDepartmanList(departmanList_)
            const yetkiList_ = await ProjectApis.getAllAuthority();
            setYetkiList(yetkiList_);
            const setDepartmanListComponent_ = await ProjectApis.getDepartman();
            setDepartmanListComponent(setDepartmanListComponent_);
            setDepartmanTypeList(setDepartmanListComponent_);

        }
       fetchData();
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    async function formSubmit(e){
        if(password !== againPassword){
            alert("Password eşleşmiyor");
            e.preventDefault();
            return;
        }else if(departman == 0){
            alert("Departman seçimi zorunludur");
            e.preventDefault();
            return;
        }
        e.preventDefault();
        const {token} = JSON.parse(window.localStorage.getItem("userInformation")|| '{}');
            const data = await axios.post('http://trackqr.fakir.com.tr/numuneService/multiPart/save/', {
                
                    email: email,
                    nameSurname: nameSurname,
                    password: password,
                    unvan:pozisyon,
                    departmanName:departman,
                    authority:yetki,
                    photo: typeof document !== "undefined" ? document.querySelector('#photo').files:''
                
        }, {
            headers: {
            'mode':'no-cors',
            'Content-Type': 'multipart/form-data',
            'Authorization':`Bearer ${token}`
            }
        }
        );

        if(data.status == 200){
            alert("Kayıt başarılı ");
            clearState();
            
            const newPerson = {
                email:data.data.email,nameSurname:data.data.nameSurname,departmanName:data.data.departmanName,authority:data.data.authority
            }
            const newData = [...person,newPerson];

            setPerson(newData);

        }else if(data.status ==503){
            alert("Profil dosyası yüklerken hata oluştu");
            clearState();
        }
        e.preventDefault();
        
    }

    const onRowEditComplete = async (e) => {
        //console.log("EEEEEEEEEE : ");
        //console.log(e);


        const updateData = {
            id:e.newData.id,
            email:e.newData.email,
            nameSurname:e.newData.nameSurname,
            departmanId:e.newData.departmanId,
            departmanName:e.newData.departmanName,
            authority:e.data.authority
        }

        const response = await ProjectApis.updateAdminPerson(updateData);
        let _person = [...person];
        let { newData, index } = e;
        newData.authority = e.data.authority
        _person[index] = newData;
        setPerson(_person);

    };
    const getSeverity = (value) => {
        return "success";
    };


    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.departmanName} severity={getSeverity(rowData.departmanName)}></Tag>;
    };
    const [filters, setFilters] = useState({
        email: { value: null, matchMode: FilterMatchMode.CONTAINS },
        nameSurname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        'departmanName': { value: null, matchMode: FilterMatchMode.EQUALS},
        'authorities.role': { value: null, matchMode: FilterMatchMode.EQUALS},
    });

    const renderHeader = () => {
        return (
            <div className="flex justify-content-end">
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                    
                </span>
            </div>
        );
    };
    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };
    const header = renderHeader;

    const statusItemTemplate = (option) => {
        //console.log("************** ");
        //console.log(option);
        return <Tag value={option.name} severity={getSeverity(option.name)} />;
    };

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={departmanList} onChange={(e) =>{
                options.filterApplyCallback(e.value)
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>} placeholder="Select One" className="p-column-filter" style={{ minWidth: '12rem' }} />
        );
    };

    const [y_,setY_] = useState("");

    const textEditor = (options) => {

        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const authoritiesEditor = (options)=>{
        //console.log(options)
        return(
                
            <ul style={{listStyleType:'none'}}>{
                person[options.rowIndex].authority.map((s,i)=>{
                    return (<div key={i} id={s} style={{display:'flex'}}><AiOutlineClose onClick={(e)=>{
                        const person_ = [...person];
                        const authority_ = [...person[options.rowIndex].authority];

                        

                            let index = authority_.findIndex(r=>r === s);
                            if(index !== -1){
                                //console.log("Çıktı : ")
                                //console.log(s);
                                authority_.splice(index,1);
                            }
   
                        
                        person_[options.rowIndex] = {...person_[options.rowIndex],authority:authority_};
                        setPerson(person_);

                    }}></AiOutlineClose><li className='pi'>{s}</li></div>)
                })
                
                }
                <li style={{display:"flex"}}><AiOutlinePlus onClick={()=>{
                    const person_ = [...person];
                    let authority_ = person_[options.rowIndex].authority;
                    authority_.push(y_);
                    person_[options.rowIndex].authority = authority_;
                    setPerson(person_);
                    
                }}></AiOutlinePlus>
                <Dropdown options={yetkiList} value={y_} onChange={(e)=>setY_(e.target.value)} />
                </li>
            </ul>
        ) 

    }

    const authoritiesBody =(options)=>{
        //console.log(options)
        
            return(
                
                <ul style={{listStyleType:'none'}}>{
                    
                        options.authority?.map(s=>{
                            return (<div key={s.id} style={{display:'flex'}}><li className='pi'>{s}</li></div>)
                        })
                }
                </ul>
            ) 
       
    }


    const departmanEditor = (options) =>{
        
        return (
            <Dropdown value={options.value} options={departmanList} onChange={(e) =>{
                options.editorCallback(e.target.value);
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>}  style={{ minWidth: '12rem' }} />
        );
    }

    const authoritiesRowFilter = (options)=>{
        //console.log(options);
        return (
            <Dropdown value={options.value} options={yetkiList} onChange={(e) =>{
                options.filterApplyCallback(e.target.value);
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>}  style={{ minWidth: '12rem' }} />
        );
    }

    const onRowEditCompleteDepartman =async (e)=>{
        //console.log(e);
        let _departmanListComponent = [...departmanListComponent];
        let { newData, index } = e;

        _departmanListComponent[index] = newData;

        setDepartmanListComponent(_departmanListComponent);
        const data_ =await  ProjectApis.updateDepartman({id:e.newData.id,name:e.newData.name})
    }

    const deleteBody = (data,options)=>{
        return(<a onClick={async()=>{
            if(window.confirm("Silmek istediğinize eminmisiniz?")){
                //console.log(data);
                //console.log(options);
                await ProjectApis.deleteDepartman({id:data.id});
                let {index} = options;
                const _departmanTypeList = [...departmanTypeList];
                _departmanTypeList.splice(index,1);
                setDepartmanTypeList(_departmanTypeList);
            }
            
        }}>Sil</a>)
    }

    return(
        <TabView style={{marginTop:50}}>
            <TabPanel header="Personeller">

             
                <div className='row'>
                <div className='col-md-4'>
                    <form onSubmit={(e)=>formSubmit(e)}>
                        
                        <div className='form-group row'>
                            <label className='form-label col-md-4'>Email</label>
                            <div className='col-md-8'>
                                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='form-control' type="text" required/></div>
                        </div>
                        <div className='form-group row mt-2'>
                            <label className='form-label col-md-4'>Ad Soyad</label>
                            <div className='col-md-8'>
                                <input value={nameSurname} onChange={(e)=>setNameSurname(e.target.value)} className='form-control' type="text" required/>
                            </div>
                        </div>

                        <div className='form-group row mt-2'>
                            <label className='form-label col-md-4'>Şifre</label>
                            <div className='col-md-8'>
                                <input type="password"  value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control' required/>
                            </div>
                        </div>

                        <div className='form-group row mt-2'>
                            <label className='form-label col-md-4'>Şifre Tekrar</label>
                            <div className='col-md-8'>
                                <input  value={againPassword} onChange={(e)=>setAgainPassword(e.target.value)} className='form-control' type="password" required/>
                            </div>
                        </div>

                        <div className='form-group row mt-2'>
                            <label className='form-label col-md-4'>Pozisyon</label>
                            <div className='col-md-8'>
                                <input  value={pozisyon} onChange={(e)=>setPozisyon(e.target.value)} className='form-control' required/>
                            </div>
                        </div>

                        <div className='form-group row mt-2'>
                            <label className='form-label col-md-4'>Profil</label>
                            <div className='col-md-8'>
                                <input id="photo" className='form-control' type="file" required/>
                            </div>
                        </div>


                        <Departman departmanList={departmanList} selectedPerson={null} value={departman} onChange={(e)=>{
                                setDepartman(e.target.value);
                            }} />
                            
                        
                        <div className='form-group row mt-2'>
                            <label className='form-label col-md-4'>Yetki</label>
                            <div className='col-md-8'>

                                <select value={yetki} onChange={(e)=>{
                                    
                                    setYetki(e.target.value)
                                }} className='form-control'>
                                    <option value={0} >Seçiniz</option>
                                    <option value={'ADMIN'}>ADMIN</option>
                                    <option value={'USER'}>USER</option>
                                </select>
                                    
                            </div>
                        </div>
                        
                        <div className='w-100 mt-2'>
                            <button  type='submit' className='btn btn-success btn-lg w-100'>Kaydet</button>
                        </div>
                    </form>
                </div>
 
                
                
                <div  className='col-md-8 card p-fluid'>
                    <DataTable paginator rows={5} filters={filters} filterDisplay="row" editMode="row"
                    globalFilterFields={['email', 'nameSurname', 'departmanName',"authorities.role"]}  dataKey="id" value={person} tableStyle={{ minWidth: '50rem' }} onRowEditComplete={onRowEditComplete}>
                        
                        <Column editor={(options) => textEditor(options)} field="email" filter header="Email" ></Column>
                        <Column editor={(options) => textEditor(options)}  field="nameSurname" filter header="Ad Soyad"></Column>
                        <Column field="departmanName" header="Departman"   showFilterMenu={false} editor={(options)=>departmanEditor(options)}  body={statusBodyTemplate} filter filterElement={(options)=>statusRowFilterTemplate(options)}  ></Column>
                        <Column editor={(options) => authoritiesEditor(options)} field="authorities.role" body={authoritiesBody}  header="Yetkiler"></Column>

                        <Column rowEditor headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>

                </div>
                </div>
         
            </TabPanel>
            <TabPanel header="Departman Ekle">
            <div className='row'>
            <div className='col-md-4'>
                    <div className='form-group row'>
                        <label className='form-label col-md-4'>Departman Adı</label>
                        <div className='col-md-8'>
                            <InputText value={departmanType} onChange={(e)=>setDepartmanType(e.target.value)} style={{width: '100%'}} type="text" required/>
                        </div>
                    </div>

                                
                        <div className='w-100 mt-2'>
                            <button  type='submit' className='btn btn-success btn-lg w-100' onClick={async()=>{

                            const obj = {name:departmanType};
                            const data_ = await ProjectApis.saveDepartman(obj);

                            const newDepartman = departmanType;
                            const newDepartmanList = [...departmanList];
                            newDepartmanList.push(newDepartman);
                            setDepartmanList(newDepartmanList);

                            }}>Kaydet</button>
                        </div>

                    </div>
                    <div className='col-md-8'>

                    <DataTable dataKey="id" value={departmanTypeList} globalFilterFields={['name']} editMode='row' onRowEditComplete={onRowEditCompleteDepartman} filters={departmanFilters} filterDisplay="row">
                        <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                        <Column header="Departman Adı" field='name' editor={(options) => textEditor(options)} filter></Column>
                        <Column body={(data,options)=>deleteBody(data,options)}>
                                
                        </Column>
                        <Column rowEditor headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    </DataTable>
                    </div>
                    </div> 
        </TabPanel>

        </TabView>

    )
}
Personel.Layout = AppLayout;