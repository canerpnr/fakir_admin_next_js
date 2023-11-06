import AppLayout from "../src/app/layout";
//import './App.css';
import Navbar from '../components/Navbar';
import { BrowserRouter as Router, Routes, Route,redirect, useNavigate,RedirectFunction } from 'react-router-dom';
import Home from './Home';
import Log from './Log';
import Personel from './Personel';
import Category from './Category';
import Login from '../components/Login';
import { useReducer,useContext, useEffect } from 'react';
import UserContext from '../components/authflow/UserContext';
import { ProjectApis } from '../components/services/api.service';
import Profile from './Profile';
import Admin from './Admin';
import Email from './Email';
import Numune from './Numune';
import NumuneDetail from './NumuneDetail';
import "bootstrap/dist/css/bootstrap.min.css";

import { addLocale, locale } from 'primereact/api';




export default function Index() {



  const INITIAL_STATE = {
    user: {admin:null},
    hasLoginError: false
  }


  useEffect(()=>{
    dispatch( {type:'loadData'} );
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  },[])


  const reducer = (state, action) => {

    switch(action.type) {
        case 'login': {
          const {response } = action.payload
            if (response.token !== null) {
              window.localStorage.setItem("userInformation",JSON.stringify(response));
              return {
                ...state,
                hasLoginError:false,
                user:{id:response.id,token:response.token,userName:response.nameSurname,email:response.username,admin:response.admin}
              }
            }
  
            return {
              ...state,
              hasLoginError: true,
              user: null
            }
          

        }

        case 'loadData':
          const userInformation = JSON.parse(window.localStorage.getItem("userInformation"));
          if(userInformation !== null){
            return{
              ...state,
              user:userInformation
            }
          }else {

            return{
              ...state,user:{admin:null}
            }
          }


        case 'logout':
          window.localStorage.clear();
          return {
            ...state,
            user: {admin:null}
          }
        default:
          throw new Error(`Invalid action type: ${action.type}`)
      }
  
  }
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  
  const login = async (username, password) => {
    try {
      const data = {email:username,password:password}
      const response = await ProjectApis.login(data);
      if(response.status === 400){
        alert("Kullanıcı adı şifre hatalı")
      }
      dispatch({ type: 'login', payload: { response } })
      
    } catch (error) {
        if(error.response.status === 401){
          alert("Hatalı giriş");
          return;
        }        else if(error.response.status === 400){
          alert("Hatalı giriş");
          return;
        }
    }

  }
  const logout = () => {
    dispatch({ type: 'logout' })
  }
  
  const value = {
    user: state.user,
    hasLoginError: state.hasLoginError,
    login,
    logout
  }

  let location = null;

  if(value.user === null){
    location = "/sign-in"
  }else{

    if(value.user.admin === true){
      //console.log("ADMINNNNNNNN")
      location="/admin";
      
    }
    location = "/"
  }

  addLocale('tr',{
    "startsWith":"Başlangıç",
    "contains":"Barındırır",
    "notContains":"İçinde Barındırmaz",
    "endsWith":"Bitiş",
    "equals":"Eşittir",
    "notEquals":"Eşit Değildir",
    "noFilter":"Filtresiz",
    "filter": "Filtre",
    "lt":"Daha az",
    "lte":"Daha az veya Eşit",
    "gt":"Daha Fazla",
    "gte":"Daha fazla veya Eşit",
    "dateIs":"Tarih",
    "dateIsNot":"Tarih değildir",
    "dateBefore":"Tarihten önce",
    "dateAfter":"Tarihten sonra",
    "custom":"Özel",
    "clear":"Temiz",
    "apply":"Uygula",
    "matchAll":"Tümüyle eşleşir",
    "matchAny":"Herhangi birine eşleşir",
    "addRule":"Kural Ekle",
    "removeRule":"Kuralı Sil",
    "accept":"Tamam",
    "reject":"İptal",
    "choose":"Seç",
    "upload":"Yükle",
    "cancel":"Vazgeç",
    "pending":"Askıda",
    "fileSizeTypes": ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    "dayNames":["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],
    "dayNamesShort":["Paz","Pzt","Sal","Çar","Per","Cum","Cmt"],
    "dayNamesMin":["Pz","Pt","Sa","Ça","Pe","Cu","Ct"],
    "monthNames":["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"],
    "monthNamesShort":["Oca","Şub","Mar","Nis","May","Haz","Tem","Ağu","Eyl","Eki","Kas","Ara"],
    "chooseYear": "Yıl Seçiniz",
    "chooseMonth": "Ay Seçiniz",
    "chooseDate": "tarih Seçiniz",
    "prevDecade": "Önceki On Yıl",
    "nextDecade": "Gelecek On Yıl",
    "prevYear": "Geçen Yıl",
    "nextYear": "Gelecek Yıl",
    "prevMonth": "Geçen Ay",
    "nextMonth": "Gelecek Ay",
    "prevHour": "Geçen Saat",
    "nextHour": "Gelecek Saat",
    "prevMinute": "Geçen Dakika",
    "nextMinute": "Gelecek Dakika",
    "prevSecond": "Geçen Saniye",
    "nextSecond": "Gelecek Saniye",
    "am": "ÖÖ",
    "pm": "ÖS",
    "today":"Bugün",
    "now":"Şimdi",
    "weekHeader":"Hf",
    "firstDayOfWeek":0,
    "showMonthAfterYear": false,
    "dateFormat":"dd/mm/yy",
    "weak":"Zayıf",
    "medium":"Orta",
    "strong":"Güçlü",
    "passwordPrompt":"Şifre Giriniz",
    "emptyFilterMessage":"Kullanılabilir seçenek yok",
    "searchMessage": "{0} sonuç bulundu",
    "selectionMessage": "{0} öğe seçildi",
   "emptySelectionMessage": "Öğe seçilmedi",
   "emptySearchMessage": "Sonuç bulunmadı",
    "emptyMessage":"Sonuç bulunamadı",
    "aria": {
          "trueLabel": "Doğru",
          "falseLabel": "Yanlış",
          "nullLabel": "Seçilmedi",
          "star": "1 yıldız",
          "stars": "{star} yıldız",
          "selectAll": "Tüm öğeler seçildi",
          "unselectAll": "Tüm öğelerden seçim kaldırıldı",
          "close": "kapat",
          "previous": "Önceki",
          "next": "Sonraki",
          "navigation": "Navigasyon",
          "scrollTop": "Yukarı çık",
          "moveTop": "En üste taşı",
          "moveUp": "Üste taşı",
          "moveDown": "Aşağıya taşı",
          "moveBottom": "En aşağıya taşı",
          "moveToTarget": "Hedefe taşı",
          "moveToSource": "Kaynağa taşı",
          "moveAllToTarget": "Tümünü hedefe taşı",
          "moveAllToSource": "Tümünü kaynağa taşı",
          "pageLabel": "Sayfa {page}",
          "firstPageLabel": "İlk Sayfa",
          "lastPageLabel": "Son Sayfa",
          "nextPageLabel": "Sonraki Sayfa",
          "previousPageLabel": "Önceki Sayfa",
          "rowsPerPageLabel": "Sayfa başına satır",
          "jumpToPageDropdownLabel": "Açılan Sayfaya Git",
          "jumpToPageInputLabel": "Giriş Yapılan Sayfaya git",
          "selectRow": "Satır Seçildi",
          "unselectRow": "Satır Seçilmedi",
          "expandRow": "Satır Genişletildi",
          "collapseRow": "Satır Daraltıldı",
          "showFilterMenu": "Filtre Menüsünü Göster",
          "hideFilterMenu": "Filtre Menüsünü Gizle",
          "filterOperator": "Filtre Araçları",
          "filterConstraint": "Filter Constraint",
          "editRow": "Satırı Düzenle",
          "saveEdit": "Düzenlemeyi Kaydet",
          "cancelEdit": "Düzenlemeyi İptal Et",
          "listView": "Liste Görünüm",
          "gridView": "Izgara Görünüm",
          "slide": "Slayt",
          "slideNumber": "{slideNumber}",
          "zoomImage": "Görüntüyü Yakınlaştır",
          "zoomIn": "Yakınlaştır",
          "zoomOut": "Uzaklaştır",
          "rotateRight": "Sağa Döndür",
          "rotateLeft": "Sola Döndür"
    }
 });
 locale('tr');


  return (
    <Router > 
     
        
      <div className='container'>

      <UserContext.Provider value={value}>
    <Navbar />
    
      {value.user.admin === null?
      <>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/personel' element={<Personel />} />
          <Route path='/email/:uuid/confirm' element={<Email />} />
        </Routes>
      </>
      :
      value.user.admin === false  ?
      <Routes>
      <Route path='/' element={<Numune />} />
      <Route path='/log' element={<Log/>} />
      <Route path='/personel' element={<Personel/>} />
      <Route path='/category' element={<Category/>} />
      <Route path='/profile' element={<Profile/>} />
      <Route path='/numune' element={<Numune/>} />
      <Route path='/numuneDetail/:qr' element={<NumuneDetail/>} />
      </Routes>
      :
      <Routes >
        <Route path='/' element={<Admin/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/log' element={<Log/>} />
        <Route path='/personel' element={<Admin/>} />
        <Route path='/category' element={<Category/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/numune' element={<Numune/>} />
        <Route path='/numuneDetail/:qr' element={<NumuneDetail/>} />
      </Routes>

      }


      
      </UserContext.Provider>
      </div>
  </Router>
  
  );
}

Index.Layout = AppLayout;