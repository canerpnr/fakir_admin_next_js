import React, { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProjectApis } from '../components/services/api.service';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import AppLayout from '../app/layout'
export default  function Category(){



    const [category,setCategory] = useState({value:'',image:'',subCategory:[]});
    const [categoryList,setCategoryList] = useState([]);
    useEffect(() => {
        async function getCategories(){
            const data = await ProjectApis.getCategories();
            const categoryList_ = [];
            data.map(s=>{
                const category_ = {id:s.id,name:s.value,image:s.image,category:'category'};

                categoryList_.push(category_);
                s.subCategory.map(sc=>{
                    const sc_ = {id:sc.id, name: sc.value,image:sc.image,category:'subCategory'};
                    categoryList_.push(sc_);
                    sc.product.map(p=>{
                        const product = {id:p.id, name:p.value,image:p.image,category:'product'};
                        categoryList_.push(product);
                    })
                })
                
            });
            //console.log(JSON.stringify(categoryList_));
            setCategoryList(categoryList_);
            
        }
        getCategories();
        //console.log("category changed");
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


    


    const [categoryValue,setCategoryValue] = useState('');
    const [subCategoryValue,setSubCategoryValue] = useState('');
    const [productValue,setProductValue] = useState("");
    const [savedButton,setSavedButton] = useState(false);
    const [image,setImage] = useState('');
    const [visible,setVisible] = useState(false);

    const [addCategoryId,setAddCategoryId] = useState();
    const [addCategoryName,setAddCategoryName] = useState('');
    const [addCategoryImage,setAddCategoryImage] = useState();

    const [addCategoryObject,setAddCategoryObject] = useState({});

    const [imgVisible,setImgVisible] = useState(false);
    const[viewIcon,setViewIcon] = useState();
    var inputRef  = React.useRef(null);
    function toBase64(e){
        
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(e);
            fileReader.onload = () => {
              resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
          });
    }

    async function addKategori(){
        if(image == "") {
            alert("Icon Eklemeniz gerekmektedir.")
            return;
        }

        let img = await toBase64(image);
        
        //console.log("------------" + img);
        setCategory({...category,value:categoryValue,image:img});
        if(typeof document !== undefined){
            document.querySelector("#kategoriAdd").remove();
        }

    }
    async function addSubCategory(){
        let img = await toBase64(image);
        const subCategory_ = [...category.subCategory];
        subCategory_.push({value:subCategoryValue,image:img,product:[]});
        setCategory({...category,subCategory:subCategory_});
        setSubCategoryValue("");

    }

    async function saveCategory(){
        const response = await ProjectApis.saveCategory(category);
        //console.log("Category : " + category.subCategory.length);

    }



    async function addProduct(s){

        const index = category.subCategory.findIndex(i=>i.value === s);

        const product_ = [...category.subCategory[index].product];
        let img =await toBase64(image);
        product_.push({value:productValue,image:img});

        const subCategory__ = {...category.subCategory[index],product:product_}
        const subCategory_ = [...category.subCategory];
        subCategory_[index] = subCategory__;
        setCategory({...category,subCategory:subCategory_})
        setProductValue("");
        setSavedButton(true);
        if(typeof document !== undefined){
            document.querySelector('input[name="productValue"]').value = "";
        }

    }

    const textEditor = (options) => {

        if(options.rowData.category === "category" || options.rowData.category === "subCategory"){
            return(
                            <div>
                        <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />
                        {
                          options.rowData.category === "category" ?
                          (<Button label="Alt Kategori Ekle" onClick={()=>{
                                setVisible(true);
                          }} />) 
                          :
                          (<Button label='Ürün Ekle' />) 
                        }
                        
                    </div>    
                    )
        }
        return  <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
        
     
       
    };

    const [filters, setFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    const onRowEditComplete = async (e) => {
        //console.log(e);
        let _category = [...categoryList];
        let { newData, index } = e;
        let img = await toBase64(e.data.image);
        const postData = {category:e.data.category,image:img,name:newData.name,id:e.data.id};
        const response = await ProjectApis.updateCategory(postData);
        img = new String(img).substring(23);
        postData.image = img
        _category[index] = postData;
        setCategoryList(_category);
        
        
    };

    const imageBodyTemplate = (value,options)=>{
        let imgSource = 'http://trackqr.fakir.com.tr/images/category/'+value.image;


        const id = value.image;
        const imgId = value.id;
        return(
            <>
            <input id={id} type='file' style={{display:"none"}}  onChange={(e)=>{
                value.image = e.target.files[0]
            }}/>
            <img id={imgId} onClick={(e)=>{
                if(typeof document !== undefined){
                    document.getElementById(id).click(e);
                    if(!options.rowEditor.editing)
                   options.rowEditor.onInitClick(e);
                }

            }} src={`data:image/jpeg;base64,${value.image}`} style={{width:50,height:50}}/>
            </>
        )
    }
const rowEdit = (row)=>{
    const obj = {id:row.data.id,category:row.data.category};

    setAddCategoryObject(obj);
    
}

const removeProduct = (_index,_product)=>{
    const product_ = [...category.subCategory[_index].product];

    product_.map((s,i)=>{
        const index_ = product_.findIndex(t=>t.value === _product);
        if(index_ !== -1)
        product_.splice(index_,1);
        
    })
    const subCategory_ = [...category.subCategory];
    subCategory_[_index].product = product_;
    setCategory({...category,subCategory:subCategory_});
}

const removeSubCategory = (_subCategory)=>{
    const subCategory_ = [...category.subCategory];
    
    subCategory_.map((s,i)=>{
        const index = subCategory_.findIndex(t=>t.value === _subCategory);
        if(index !== -1){
            subCategory_.splice(index,1);
            setCategory({...category,subCategory:subCategory_});
        }

        
    });


}

    const deleteKategori = (options)=>{
        return(
            <a href='#' onClick={async ()=>{
                const categoryList_  = [...categoryList];
                console.log(options);
                const index = categoryList_.findIndex(s_=>s_.id === options.id);
                categoryList_.splice(index,1);
                setCategoryList(categoryList_);
                await ProjectApis.deleteCategory({id:options.id,type:options.category})
            }}>Sil</a>
        )
    }

    return(
        <div className='row' style={{marginTop: 50}}>

            <div className='col-md-4'>
                <div className='form-group'>
                    <label className='form-label'>Kategori Adı</label>
                    <input placeholder='Kategori Adı' type='text' value={categoryValue} onChange={(e)=>setCategoryValue(e.target.value)} className='form-control' />
                </div>

                <input id="categoryAdd" style={{display:'none'}} value={''} onChange={(e)=>{
                    if(e.target.files[0].type != "image/jpeg"){
                        alert("Sadece jpeg dosya eklemelisiniz");
                        return;
                    }
                   setImage(e.target.files[0]) 
                }} type='file'/>

                <div className='d-block mt-2'>
                    <a href='#' className='btn btn-primary me-2' onClick={()=>{
                        if(typeof document !== undefined){
                            document.querySelector("#categoryAdd").click()
                        }
                       
                    }}>İkon Ekle</a>
                    <button className='btn btn-warning' id='kategoriAdd' onClick={()=>addKategori()}>Kategori Ekle</button>
                    <img style={{width:50,height:50,borderRadius:20,float:"right"}} src={category.image}></img>
                </div>
                <div style={{display:"flex"}}>
                {
                    category.value !== ""?
                    category.subCategory.map((s,i)=>{
                        return(
                        <div key={i}>                            
                            <div key={i}>

                        </div>
                        </div>
                        )
                    })

                    :
                    ""
                }
                    
                </div>
                
                <div>
                    <div className='form-group mt-2'>
                        <label className='form-label'>Kategori adı : {category.value}</label>

                        <div>
                            {
                                category.subCategory.map((s,i_)=>{

                                    return(
                                        <div key={s.id} style={{borderStyle:"solid",borderWidth:1,borderRadius:10,margin:6}}>
                                            <div style={{display:'flex'}}>
                                        <div style={{fontWeight:'bolder',marginBottom:15,marginLeft:5}}>Alt Kategori Adı: {s.value}</div>
                                        
                                        <a onClick={()=>removeSubCategory(s.value)} style={{marginRight:10,marginLeft:'auto',justifyContent:'flex-end'}}>Vazgeç</a>
                                        
                                        </div>
                                        
                                                    
                                        {
                                            category.subCategory[i_].product.map((s,i)=>{
                                                const img = s.image;
                                                return(
                                                    <div key={s.id} style={{display:'flex'}}>
                                                    <div style={{marginLeft:15}}>Numune Kategori Adı :<span>{s.value}</span></div>
                                                    <a onClick={()=>removeProduct(i_,s.value)} style={{marginBottom:6,marginRight:10,marginLeft:'auto',justifyContent:'flex-end'}}>Vazgeç</a>
                                                    <img onClick={()=>{
                                                        setImgVisible(true);
                                                        setViewIcon(img)
                                                    }} src={img} style={{width:25,height:25}}></img>
                                                    </div>
                                                )
                                            })
                                        }
                                        <input placeholder='Ürün Kategori Adı' style={{marginLeft:15}} name="productValue" onChange={(e)=>{
                                            setProductValue(e.target.value);
                                            }}  type='text' />
                                        <input value={''} onChange={(e)=>{
                                            if(e.target.files[0].type != "image/jpeg"){
                                                alert("Sadece jpeg dosya eklemelisiniz");
                                            }
                                            setImage(e.target.files[0])
                                        }}  type='file'/>
                                        
                                        <button style={{marginBottom:6}} onClick={()=>addProduct(s.value)}>Ürün Ekle</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    {
                        category.value != "" ?
                            <div style={{display:"block"}}>

                                <input placeholder='Alt Kategori Adı' value={subCategoryValue} onChange={(e)=>setSubCategoryValue(e.target.value)} type='text' />
                                <input value={''} onChange={(e)=>{
                                    if(e.target.files[0].type != "image/jpeg"){
                                        alert("Sadece jpeg dosya eklemelisiniz");
                                    }
                                    setImage(e.target.files[0])
                                }} type='file'/>
                                <button id='subCategoryAdd'  onClick={()=>addSubCategory()}>Alt Kategori Ekle</button>
                            </div>
                            :
                            ""
                    }
                    

                    <div className='w-100 mt-2'>
                        <button onClick={()=>saveCategory()} className='btn btn-success btn-lg w-100'>Kaydet</button>
                    </div>
                </div>
            </div>

            <div className='col-md-8'>

                
            <DataTable paginator rows={5} filters={filters} filterDisplay="row" editMode="row" onRowEditInit={(val)=>rowEdit(val)}
                globalFilterFields={['email', 'nameSurname', 'departmanName', 'quantity']}  dataKey="id" value={categoryList} tableStyle={{ minWidth: '50rem' }} onRowEditComplete={onRowEditComplete}>
                    
                    <Column editor={(options) => textEditor(options)} field="name" filter header="Kategori Adı" >
                        
                    </Column>
                    <Column rowEditor body={imageBodyTemplate} header="Icon">
                        
                    </Column>
                    <Column rowEditor headerStyle={{ width: '10%' }}  bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column body={(option)=>deleteKategori(option)}></Column>
                </DataTable>
                
                <Dialog visible={imgVisible} style={{ width: '50vw' }} onHide={()=>setImgVisible(false)}>
                    <img style={{width:"100%",height:"100%"}} src={viewIcon}></img>
                </Dialog>

                <Dialog header="Header" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                    <input value={addCategoryId} type='hidden'/>
                    <InputText id="addCategoryName" type='text' placeholder='Alt Kategori Adı'/><br/>
                    <input type='file' onChange={(e)=>{
                        if(e.target.files[0].type != "image/jpeg") {
                            alert("Sadece jpeg dosya eklemelisiniz");
                            return;
                        }
                        setAddCategoryImage(e.target.files[0])

                        alert("Kayıt başarılı");
                    }} />
                    
                    <Button label='Kaydet' onClick={async ()=>{
                        const obj_ = {...addCategoryObject};
                        obj_.name = typeof document !== undefined ? document.getElementById("addCategoryName").value:'';
                        const img = await toBase64(addCategoryImage);
                        obj_.image = img;
                        const response = await ProjectApis.addUpdateCategory(obj_);
                        //console.log(response);
                    }}/>


            </Dialog>
            </div>
    </div>
    )
}
Category.Layout = AppLayout;