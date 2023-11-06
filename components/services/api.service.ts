
import api,{ responseBody } from '../services/axios.config';


const requests = {

    get:(url: string, header?: Object) => api.get<any>(url,header).then(responseBody),
    post:(url:string,body:Object, header?:Object)=>api.post(url,body,header).then(responseBody)
    
};
const initialState = {
    token: typeof window !== "undefined" ? JSON.parse(window.localStorage.getItem('userInformation') || '{}') : false,
};


const header = {headers:{"Content-Type":"application/json","Authorization":`Bearer ${initialState.token}`}};
const headerForm = {"Content-Type":"application/x-www-form-urlencoded"}

export const ProjectApis = {
    login:(object:any):Promise<any>=>
    requests.post('/api/person/login/',object,header),

    getPersons:():Promise<any>=>
    requests.get("/api/person",header),

    getPersonsWithoutAdmin:():Promise<any>=>
    requests.get("/api/person/withuotAdmin",header),

    getDepartman:():Promise<any>=>
    requests.get("/api/departman/",header),

    getDepartmanString:():Promise<any>=>
    requests.get("/api/departman/departmanStrings",header),

    saveCategory:(object:any):Promise<any>=>
    requests.post("/api/category",object,header),

    updateCategory:(object:any):Promise<any>=>
    requests.post("/api/category/update",object,header),

    addUpdateCategory:(object:any):Promise<any>=>
    requests.post("/api/category/add",object,header),

    getCategories:():Promise<any>=>
    requests.get("/api/category/",header),

    getCategoryForSub:(id:String):Promise<any>=>
    requests.get(`/api/category/${id}`),

    getCategoryForProduct:(name:String):Promise<any>=>
    requests.get(`/api/category/numune/${name}`),
    
    getLog:():Promise<any>=>
    requests.get("/api/logs",header),

    getPerson:(id:String):Promise<any>=>
    requests.get(`/api/person/${id}`,header),

    passwordControl:(object:any):Promise<any>=>
    requests.post(`/api/person/changePassword`,object,header),

    getPersonsForAdmin:():Promise<any>=>
    requests.get(`/api/person/getPersonsForAdmin`,header),
    
    getAllAuthority:():Promise<any>=>
    requests.get("/api/authority/all",header),

    updateAdminPerson:(object:any):Promise<any>=>
    requests.post("/api/person/updateAdminPerson",object,header),

    sendEmail:(object:any):Promise<any>=>
    requests.post("/api/email/",object,header),

    passwordChangeControl:(object:any):Promise<any>=>
    requests.post("/api/email/passwordControl",object,header),

    changePassword:(object:any):Promise<any>=>
    requests.post("/api/email/changePassword",object,header),

    saveNumuneType:(object:any):Promise<any>=>
    requests.post("/api/person/saveNumuneType",object,header),

    getProductTypes:():Promise<any>=>
    requests.get("/api/product/productTypes",header),

    saveTedarikci:(object:any):Promise<any>=>
    requests.post("/api/person/saveTedarik",object,header),

    getTedarikci:():Promise<any>=>
    requests.get("/api/person/allTedarik",header),

    saveBrand:(object:any):Promise<any>=>
    requests.post("/api/product/saveBrand",object,header),

    getBrands:():Promise<any>=>
    requests.get("/api/product/brands",header),

    updateProductType:(object:any):Promise<any>=>
    requests.post("/api/product/updateProductType",object,header),

    updateTedarikci:(object:any):Promise<any>=>
    requests.post("/api/person/updatePreperation",object,header),

    updateBrand:(object:any):Promise<any>=>
    requests.post("/api/product/updateBrand",object,header),

    getNumuneList:():Promise<any>=>
    requests.get("/api/product/all",header),
    
    saveDepartman:(object:any):Promise<any>=>
    requests.post("/api/departman/save",object,header),

    updateDepartman:(object:any):Promise<any>=>
    requests.post("/api/departman/update",object,header),

    deleteDepartman:(object:any):Promise<any>=>
    requests.post("/api/departman/delete",object,header),

    deleteNumune:(object:any):Promise<any>=>
    requests.post("/api/product/deleteNumune",object,header),

    deleteTedarikci:(object:any):Promise<any>=>
    requests.post("/api/product/deletePreperation",object,header),

    deleteMarka:(object:any):Promise<any>=>
    requests.post("/api/product/deleteBrand",object,header),

    getDetails:(object:any):Promise<any>=>
    requests.get(`/api/product/productDetail/${object}`,header),

    getProjectVersions:(object:any):Promise<any>=>
    requests.get(`/api/product/productVersion/${object}`,header),

    getProjectVersionsAll:():Promise<any>=>
    requests.get("/api/product/productVersions",header),

    getUserProfilePhoto:(id:any):Promise<any>=>
    requests.get(`/api/person/getPhoto/${id}`,header),

    updateProduct:(object:any):Promise<any>=>
    requests.post("/api/product/updateProduct",object,header),

    deleteProduct:(object:any):Promise<any>=>
    requests.post("/api/product/deleteProduct",object,header),

    deleteCategory:(object:any):Promise<any>=>
    requests.post("/api/category/delete",object,header)

}