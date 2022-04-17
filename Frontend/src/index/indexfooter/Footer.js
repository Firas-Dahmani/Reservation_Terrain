import React from 'react'
import HeaderCSS from './Footer.module.css'

function Footer() {
  return (
    <footer>
    <div className={HeaderCSS.content}>
        <div className={HeaderCSS.top}>
            <div className={HeaderCSS.logo_details}>
                <i class="fab fa-slack"></i>
                <span style={{ marginLeft:"10px"}} className={HeaderCSS.logo_name}>SoccerLand</span>
            </div>
            <div className={HeaderCSS.mediaIcons}>
                <a href="#"><i className='fab fa-facebook-f'></i></a>
                <a href="#"><i className='fab fa-twitter'></i></a>
                <a href="#"><i className='fab fa-instagram'></i></a>
                <a href="#"><i className='fab fa-linkedin-in'></i></a>
                <a href="#"><i className='fab fa-youtube'></i></a>
            </div>
        </div>
    </div>
    <div className={HeaderCSS.bottom_details}>
        <div className={HeaderCSS.bottom_text}>
            <span className={HeaderCSS.copyright_text}>Copyright © 2021 <a href="#">CodingLab.</a>All rights reserved</span>
            <span className={HeaderCSS.policy_terms}>
            <a href="#">Privacy policy</a>
            <a href="#">Terms & condition</a>
            </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer