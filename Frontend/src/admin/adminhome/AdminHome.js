import './AdminHome.css'
import AdminNavbar from './../adminnav/Navbar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userAccepteAction, userSeenAction, userDeleteAction } from './../../Redux-dep/actions/AdminActions';
import Loading from '../../loading/Loading';
import { Link } from 'react-router-dom';

function AdminHome() {
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
      dispatch(userAccepteAction(id))
    }

    const handleDelete = (id) =>{
      dispatch(userDeleteAction(id))
    }

   
    
 
  return (
    <>
      <AdminNavbar />

      
        <div  className='container-Empty'>
          <div className="d-flex justify-content-center row-container">
            <div className="row">
              <div className="col">
                <h3 className="text-center text-page mb-5 animated pulse infinite" >
                  User List 
                </h3>
              </div>
            </div>
          </div>
        </div>
      <div className="container" id="container">
        <div className="row">
          <div className="col-12">
            {loading ?
                <Loading/>
              :
              <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">User Email</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Accept User</th>
                  <th scope="col">Delete User</th>
                </tr>
              </thead>
              {
                  userDATA && userDATA.length !== 0 ?
                  
                  userDATA.map((item, i) => ( 
                        <tbody key={i}>
                        <tr>
                          <th scope="row">{item.email}</th>
                          <td >{item.firstName}</td>
                          <td><Link to={`/${item._id}`}  onClick={()=>handleAccepte(item._id)}><i className="fa fa-check check" ></i></Link></td>
                          <td><Link to={`/${item._id}`}  onClick={()=>handleDelete(item._id)}><i className="fa fa-trash delete" ></i></Link></td>
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
    </>
  )
}

export default AdminHome