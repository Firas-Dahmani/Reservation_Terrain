import Navbar from '../indexnav/Navbar'
import './about.css'

function About() {
  return (
   <>
     <Navbar />
      <div className="" >
      <div className="container containerHome">
        <div className="row align-items-center justify-content-left justify-content-lg-between">
          <div className="col-lg-6 col-md-10 firstcolm">
            <div className="header-hero-content">
              <h1 className="header-title wow fadeInLeftBig" data-wow-duration="3s" data-wow-delay="0.2s">
                À propos de nous
              </h1>
              <p className="text wow fadeInLeftBig" data-wow-duration="3s" data-wow-delay="0.4s">
              C’est une application simple à utiliser, indispensable pour les footballeurs amateurs qui auront la possibilité de choisir le terrain de foot qui leurs convient. 
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="header-image">
              <img src={require("../../assets/About.png")} alt="" className="image-1  wow fadeInRightBig"
                data-wow-duration="3s" data-wow-delay="0.5s" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="headershape"></div>
      </div>
      </div>
   </>
  )
}

export default About