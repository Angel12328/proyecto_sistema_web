import './App.css';
import Button from 'react-bootstrap/Button';
//import ContainerFluidBreakpointExample from './contenedores/division';
//import AutoLayoutSizingExample from './contenedores/division2';
//import GridComplexExample from './formularios/prueba';
//import CollapsibleExample from './contenedores/barra_nav';
import { db } from './firebase/config';
import { collection,getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
//import DataEstud from './data/dataEstudiante';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  
} from 'cdbreact';    // ejecutar comando npm install cdbreact

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter , Route , Routes , Link , NavLink, useNavigate, Navigate} from 'react-router-dom';   // ejecutar comando npm install react-router-dom
import React, { useState,useEffect } from 'react';

import Perfestud from './contenedores/perfilestudiante';
import PerfDocente from './contenedores/perfildocente';
import ViewAdmin from './contenedores/viewAdminprofile';
import Viewadmin from './formularios/administrador/formadmin';
import login from './login';
import Principal from './principal';
import Login from './login';
//import dataEstud from './data/dataEstudiantes';


/*
  const [ isInicio , setIsInicio ] = useState(false );
  useEffect( () =>{
    if( isInicio ){
      navigate("/");
    }else{
      navigate("/login");
    }
  } , [ navigate , isLoggedIn ] );

///////////////////////////////////////////////
    window.onbeforeunload = function(e) {
    const urlActual = window.location.href;
    if (urlActual==='http://localhost:3000/') {
      var[sidebarclose,setsidebarclose]=useState(false);
    }
    else{
      var[sidebarOpenclick,setsidebarOpenclick]=useState(false);
    }
    console.log('pagina regarbgadas')
  };
/////////////////////////////////////
  var[sidebarclose,setsidebarclose]=useState(false);
  const handleClickprincipal=()=>{
    setsidebarclose(sidebarclose=false);
    setsidebarOpenclick(sidebarOpenclick=false);

    
    

  };
  var[sidebarOpenclick,setsidebarOpenclick]=useState(true);
  const handleClickSidOpen=()=>{
    setsidebarOpenclick(sidebarOpenclick=true);
    setsidebarclose(sidebarclose=true);
    
  };
*/

function App() {

  //const navigate = useNavigate();
  //sidebarclose && sidebarOpenclick &&
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  
  var[sidebarclose,setsidebarclose]=useState(false);

  function refresh() {
    var urlActual = window.location.href;
    if (urlActual==='http://localhost:3000/') {
      //sidebarclose=false; 
      setsidebarclose(sidebarclose=false);
    }
    else{
      //sidebarclose=true;
      setsidebarclose(sidebarclose=true);
    }
    
  }
  setTimeout(refresh,1);


  //var urlActual = window.location.href;
  //console.log(urlActual)
  var closeSideBard=(e)=>{
    var target = e.currentTarget;
    var href=target.href;
    console.log(href);
    //console.log(urlActual);
    if (href==='http://localhost:3000/') {
      setsidebarclose(sidebarclose=false);
    }else{
      setsidebarclose(sidebarclose=true);
    }    
  };

  
  /*
  
  const usersEstudiantesref = collection(db, 'dataEstudiantes');
  const querySnapshot = await getDocs(usersEstudiantesref);
  const dataEstud = querySnapshot.docs.map(doc => dataEst[doc.id]={...doc.data(),id:doc.id}); 
  setArregloDatos(dataEst);
  
  
  */
  

  const [ arregloDatosEst , setArregloDatosEst ] = useState( [] );

  const dataUsers=useParams().dataUsers;
  const IDLOGIN=11; // IDLOGIN ES EL ID QUE CAPTURA EL LOGIN QUE ES LA POSICION EN EL ARREGLO DE DATOS GENERALES
  useEffect(()=>{
      const fetchData = async () => {

        const dataEst=[{}];
        const usersEstudiantesref = collection(db, 'dataEstudiantes');
        const querySnapshot = await getDocs(usersEstudiantesref);
        const dataEstud = querySnapshot.docs.map(doc => dataEst[doc.id]={...doc.data(),id:doc.id}); 
        setArregloDatosEst(dataEst);
        console.log(dataEst)
      };
      fetchData();

  },[dataUsers]);
  window.addEventListener('beforeunload', () => {
    localStorage.removeItem('cachedData');
  });



  return (
    
    <BrowserRouter className="App">
      
      <Row>
        {
          
          <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand >Escuela de Matemática</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" > 
                  <Nav.Link as={ Link } to="/" onClick={closeSideBard}> Incio </Nav.Link>

                </Nav>
              

            </Navbar.Collapse>


              
            <NavDropdown title="Informacion" className='perfil'>
                      
              <NavDropdown.Item icon='user' 
              title="Dropdown" as={ Link } to="/perfilestudiante" onClick={closeSideBard}>Informacion Estudiante</NavDropdown.Item>
              <NavDropdown.Item title="Dropdown" as={ Link } to="/perfildocente" onClick={closeSideBard} >Informacion Docente</NavDropdown.Item>                  
              
                      

            </NavDropdown>

            

            <CDBSidebarMenuItem icon='user' className='imgperf' > 
            {
              arregloDatosEst.filter(registro=>
                registro.id===String(IDLOGIN)
              ).map(registro=>
                  `${registro.nombre} ${registro.apellido}`
              )
            }

            </CDBSidebarMenuItem>
          


            


            
            </Container>
          </Navbar>
        }
      </Row>

      <Row>
      
      <Col sm={2} >
        {
          sidebarclose&&
          <CDBSidebar bg="dark" data-bs-theme="dark" style={{height: '100%'}} >
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" onClick={handleSidebarToggle}></i>}>
            <Nav.Link as={ Link } to="/" className="text-decoration-none" style={{ color: 'inherit' }} >
              Logo Escuela Mate
            </Nav.Link>
            </CDBSidebarHeader >

            <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>

              <NavLink to="/formadmin" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="chart-line">Perfiles Comunidad</CDBSidebarMenuItem>
              </NavLink>
              <NavLink to="/" className={(navData) => (navData.isActive ? "active-style" : 'none')}>
              <CDBSidebarMenuItem icon="exclamation-circle">404 page</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
            </CDBSidebarContent>


            <CDBSidebarFooter style={{ textAlign: 'center'}}>
            <div
                style={{
                padding: '20px 5px', height: '100%',
                }}
            >
                Escuela de Matemática UNAH
            </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        }
      </Col>

      <Col className={sidebarOpen ? 'sibaropen':'sibarclose'} >
        <Routes>
          <Route path='/' element={ <Principal/> } />
          <Route path='/perfilestudiante' element={ < Perfestud /> } />
          <Route path='/perfildocente' element={ < PerfDocente /> } />
          <Route path='/viewAdminprofile' element={ < ViewAdmin /> } />
          <Route path='/formadmin' element={ < Viewadmin /> } />
          <Route path='/login' element={ < Login /> } />

        </Routes>
      </Col>
      


      </Row>
      
      <Row>
      
      <footer class="footer bg-light bg" id="redes">
            
            <div class="container" >
                <div class="row">
                    <div class="col-lg-6 h-100 text-center text-lg-start my-auto">
                        <p class="text-muted small mb-4 mb-lg-0">&copy; Logo Escuela de Matematica, Facultad de Ciencias y UNAH</p>
                    </div>
                    <div class="col-lg-6 h-100 text-center text-lg-end my-auto">
                        
                        <ul class="list-inline mb-0">
                            
                            <li class="list-inline-item me-4">
                                <p>Siguenos en nuestras redes sociales</p>
                            </li>
                            <li class="list-inline-item me-4">
                                <a target="_blank" href="https://www.facebook.com/emcc.unah"><i class="bi-facebook fs-3"></i></a>
                            </li>
                     
                        </ul>
                    </div>
                </div>
                
            </div>
            
        </footer>
        
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
        
        <script src="scripts/scripts.js"></script>

        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
      </Row>

    </BrowserRouter>
    


  
    




  );
}

export default App;
