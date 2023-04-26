import { Navigate, navigate } from 'react-router-dom'

export const ProtectedRoute = ({user, children, redirecTo="/"}) =>{
    if (!user){
        return <Navigate to={redirecTo}/>
    }
    return children
}
export const ProtectedRoute2 = ({cont, children, redirecTo="/login2"}) =>{
    if (!cont){
        return <Navigate to={redirecTo}/>
    }
    return children
}
export const ProtectedRoute3 = ({user, children, redirecTo="/login3"}) =>{
    if (!user){
        return <Navigate to={redirecTo}/>
    }
    return children
}

