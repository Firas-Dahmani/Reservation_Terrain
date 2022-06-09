
import './UserHome.css'
import { sessionService } from 'redux-react-session';
import { useState } from 'react';
import UserNavbar from './../Usernav/UserNavbar';

function UserHome() {
  const [UserID, setUserID] = useState("")


  sessionService.loadUser()
      .then((User) => {
          setUserID(User.data[0].firstName)
      })
  return (
    <>
        <UserNavbar />
        <section className=" USerHome mastheadUser">
            <div className=" px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">Welcome {UserID}</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white mb-5">Nous aimons tous gagner, mais combien aiment s’entraîner ?</p>
                        <a className="btn" href="/reserver">Reserver</a>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default UserHome