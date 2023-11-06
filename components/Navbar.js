import React, { useContext, useEffect,useState} from 'react';
import { redirect } from 'react-router-dom';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
  Icon
} from './NavbarElements';
import UserContext from './authflow/UserContext';

  
const Navbar = (props) => {

 
  const {user,logout} = useContext(UserContext);
  const [style, setStyle] = useState('');
  //console.log(JSON.stringify(user));

  return (
    
      <Nav className='d-flex justify-content-between'>
      <Icon>
        <img src='https://www.fakir.com.tr/Data/EditorFiles/logo.ico'/>
      </Icon>
        <Bars onClick={() => setStyle((prevStyle) => prevStyle == 'd-flex' ? '' : 'd-flex')} />
      
        <NavMenu className={style}>

            {user === null ?<NavLink to='/sign-in' activeStyle>
            
            Giriş Yap
          </NavLink>
          :
          user.admin === false ?
          <>
          <NavLink to='/numune' activeStyle>
            Numune
          </NavLink>
          <NavLink to='/personel' activeStyle>
           Personel
          </NavLink>
          <NavLink to='/category' activeStyle>
            Kategori
          </NavLink>
          <NavLink to='/kayit' activeStyle>
            Kayıtlar
          </NavLink>


          {user !== null &&
          <NavLink to="/profile" activeStyle>
            Profil
          </NavLink>}

        
          </>
          :
          <>
                    {user.admin !== null &&
                    <>
                    <NavLink to='/personel' activeStyle>
                      Personel
                      </NavLink>
                      <NavLink to='/numune' activeStyle>
                        Numune
                      </NavLink>
                        <NavLink to='/category' activeStyle>
                        Kategori
                      </NavLink>
                      <NavLink to="/profile">
                      Profil
                      </NavLink>
        </>
        }
          </>
          }     

          
      

        </NavMenu>


      </Nav>
  
  );
};
  
export default Navbar;