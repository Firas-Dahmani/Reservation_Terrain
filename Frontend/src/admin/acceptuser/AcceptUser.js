import './AcceptUser.css'
import AdminNavbar from './../adminnav/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAccepteAction, userSeenAction, userDeleteAction } from './../../Redux-dep/actions/AdminActions';
import Loading from '../../loading/Loading';
import { Link } from 'react-router-dom';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';

function AcceptUser() {
  const dispatch = useDispatch()

  const useUserSeen = useSelector((state) => state.userSeen)
  const { userDATA, loading } = useUserSeen

  const userAccepte = useSelector((state) => state.userAccepte);
  const {
    loading: loadingAccepte,
    error: errorAccepte,
    success: successAccepte,
  } = userAccepte;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;


  useEffect(()=> {
    dispatch(userSeenAction())
  },[
    dispatch,
    successAccepte,
    successDelete
  ])

    const handleAccepte = (id) =>{
      dispatch(userAccepteAction(id, userDATA[0].email))
    }

    const handleDelete = (id) =>{
      dispatch(userDeleteAction(id))
    }

   
    
 
  return (
    <>
      <AdminNavbar />
      <div className="main-wrapper">
        <div className="container-fluid">
          <div className="row">
            <div  className=''>
              <div className="d-flex justify-content-center row-container container-fluid">
                <div className="row">
                  <div className="col">
                    <h3 className="text-center text-page mb-5 animated pulse infinite" >
                      Liste d'utilisateur
                    </h3>
                  </div>
                  {errorAccepte && <AlertCompnenet error={errorAccepte}/>}
                  {errorDelete && <AlertCompnenet error={errorDelete}/>}
                </div>
              </div>
            </div>
          <div className="container" id="container">
            <div className="row">
              <div className="col-12">
                {loading || loadingAccepte || loadingDelete ?
                    <Loading/>
                  :
                  <table className="table table-image">
                  <thead>
                    <tr>
                      <th scope="col">Adresse e-mail</th>
                      <th scope="col">Nom d'utilisateur</th>
                      <th scope="col">Accepter l'utilisateur</th>
                      <th scope="col">Supprimer l'utilisateur</th>
                    </tr>
                  </thead>
                  {
                      userDATA && userDATA.length !== 0 ?
                      
                      userDATA.map((item, i) => ( 
                            <tbody key={i}>
                            <tr>
                              <th scope="row">{item.email}</th>
                              <td >{item.firstName}</td>
                              <td><Link to={`/acceptuser`}  onClick={()=>handleAccepte(item._id)}><i className="fa fa-check check" ></i></Link></td>
                              <td><Link to={`/acceptuser`}  onClick={()=>handleDelete(item._id)}><i className="fa fa-trash delete" ></i></Link></td>
                            </tr>
                          </tbody>
                          ))
                      :
                      <tbody>
                        <tr>
                          <th scope="row">*</th>
                          <td >*</td>
                          <td >*</td>
                          <td>*</td>
                        </tr>
                      </tbody>
                  }
                </table>
                }
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AcceptUser