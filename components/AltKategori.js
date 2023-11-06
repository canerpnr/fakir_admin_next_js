import { Dropdown } from "primereact/dropdown"
export default function AltKategori(props){
    return(
        <div className="form-group row mt-2">
        <label className="form-label col-md-4"> Alt Kategori</label>
        <div className="col-md-8">
            <Dropdown id={props.id} style={{width: '100%'}} value={props.value} options={props.kategoriList} onChange={props.onChange}/>
            </div>
        </div>
    )
}