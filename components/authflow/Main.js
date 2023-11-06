
import UserContext from "./UserContext"
import { useReducer } from "react"

export default function Main(){
        const INITIAL_STATE = {
        user: null,
        hasLoginError: false
      }
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);



      const validateCredentials = (username,password)=>{
        
        return true;
      }
      
      const reducer = (state, action) => {
        switch(action.type) {
            case 'login': {
              const { username, password } = action.payload
              if (validateCredentials(username, password)) {
                return {
                  ...state,
                  hasLoginError: false,
                  user: {name:"Deneme"} // assign user here
                }
              }
        
              return {
                ...state,
                hasLoginError: true,
                user: null
              }
            }
            case 'logout':
              return {
                ...state,
                user: null
              }
            default:
              throw new Error(`Invalid action type: ${action.type}`)
          }

      }
      const login = (username, password) => {
        dispatch({ type: 'login', payload: { username, password } })
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
      

      return (
        <UserContext.Provider value={value}>
          
        </UserContext.Provider>
      )
    }



