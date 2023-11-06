
import Departman from '../components/Departman';
import { useEffect, useState } from 'react';
import { ProjectApis } from '../components/services/api.service';
import { Dialog } from 'primereact/dialog';
import { Tag } from 'primereact/tag';
import Kategori from '../components/Kategori';
import AltKategori from '../components/AltKategori';
import NumuneKategori from '../components/NumuneKategori';
import { InputText } from 'primereact/inputtext';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import Tedarikci from '../components/NumuneType';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import NumuneType from '../components/NumuneType';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';
import { FileUpload } from 'primereact/fileupload';
import QRCode from 'react-qr-code';
import { Checkbox } from 'primereact/checkbox';
import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
export default function Numune(){

    const [departman,setDepartman] = useState();
    const [departmanListComponent,setDepartmanListComponent] = useState([]);

    const [kategoriList,setKategoriList] = useState([]);
    const [kategori,setKategori] = useState();

    const [altKategoriList,setAltKategoriList] = useState([]);
    const [altKategori,setAltKategori] = useState();

    const [numuneKategoriList,setNumuneKategoriList] = useState([]);
    const [numuneKategori,setNumuneKategori] = useState();

    const [numuneKategoriListString,setNumuneKategoriListString] = useState([]);

    const [numuneName,setNumuneName] = useState();

    const [numuneList,setNumuneList] = useState([]);

    const [tedarikci,setTedarikci] = useState();

    const [tedarikciListString,setTedarikciListString] = useState([]);
    const [tedarikciList,setTedarikciList] = useState([]);


    const [tedarikciType,setTedarikciType] = useState();

    const [kategoriListString,setKategoriListString] = useState([]);


    
    const [productTypeListString,setProductTypeListString] = useState([]);



    const [numuneType,setNumuneType] = useState();
    const [numuneTypeList,setNumuneTypeList] = useState([]);

    const [marka,setMarka] = useState();
    const [numune,setNumune] = useState();
    const [markaList,setMarkaList] = useState();
    const [markaListString,setMarkaListString] = useState();

    const [brand,setBrand] = useState();

    const [qrCode,setQrCode] = useState();

    const [image,setImage] = useState();

    const [addVersion,setAddVersion] = useState(false);

    const [productQR,setProductQr] = useState("");
    const [aciklama,setAciklama] = useState('');
    const [editing,setEditing] = useState(false);

    const [newData,setNewData] = useState();


    useEffect(()=>{
        const fetchData = async ()=>{
            const departmanListComponent_ = await ProjectApis.getDepartmanString();
            setDepartmanListComponent(departmanListComponent_);

            const kategoriList_ = await ProjectApis.getCategories();
            setKategoriList(kategoriList_);

            const kategoriString = [];
            kategoriList_.map(s=>{
                kategoriString.push(s.value);
                
            });
            
            const tedarikciList_ = await ProjectApis.getTedarikci();
            const tedarikciListString_ = [];
            setTedarikciList(tedarikciList_);
            tedarikciList_.map(s=>{
                tedarikciListString_.push(s.name);
            })

            setTedarikciListString(tedarikciListString_);
            
            setKategoriListString(kategoriString);
            const productTypeList_ = await ProjectApis.getProductTypes();
            setNumuneTypeList(productTypeList_);
            const productTypeListString_=[];
            productTypeList_.map(s=>{
                productTypeListString_.push(s.name);
            })
            setProductTypeListString(productTypeListString_);

            const markaList_ = await ProjectApis.getBrands();
            const markaListString_ = [];
            markaList_.map(s=>markaListString_.push(s.name));
            const numuneList_ = await ProjectApis.getNumuneList();

            const versionList = await ProjectApis.getProjectVersionsAll();

            numuneList_.push(...versionList);
            setNumuneList(numuneList_);
            setMarkaListString(markaListString_);
            setMarkaList(markaList_);
        }
      
        fetchData();
        
    },[])

    useEffect(()=>{
        const fetchData = async ()=>{
            const markaList_ = await ProjectApis.getBrands();
            const markaListString_ = [];
            markaList_.map(s=>markaListString_.push(s.name));
            setMarkaList(markaList_);
        }
        fetchData();
        
    },[markaListString]);



    const onFileSelect = (e)=>{
        
        let files = e.files;
        setImage(files);
    }

    const clearState = ()=>{
        setNumuneName("");
        setKategori();
        setAltKategori();
        setNumuneKategori();
        setNumuneType();
        setDepartman();
        setTedarikciType();
        setMarka();
        setImage();
        setProductQr();
        if (typeof window !== "undefined") {
            document.querySelector("#kategoriList .p-dropdown-label").classList.add("p-dropdown-label-empty");
            document.querySelector("#altKategori .p-dropdown-label").classList.add("p-dropdown-label-empty");
            document.querySelector("#numuneKategori .p-dropdown-label").classList.add("p-dropdown-label-empty");
            document.querySelector("#numuneTypeList .p-dropdown-label").classList.add("p-dropdown-label-empty");
            document.querySelector("#tedarikciList .p-dropdown-label").classList.add("p-dropdown-label-empty");
                        
          }
            
                                
    }
    async function formSubmit(e){
        e.preventDefault();
        const {token} = JSON.parse(window.localStorage.getItem("userInformation")|| '{}');

        //console.log(token);

        const data = await axios.post('http://localhost:9090/multiPart/product/save/', {
        
        name:numuneName,
        kategori:kategori,
        altKategori:altKategori,
        numuneKategori:numuneKategori,
        numuneType:numune,
        departman:departman,
        tedarikciType:tedarikciType,
        marka:brand,
        image: image,
        addVersion:addVersion,
        versionOfProductQr:productQR
        
        }, {
        headers: {
        'mode':'no-cors',
        'Content-Type': 'multipart/form-data',
        'Authorization':`Bearer ${token}`
        }
        }
        );

        if(data.status === 200){
            alert("Kayıt başarılı");
            const _numuneList = [...numuneList];
            _numuneList.push(data.data);
            setNumuneList(_numuneList);
            clearState();
        }

        
        
    }

    const [filters, setFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        qr: { value: null, matchMode: FilterMatchMode.CONTAINS },
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        altKategori: { value: null, matchMode: FilterMatchMode.EQUALS},
        numuneKategori: { value: null, matchMode: FilterMatchMode.EQUALS},
        departman: { value: null, matchMode: FilterMatchMode.EQUALS},
        tedarikci:{ value: null, matchMode: FilterMatchMode.STARTS_WITH},
        marka:{ value: null, matchMode: FilterMatchMode.STARTS_WITH},
    });

    const [numuneTuruFilters, setNumuneTuruFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [tedarikciFilters, setTedarikciFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const [markaFilters, setMarkaFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onRowEditComplete = (e)=>{
        let _numuneList = [...numuneList];
        let { newData, index } = e;

        _numuneList[index] = newData;

        setNumuneList(_numuneList);
        setNewData(newData);
        //console.log(e);
    }
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const aciklamaTextEditor = (options) => {
        return <InputText type="text" placeholder='Açıklama giriniz.' value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const onRowEditCompleteNumune = async(e)=>{

        let _numune = [...numuneTypeList];
        let{newData,index} = e;
        _numune[index] = newData;
        setNumuneTypeList(_numune);

        let _productTypeListString = [...productTypeListString];
        _productTypeListString.push(newData.name);
        setProductTypeListString(_productTypeListString);

        const data = await ProjectApis.updateProductType(newData);
     
    }

    const onRowEditCompleteTedarik =async (e)=>{
        let _tedarik = [...tedarikciList];
        let{newData,index} = e;
        _tedarik[index] = newData
        
        setTedarikciList(_tedarik);
        let _tedarikciListString = [...tedarikciListString];
        _tedarikciListString.push(newData.name);
        setTedarikciListString(_tedarikciListString);

        const data = await ProjectApis.updateTedarikci(newData);
 
    }

    const onRowEditCompleteMarka =async (e)=>{

        let _markaList = [...markaList];
        let{newData,index} = e;
        _markaList[index] = newData
        setMarkaList(_markaList);

        const _markaListString = [...markaListString];
        markaListString.push(newData.name);
        setMarkaListString(_markaListString);
        const data = await ProjectApis.updateBrand(newData);
     
    }


    const qrBody = (rowData)=>{
     
        return(
            <div style={{display:'block',margin:'auto',textAlign:'center'}}>
            <QRCode 
                            size={256}
                            style={{ height: "auto", maxWidth: "50%", width: "50%",textAlign:'center'}}
                            value={rowData.qr}
                            viewBox={`0 0 256 256`}
                        />
                        <div>
                        <span>{rowData.qr}</span>
                        </div>
                        
            </div>
        )
    }


    const deleteNumuneType =  (data,options)=>{
        
        return(<a onClick={async()=>{
            if(window.confirm("Emin misiniz?")){
              
                await ProjectApis.deleteNumune({id:data.id})
                let {rowIndex} = options;
                const _numuneTypeList = [...numuneTypeList];
                
                _numuneTypeList.splice(rowIndex,1);
                setNumuneTypeList(_numuneTypeList);


                const _productTypeListString = [...productTypeListString];
                const index = _productTypeListString.findIndex(s=>s === data.name);
                _productTypeListString.splice(index,1);
                setProductTypeListString(_productTypeListString);
            }

        }

        }>Sil</a>)
    }

    const deleteTedarikci = (data,options)=>{

        return(<a onClick={async()=>{
            await ProjectApis.deleteTedarikci({id:data.id});

            let {rowIndex} = options;
            const _tedarikcliList = [...tedarikciList];
            _tedarikcliList.splice(rowIndex,1);
            setTedarikciList(_tedarikcliList);

            const index = tedarikciListString.findIndex(s=>s === data.name);
            const _tedarikciListString = [...tedarikciListString];
            _tedarikciListString.splice(index,1);
            setTedarikciListString(_tedarikciListString);


        }}>Sil</a>)
    }

    const deleteMarka = (data,options)=>{
        return(<a onClick={async()=>{
            await ProjectApis.deleteMarka({id:data.qr});

            let {rowIndex} = options;
            const _markaList = [...markaList];
            _markaList.splice(rowIndex,1);
            setMarkaList(_markaList);

            const index = markaListString.findIndex(s=>s === data.name);
            const _markaListString = [...markaListString];
            _markaListString.splice(index,1);
            setMarkaListString(_markaListString);


        }}>Sil</a>)
    }

    const detailBody = (data,options)=>{
        
        const id = data.qr;
        return(<Link to={`/numuneDetail/${data.qr}`}>Detay</Link>)
    }

    const getSeverity = (value) => {
        return "success";
    };

    const rowEditorTemplate=(rowData, props)=> {
        const rowEditor = props.rowEditor;
       
           // custom init element
            return (
                <button type="button" onClick={rowEditor.onInitClick}>
                    <span>Düzenle</span>
                </button>
            )
        
    }

    const statusRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={departmanListComponent} onChange={(e) =>{
                options.filterApplyCallback(e.value)
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>} placeholder="Select One" className="p-column-filter" style={{ minWidth: '12rem' }} />
        );
    };

    const departmanEditor = (options) =>{
        
        return (
            <Dropdown value={options.value} options={departmanListComponent} onChange={(e) =>{
                options.editorCallback(e.target.value);
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>}  style={{ minWidth: '12rem' }} />
        );
    }

    const tedarikciEditor = (options) =>{
        
        return (
            <Dropdown style={{ minWidth: '5rem',maxWidth:'10rem' }} value={options.value} options={tedarikciListString} onChange={(e) =>{
                options.editorCallback(e.target.value);
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>} />
        );
    }

    const markaEditor = (options) =>{
        
        return (
            <Dropdown value={options.value} options={markaListString} onChange={(e) =>{
                options.editorCallback(e.target.value);
            }} itemTemplate={(option)=><Tag value={option} severity={getSeverity(options.value)}></Tag>}  style={{ minWidth: '12rem' }} />
        );
    }

    const deleteProduct = (option)=>{

        return(
            <a href='#' onClick={async ()=>{
                const numuneList_ = [...numuneList];
                const index = numuneList_.findIndex(s_=>s_.id === option.id);
                numuneList_.splice(index,1);
                setNumuneList(numuneList_);
                await ProjectApis.deleteProduct(option)
            }}>Sil</a>
        )
    }

return(
<TabView style={{marginTop:50}}>

    <TabPanel header="Numuneler">

        <div className='row'>
        <Dialog visible={editing} style={{ width: '50vw' }} onHide={()=>setEditing(false)}>
        Açıklama girmeniz gerekmektedir.<br/>
        <input onChange={(e)=>setAciklama(e.target.value)} type="text" /><br/>
        <button onClick={async ()=>
        {
            console.log(newData);
            const request = newData;
            request.aciklama = aciklama;
            await ProjectApis.updateProduct(newData);

            setEditing(false);
        }
        }>Password Doğrula</button>
    </Dialog>
        <div  className='col-md-12 card p-fluid'>
              <DataTable value={numuneList}  paginator rows={5} filters={filters} filterDisplay="row" editMode="row"
                  globalFilterFields={['name', 'departman', 'createdDate','qr']}  dataKey="id" tableStyle={{ minWidth: '50rem' }} onRowEditComplete={onRowEditComplete}>
                    
                    <Column editor={(options) => textEditor(options)} field="name" filter header="Numune" ></Column>
                    <Column  editor={(options) => departmanEditor(options)}  field="departman" filter header="Departman" filterElement={(options)=>statusRowFilterTemplate(options)} ></Column>
                    <Column field="createdDate" header="Oluşturulma Tarihi" showFilterMenu={false}  filter  ></Column>
                    <Column  field='tedarikci' editor={(options)=> tedarikciEditor(options)} filter header="Tedarikçi"></Column>
                    <Column field='marka' filter editor={(options)=>markaEditor(options)} header="Marka"></Column>
                    <Column field='qr' style={{textAlign: 'center'}} filter header="QR" body={qrBody}></Column>
                    
                    <Column body={(options)=>deleteProduct(options)}></Column>
                    <Column body={(data,options)=>detailBody(data,options)}></Column>
                  

                    <Column 
  rowEditor
  header={'Düzenle'}
  body={(rowData, options) => (
    <>
      {options.rowEditor?.editing ? (
        <>
          <Button
            icon="pi pi-save"
            className="p-button-rounded mr-2 p-button-outlined"
            onClick={(e) =>{
                setEditing(true)
              options.rowEditor?.onSaveClick &&
              options.rowEditor?.onSaveClick(e)
            }

            }
          
            tooltipOptions={{ position: "top" }}
          />
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-outlined"
            onClick={(e) =>{
                setEditing(false);
                options.rowEditor?.onCancelClick &&
                options.rowEditor?.onCancelClick(e)
            }

            }
            
            tooltipOptions={{ position: "top" }}
            severity="warning"
          />
        </>
      ) : (
        <>
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded mr-2 p-button-outlined"
            onClick={(e) =>{
                if(editing == true){
                    alert("Aktif olan değişiklikleri iptal ediniz.")
                    return;
                }

              options.rowEditor?.onInitClick &&
              options.rowEditor?.onInitClick(e)
            }

            }
            tooltip=''
            tooltipOptions={{ position: "top" }}
            severity="success"
          />

        </>
      )}
    </>
  )}
></Column>
              </DataTable>
  
          </div>
    </div>
 
    </TabPanel>


    <TabPanel header="Numune Ekle">

        <div className='row'>
        <div className='col-md-12'>
            <form onSubmit={(e)=>formSubmit(e)}>
                
                <div className='form-group row'>
                    <label className='form-label col-md-4'>Numune Adı</label>
                    <div className='col-md-8'>
                        <input required className='form-control' value={numuneName} onChange={(e)=>setNumuneName(e.target.value)}/>
                    </div>
                </div>
                    
                    <Kategori id="kategoriList" deneme=''  kategoriList = {kategoriListString}
                     
                      onChange={async (e)=>{

                        let id = null;
                        kategoriList.map(s=>{
                            if(s.value === e.target.value){
                                setKategori(s.id)
                                if(typeof document !== "undefined"){
                                    document.querySelector("#kategoriList .p-dropdown-label").textContent = e.target.value;
                                    document.querySelector("#kategoriList .p-dropdown-label").classList.remove("p-dropdown-label-empty");
                                    
                                }
                                
                                const altKategori_ = [];
                                s.subCategory.map(sub=>{
                                    altKategori_.push(sub.value);
                                })
                                setAltKategoriList(altKategori_);
                                setAltKategori("");
                            }
                        })

                          
                      }} />
                    
                    
                    <AltKategori id="altKategori" kategoriList = {altKategoriList} 
                    value={altKategori} 
                    onChange={async (e)=>{

                      const productKategory_ =[];
                      if(e.target.value !== ""){
                            kategoriList.map(s=>{
                                s.subCategory.map(t=>{
                                    if(t.value ===e.target.value){
                                        setAltKategori(t.id);
                                        t.product.map(p=>{
                                            productKategory_.push(p.value);
                                        })
                                        setNumuneKategoriListString(productKategory_);
                                        setNumuneKategoriList(t.product);
                                        if(typeof document !== "undefined"){
                                            document.querySelector("#altKategori .p-dropdown-label").textContent = e.target.value;
                                            document.querySelector("#altKategori .p-dropdown-label").classList.remove("p-dropdown-label-empty");
                                            
                                        }
                                        
                                        setNumuneKategori("");
                                    }
                                })
                            })
                      }
  
                    }
                    
                    
                    }/>
                    
                    
  
                    {numuneKategoriListString.length > 0 &&
                                      <NumuneKategori id="numuneKategori"
                                      kategoriList={numuneKategoriListString}
                                      value={numuneKategori}
                                      onChange={(e)=>{

                                        numuneKategoriList.map(s=>{
                                            if(s.value == e.target.value){
                                                setNumuneKategori(s.id);
                                                    if(typeof document !== "undefined"){
                                                        document.querySelector("#numuneKategori .p-dropdown-label").textContent = e.target.value;
                                                        document.querySelector("#numuneKategori .p-dropdown-label").classList.remove("p-dropdown-label-empty");
                                                        
                                                    }
                                                
                                            }
                                        })

                                      }}/>
                    }
  
                    
                    
  
                      <NumuneType id={'numuneTypeList'} list={productTypeListString} value={numune} onChange={(e)=>{
                        numuneTypeList.map(s=>{
                            if(s.name === e.target.value){
                                if(typeof document !== "undefined"){
                                    document.querySelector("#numuneTypeList .p-dropdown-label").textContent = e.target.value;
                                    document.querySelector("#numuneTypeList .p-dropdown-label").classList.remove("p-dropdown-label-empty");
    
                                }

                                setNumune(s.id)
                            }
                        })
                        
                      }
                        
                    } 
                        />
  
                       
                    <Departman departmanList={departmanListComponent} selectedPerson={null} value={departman} onChange={(e)=>{
                              
                              setDepartman(e.target.value);
                          }} />
                        
                   
                    
  
                <div className='form-group row mt-2'>
                        <label className='form-label col-md-4' >Tedarikçi</label>
                        <div className='col-md-8'>

                            <Dropdown style={{width:'100%'}} id="tedarikciList" options={tedarikciListString} onChange={(e)=>{

                                tedarikciList.map(s=>{
                                    if(s.name === e.target.value){
                                        setTedarikciType(s.id);
                                        if(typeof document !== undefined){
                                            document.querySelector("#tedarikciList .p-dropdown-label").textContent = e.target.value;
                                            document.querySelector("#tedarikciList .p-dropdown-label").classList.remove("p-dropdown-label-empty");
                                        
                                        }

                                    }
                                })
                            }}/>
                        </div>
                </div>
                    
               
  
                <div className='form-group row mt-2'>
                        <label className='form-label col-md-4' >Marka</label>
                        <div className='col-md-8'>
                        <Dropdown  style={{width:'100%'}} id="brandList" options={markaListString} onChange={async (e)=>{
                            markaList.map(s=>{
                                if(s.name === e.target.value){
                                    setBrand(s.id);
                                    if(typeof document !== "undefined"){
                                        document.querySelector("#brandList .p-dropdown-label").textContent = e.target.value;
                                        document.querySelector("#brandList .p-dropdown-label").classList.remove("p-dropdown-label-empty");
                                        
                                    }

                                }
                            })
                            const data = await ProjectApis.getBrands();
                            setMarkaList(data);
                        }}/>
                    </div>
                </div>
                    

        
                <div className='form-group row mt-2'>
                    <label className='form-label col-md-4' >Resim</label>
                    <div className='col-md-8'>

                    <FileUpload name='photo[]' style={{width: '100%'}} onSelect={onFileSelect} customUpload required mode="advanced" id="photo"  accept="image/*" maxFileSize={1000000}  />

                    </div>
                </div>
                
                <div className='form-group row mt-2'>
                    <label className='form-label col-md-4' > </label>
                    <div className='col-md-8'>
                        <Checkbox inputId="ingredient1" name="pizza" value={addVersion} onChange={(val)=>{
                            setAddVersion(val.checked)
                            if(val.checked === false) setProductQr("");
                        }} checked={addVersion}  />
                        <label  style={{marginLeft:10}} htmlFor="ingredient1" className="ml-2">Versiyon olarak eklemek istiyorum</label>
                    </div>
                </div>

                {addVersion && 
                               <div className='form-group row mt-2'>
                                <label className='form-label col-md-4' >QR Kod</label>
                                <div className='col-md-8'>
                                        <InputText size={50} style={{width: '100%'}} value={productQR} onChange={(e)=>setProductQr(e.target.value)} placeholder='Qr kodu giriniz'/>
                                    </div>
                
                                </div>
                }

  
                <div className='w-100 mt-2'>
                    
                    <button  type='submit' className='btn btn-success btn-lg w-100'>Kaydet</button>
                    
                </div>
                
            </form>
        </div>
    </div>
 
    </TabPanel>

    <TabPanel header="Numune Türü">
            <div className='row'>

            <div className='col-md-4'>
                    <div className='form-group row'>
                        <label className='form-label col-md-4'>Numune Türü</label>
                        <div className='col-md-8'>
                            <InputText value={numuneType} onChange={(e)=>setNumuneType(e.target.value)} style={{width: '100%'}} type="text" required/>
                            </div>
                    
                    </div>


                    <div className='w-100 mt-2'>
                    
                        <button  type='submit' className='btn btn-success btn-lg w-100' onClick={async()=>{
                                const obj = {name:numuneType};
                                const data = await ProjectApis.saveNumuneType(obj);
                                const newNumuneType = obj.name;
                                const numuneTypeList_ = [...productTypeListString];
                                numuneTypeList_.push(newNumuneType);
                                setProductTypeListString(numuneTypeList_)
                                const data_ = await ProjectApis.getProductTypes();
                                setNumuneTypeList(data_);
                                setNumuneType("");
                            }} >Kaydet</button>
                        
                    </div>


                    
                    </div>
                    <div className=' col-md-8 card p-fluid'>

                        <DataTable value={numuneTypeList} editMode='row' onRowEditComplete={onRowEditCompleteNumune} filters={numuneTuruFilters} filterDisplay="row">
                        <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                            <Column header="Numune Adı" field='name' editor={(options) => textEditor(options)} filter></Column>
                            <Column rowEditor headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }}></Column>
                            <Column body={(data,options)=>deleteNumuneType(data,options)}></Column>
                        </DataTable>
                    </div>


            </div>


    </TabPanel>
    <TabPanel header="Tedarikçi"> 
    <div className='row'>       
        <div className='col-md-4'>
                    <div className='form-group row'>
                        <label className='col-md-4' >Tedarikçi Adı</label>
                        <div className='col-md-8'>
                            <input value={tedarikci} className='form-control' onChange={(e)=>setTedarikci(e.target.value)} style={{width: '100%'}} type="text" required/>
                            </div>
                    
                    </div>

                    <div className='w-100 mt-2'>
                    
                    <button  type='submit' className='btn btn-success btn-lg w-100' onClick={async()=>{
                                const obj = {name:tedarikci};
                                const data = await ProjectApis.saveTedarikci(obj);
                                const newTedarik = obj.name;
                                const tedarikList_ = [...tedarikciListString];
                                tedarikList_.push(newTedarik);
                                setTedarikciListString(tedarikList_);
                                const data_ = await ProjectApis.getTedarikci();
                                setTedarikciList(data_);
                                setTedarikci("");
                            }}  >Kaydet</button>
                    
                </div>

        </div>
        <div className='col-md-8 card p-fluid'>

            <DataTable value={tedarikciList} editMode='row' onRowEditComplete={onRowEditCompleteTedarik} filters={tedarikciFilters} filterDisplay="row">
                <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                <Column header="Tedarik Adı" field='name' editor={(options) => textEditor(options)} filter></Column>
                <Column rowEditor headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={(data,options)=>deleteTedarikci(data,options)}></Column>
            </DataTable>
            </div>
        </div>  


               
    </TabPanel>

    <TabPanel header="Marka">
        <div className='row'>
        <div className='col-md-4'>
                    <div className='form-group row'>
                        <label className='form-label col-md-4' >Marka Adı</label>
                        <div className='col-md-8'>
                            <InputText value={marka} onChange={(e)=>setMarka(e.target.value)} style={{width: '100%'}} type="text" required/>
                        </div>
                    
                    </div>

                    <div className='w-100 mt-2'>
                    
                        <button  type='submit' className='btn btn-success btn-lg w-100' onClick={async()=>{
                                    const obj = {name:marka};
                                    const data = await ProjectApis.saveBrand(obj);
                                    const newMarka = obj.name;
                                    const markaList_ = [...markaListString];
                                    markaList_.push(newMarka);
                                    setMarkaListString(markaList_);
                                    setMarka("");
                                }}  >Kaydet</button>
                    </div>



            </div>  
        <div className='col-md-8 card p-fluid'>
            <DataTable value={markaList} editMode='row'  onRowEditComplete={onRowEditCompleteMarka} filters={markaFilters} filterDisplay="row">
                <Column header="#" headerStyle={{ width: '3rem' }} body={(data, options) => options.rowIndex + 1}></Column>
                <Column header="Marka Adı" field='name' editor={(options) => textEditor(options)} filter></Column>
                
                <Column body={(data,options)=>deleteMarka(data,options)}></Column>
                <Column rowEditor headerStyle={{ width: '10%' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
            </div>
        </div>   


               
    </TabPanel>
</TabView>




)
}