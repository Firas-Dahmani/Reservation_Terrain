
import  Form  from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './../../loading/Loading';
import AdminNavbar from './../adminnav/Navbar';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { villeAddAction, villeDeleteAction, villeSeenAction } from '../../Redux-dep/actions/AdminActions';
import Button  from 'react-bootstrap/Button';
import AlertCompnenet from './../../Error/Alert/AlertCompnenet';
import './VilleCRUD.css'

function VilleCRUD() {
    const dispatch = useDispatch()
    const [Ville, setVille] = useState("")
  
    const villeSeen = useSelector((state) => state.villeSeen)
    const { ville, loading, error } = villeSeen

    const villeDelete = useSelector((state) => state.villeDelete);
    const {
      loading: loadingDelete,
      error: errorDelete,
      success: successDelete,
    } = villeDelete;

    const villeAdd = useSelector((state) => state.villeAdd);
    const {
      loading: loadingAdd,
      error: errorAdd,
      success: successAdd,
    } = villeAdd;

    useEffect(()=> {
      dispatch(villeSeenAction())
      },[dispatch,
        successDelete,
        successAdd])
   

      const handleDelete = (id) =>{
        dispatch(villeDeleteAction(id))
      }

      const handleSubmit = async (event) =>{
        event.preventDefault();
        dispatch(villeAddAction(Ville))
      }

    return (
      <>
        <AdminNavbar />
        <div  className='container-Empty'>
        <div className="d-flex justify-content-center row-container">
            <div className="row">
            <div className="col">
                <h3 className="text-center text-page mb-5 animated pulse infinite" >
                    Ville List 
                </h3>
                {error && <AlertCompnenet error={error}/>}
                {errorDelete && <AlertCompnenet error={errorDelete}/>}
                {errorAdd && <AlertCompnenet error={errorAdd}/>}
            </div>
            </div>
        </div>
        </div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="col-md-6 form-group mb-5"  controlId="Ville">
            <Form.Label className='col-form-label'>Ville</Form.Label>
            <Form.Control 
            required 
            placeholder="Ville Name" 
            className="form-control"
            type="ville"
            value={Ville}
            onChange={(e) => setVille(e.target.value)}
            />
        </Form.Group >
        <Button type="submit" className='main-btn'>
            ADD
        </Button>
        </Form>
        
        <div className="container" id="container">
          <div className="row">
            <div className="col-12">
              {loading ?
                  <Loading/>
                :
                <table className="table table-image">
                <thead>
                  <tr>
                    <th scope="col">Ville Name</th>
                    <th scope="col">Delete Ville</th>
                  </tr>
                </thead>
                {
                    ville && ville.length !== 0 ?
                    ville.map((item, i) => ( 
                          <tbody key={i}>
                          <tr>
                            <th scope="row">{item.villeName}</th>
                            <td><Link to={`/ville`}  onClick={()=>handleDelete(item._id)}><i className="fa fa-trash delete" ></i></Link></td>
                          </tr>
                        </tbody>
                        ))
                    :
                    <tbody>
                      <tr>
                        <th scope="row">*</th>
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
  
  export default VilleCRUD