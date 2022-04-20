import { useParams, Link  } from 'react-router-dom'
import './emailSent.css'

function EmailSent() {
    const {userEmail} = useParams()
  return (
    <div>
        <div className='text'>
            Email has been verified 
        </div>
        <table border="0" cellPadding="0" cellSpacing="0" width="100%">
            <tr>
                <td bgcolor="#0a192f" align="center">
                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" className='elamentTable'>
                        <tr>
                            <td align="center" valign="top" className='firstelement'> </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#0a192f" align="center" className='texttr'>
                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" className='elamentTable'>
                        <tr>
                            <td bgcolor="#ffffff" align="center" valign="top" className='icon'>
                                <h1 className='title'>Account Confirmation</h1> 
                                <img src=" https://img.icons8.com/clouds/100/000000/handshake.png" width="125" height="120" className='iconImg' alt=''/>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#f4f4f4" align="center" className='texttr'>
                    <table border="0" cellPadding="0" cellSpacing="0" width="100%" className='elamentTable'>
                        <tr>
                            <td bgcolor="#ffffff" align="center" className='paragraphTD'>
                                <p className='paragraph'>
                                    An email with your account confirmation link has been sent to your email : <strong>{userEmail}</strong> ✔
                                </p>
                            </td>
                        </tr> 
                    </table>
                </td>
            </tr>
            <tr>
                <td bgcolor="#ffffff" align="left">
                    <table width="100%" border="0" cellSpacing="0" cellPadding="0">
                        <tr>
                            <td bgcolor="#ffffff" align="center" className='buttonTR'>
                                <table border="0" cellSpacing="0" cellPadding="0">
                                    <tr>
                                        <td align="center" className='buttonTD' bgcolor="#0a192f">
                                            <Link to={`/registerlogin`}  className='button'>
                                                Confirm Account
                                            </Link>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
  )
}

export default EmailSent