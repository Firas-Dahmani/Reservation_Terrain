import OwnerNavbar from './../Ownernav/OwnerNavbar';
import './OwnerHome.css'
import { sessionService } from 'redux-react-session';
import { useState } from 'react';

function OwnerHome() {
  const [UserID, setUserID] = useState("")


  sessionService.loadUser()
      .then((User) => {
          setUserID(User.data[0].firstName)
      })
  return (
    <>
        <OwnerNavbar />
        <section className="masthead">
            <div className="container px-4 px-lg-5 h-100">
                <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8 align-self-end">
                        <h1 className="text-white font-weight-bold">Welcome {UserID}</h1>
                        <hr className="divider" />
                    </div>
                    <div className="col-lg-8 align-self-baseline">
                        <p className="text-white mb-5">Le succès n'est pas final, l'échec n'est pas fatal: c'est le courage de continuer qui compte.</p>
                        <a className="btn" href="/showreservation">reservations</a>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default OwnerHome