import './AdminHome.css'
import AdminNavbar from './../adminnav/Navbar';
import { useState,useEffect } from 'react';
import  Form  from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { userSeenAction } from './../../Redux-dep/actions/AdminActions';
import { Button } from '@mui/material';

function AdminHome() {
  const [userRole, setUserRole] = useState("User")
  const dispatch = useDispatch()

  const handleRole = async (event) =>{
    event.preventDefault();
    dispatch(userSeenAction(userRole))
  }
  const userSeen = useSelector((state) => state.userSeen)

    
    const { userDATA } = userSeen
    console.log(userDATA)


  return (
    <>
      <AdminNavbar />

      <div  className='container-Empty'>

        <div className="d-flex justify-content-center row-container">
          <div className="row">
            <div className="col">
              <h3 className="text-center text-page mb-5 animated pulse infinite" >
                Seems Like Empty User list !
              </h3>
            </div>
          </div>
        </div>
      </div>
      <Form onSubmit={handleRole}>
        <Form.Group className=" mb-3 role"  controlId="userRole">
          <Form.Control required  
            as="select"
            custom ="true"
            defaultValue={userRole}
            onChange={(e) => setUserRole(e.target.value)}>
            <option value="Owner">Owner Center</option>
            <option value="User">User</option>
          </Form.Control >
        </Form.Group>
        <Button   type="submit"  className="btn solid"/* disabled={!validateForm() || loading} */>
            View
        </Button>
      </Form>
      <div className="container" id="container">
        <div className="row">
          <div className="col-12">
            <table className="table table-image">
              <thead>
                <tr>
                  <th scope="col">User Email</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Accept User</th>
                  <th scope="col">Delete User</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{/* email */}</th>
                  <td >{/* name */}</td>
                  <td >{/* Accept */}</td>
                  <td><i className="fa fa-trash" ></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome