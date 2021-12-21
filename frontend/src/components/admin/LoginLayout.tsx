

const LoginLayout = ({children}) => {
  return (
    <div className="admin-page-cont login-page-cont">
      <div className="row justify-content-center">
        <div className="col-5">
          {children}
        </div>
      </div>    
    </div>
  )
} 

export default LoginLayout