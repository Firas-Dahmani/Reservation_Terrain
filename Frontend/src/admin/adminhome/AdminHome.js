
import './AdminHome.css'
import { sessionService } from 'redux-react-session';
import { useState } from 'react';
import AdminNavbar from './../adminnav/Navbar';

function AdminHome() {
  const [UserID, setUserID] = useState("")


  sessionService.loadUser()
      .then((User) => {
          setUserID(User.data[0].firstName)
      })
  return (
    <>
        <AdminNavbar />
        <section className=" AdminHome mastheadAdmin">
            <div className=" px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">Bienvenu {UserID}</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white mb-5">Impossible est un mot que je ne dis jamais.</p>
                        
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default AdminHome