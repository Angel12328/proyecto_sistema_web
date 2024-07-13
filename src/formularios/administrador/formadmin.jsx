import Button from 'react-bootstrap/Button';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
//import Form from 'react-bootstrap/Form';
import { useState ,useEffect} from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Row from 'react-bootstrap/Row';
//import Buscarestud from './compadmin/estudiantebusc';
//import Buscardocen from './compadmin/docentebusc';
import { Card, CardImg } from 'react-bootstrap';
//import CardBody from 'cdbreact/dist/components/Card/CardBody';
import { useForm } from 'react-hook-form'; 
import Form from 'react-bootstrap/Form';
import { enviarDatos } from '../catchingestudiantes';
import { collection,doc,getDocs,updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
//import './App.css';
import GridComplexExample from '../estudiantes/formestudiante';
import FormDocente from '../docentes/formdocente';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
    
  } from 'cdbreact';    // ejecutar comando npm install cdbreact
  
  //import Container from 'react-bootstrap/Container';
  import Nav from 'react-bootstrap/Nav';
  import Navbar from 'react-bootstrap/Navbar';
  import { NavDropdown } from 'react-bootstrap';
  //import Row from 'react-bootstrap/Row';
  //import Col from 'react-bootstrap/Col';
  
  import { BrowserRouter , Route , Routes , Link , NavLink, useParams } from 'react-router-dom';   // ejecutar comando npm install react-router-dom
  //import React, { useState } from 'react';
  import App from '../../App';

function Viewadmin(){
    const [value, setValue] = useState([1, 3]);
    var [verformest,setverformest]=useState(false);
    const handleClickes =()=>{
      setverformest(!verformest);
      setverformdocen(verformdocen=false);
    }
    
    var [verformdocen,setverformdocen]=useState(false);
    const handleClickdo =()=>{
      setverformdocen(!verformdocen);
      setverformest(verformest=false);
      
    }


    //const [quitarformest,setquitarformest]=useState;
    

    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);

    const [ arregloDatos , setArregloDatos ] = useState( [] );
    const [ arregloDatosDocentes , setArregloDatosDocentes ] = useState( [] );
    const usersEstudiantes=useParams().usersEstudiantes;
    const usersDocentes=useParams().usersDocentes;

    //EXTRAYENDO DATA ESTUDIANTES
    const dataUsers=useParams().dataUsers;
    const [ ExpLabEst , setExpLabEst ] = useState([]);
    const [ InfoAddEst , setInfoAddEst ] = useState([]);

    const [ ExpLabDocen , setExpLabDocen ] = useState([]);
    const [ InfoAddDocen , setInfoAddDocen ] = useState([]);
    const [ InvestDocen , setInvestDocen ] = useState([]);

    const [loading, setLoading] = useState(true);


    
    useEffect(()=>{
        const fetchData = async () => {
            //localStorage.removeItem('cachedData');
            //setLoading(true)
            //cargando datos generales
            //const IDLOGIN=3; // IDLOGIN ES EL ID QUE CAPTURA EL LOGIN QUE ES LA POSICION EN EL ARREGLO DE DATOS GENERALES

            // Verificar si hay datos almacenados en la caché del navegador
            
            const cachedData = localStorage.getItem('cachedData');
            if (cachedData) {
                setLoading(false)
                // Si hay datos en la caché, usarlos en lugar de hacer una nueva solicitud al servidor
                const parsedData = JSON.parse(cachedData);
                setArregloDatos(parsedData.dataEst);
                setArregloDatosDocentes(parsedData.dataDocen);
                setExpLabEst(parsedData.ExpLabEst);
                setInfoAddEst(parsedData.InfoAddEst);
                setExpLabDocen(parsedData.expLabDocen);
                setInfoAddDocen(parsedData.infoAddDocen);
                setInvestDocen(parsedData.investDocen);
                return; // Salir de la función fetchData ya que ya tenemos los datos
            }
            setLoading(true)
            
            
            const Experiencias=[]
            const InfoAdd=[{}]
            const dataEst=[{}]
            const dataDocen=[{}]
            const ExperienciasD=[]
            const InfoAddD=[{}]
            const InvestigacionD=[]


            const usersEstudiantesref = collection(db, 'dataEstudiantes');
            const querySnapshot = await getDocs(usersEstudiantesref);
            const dataEstud = querySnapshot.docs.map(doc => dataEst[doc.id]={...doc.data(),id:doc.id}); 
            setArregloDatos(dataEst);
            //setExpLabEst(data);
            //console.log(dataEst); 


            //DATA DOCENTES datos generales
            const usersDocentesref = collection(db, 'dataDocentes');
            const querySnapshotD = await getDocs(usersDocentesref);
            const dataDocentes = querySnapshotD.docs.map(doc => dataDocen[doc.id]={...doc.data(),id:doc.id}); 
            setArregloDatosDocentes(dataDocen);
            console.log('DATA DOCENTES DATOS GENERALES')
            console.log(dataDocen);

            //cargando experiencia laboral estudiantes-docentes y datos adicionales
            const dataEstudLong=dataEstud.length
            for (let index = 0; index < dataEstudLong; index++) {
                //experiecia laboral
                const usersExp = collection(db, 'dataEstudiantes/'+String(index)+'/expLab');
                const querySnapshot_ = await getDocs(usersExp);
                const dataExpEst = querySnapshot_.docs.map(doc => doc.data());
                Experiencias.push(dataExpEst)   

                //datos adicionales
                const usersInfAdd = collection(db, 'dataEstudiantes/'+String(index)+'/infAdd');
                const querySnapshotI_ = await getDocs(usersInfAdd);
                const dataInfAdd = querySnapshotI_.docs.map(doc => InfoAdd[index]={...doc.data(),id:doc.id});
                //InfoAdd.push(dataInfAdd) 

            }
            setExpLabEst(Experiencias)
            setInfoAddEst(InfoAdd)

            //console.log('DATA ESTUDIANTES INFO EXPERIENCIA LABORAL')
            //console.log(Experiencias)
            //console.log('DATA ESTUDIANTES INFO ADICIONAL')
            //console.log(InfoAdd)

            const dataDocenLong=dataDocentes.length;
            for (let index = 0; index < dataDocenLong; index++) {
                //experiecia laboral
                const usersExp = collection(db, 'dataDocentes/'+String(index)+'/expLab');
                const querySnapshot_ = await getDocs(usersExp);
                const dataExpEst = querySnapshot_.docs.map(doc => doc.data());
                ExperienciasD.push(dataExpEst)   

                //datos adicionales
                const usersInfAdd = collection(db, 'dataDocentes/'+String(index)+'/infAdd');
                const querySnapshotI_ = await getDocs(usersInfAdd);
                const dataInfAdd = querySnapshotI_.docs.map(doc => InfoAddD[index]={...doc.data(),id:doc.id});
                //InfoAdd.push(dataInfAdd) 

                // Investigacion
                const usersInvest = collection(db, 'dataDocentes/'+String(index)+'/invest');
                const querySnapshotInv_ = await getDocs(usersInvest);
                const dataInvest = querySnapshotInv_.docs.map(doc => doc.data());
                InvestigacionD.push(dataInvest)   

            }
            setExpLabDocen(ExperienciasD)
            setInfoAddDocen(InfoAddD)
            setInvestDocen(InvestigacionD)
                
            // Guardar los datos en la caché del navegador
            const dataToCache = {
                dataEst:dataEst,
                dataDocen: dataDocen,
                ExpLabEst:Experiencias,
                InfoAddEst:InfoAdd,
                expLabDocen: ExperienciasD,
                infoAddDocen: InfoAddD,
                investDocen: InvestigacionD
            };
            localStorage.setItem('cachedData', JSON.stringify(dataToCache));
            



            console.log('DATA DOCENTES INFO EXPERIENCIA LABORAL')
            console.log(ExperienciasD)
            console.log('DATA DOCENTES INFO ADICIONAL')
            console.log(InfoAddD)
            console.log('DATA DOCENTES INFO INVESTIGACION')
            console.log(InvestigacionD)

            setLoading(false)




        };
    
        fetchData();
        //console.log(ExpLabEst)
    },[dataUsers]);



    //console.log(Experiencias)
    //console.log(InfoAddEst[1].orientacion)
    //console.log(ExpLabEst)
    //console.log(arregloDatos)

/*
    useEffect(()=>{
        const usersEstudiantesref= collection(db,"dataEstudiantes");
        getDocs(usersEstudiantesref)
            .then((resp)=>{
                setArregloDatos(
                    resp.docs.map((doc)=>{
                        return {...doc.data()}
                    }));
            })


    },[usersEstudiantes])

*/
    /* Cargando data docentes */


/*
    useEffect( ()=>{
        const usersDocentesref= collection(db,"dataDocentes");

        getDocs(usersDocentesref)
            .then((resp)=>{
                setArregloDatosDocentes(
                    resp.docs.map((doc)=>{
                        return {...doc.data(),id: doc.id}
                    }));
            })


    },[usersDocentes])
*/
    

    const { register , handleSubmit } = useForm();
    var [intNumcuent,setintNumcuent]=useState(0);
    var [buscarNumCuent,setbuscarNumCuent]=useState(0);
    var [buscarNombre,setbuscarNombre]=useState('');
    var [buscarNombreDocen,setbuscarNombreDocen]=useState('');
    var [buscarCorreoDocen,setbuscarCorreoDocen]=useState('');
    var [experienciaLab,setexperienciaLab]=useState();
    let stop=true;

    const buscar_NC=(e)=>{
        e.preventDefault();
        const valor=e.target.value;
        setbuscarNumCuent(valor);
        //console.log(valor);
    }
    

    const buscar_Nom=(e)=>{
        e.preventDefault();
        const valor_=e.target.value;
        //const val1=valor_.replace(/\s/g, '');

        setbuscarNombre(valor_);
        //console.log(valor_);
    }

    const buscar_NomD=(e)=>{
        e.preventDefault();
        const valor_=e.target.value;
        //const val1=valor_.replace(/\s/g, '');

        setbuscarNombreDocen(valor_);
        //console.log(valor_);
    }

    const buscar_CorrD=(e)=>{
        e.preventDefault();
        const valor_=e.target.value;
        //const val1=valor_.replace(/\s/g, '');

        setbuscarCorreoDocen(valor_);
        //console.log(valor_);
    }





/*


    const [ ExpLabEst1 , setExpLabEst1 ] = useState([]);
    useEffect(()=>{
        let experiencias=[]
        for (let index = 0; index < ExpLabEst.length; index++) {
            //const element = array[index];
            //const ids=['6','expLab'];
            const usersEstudiantesref= collection(db,"dataEstudiantes/"+String(index)+"/expLab");
            
    
            getDocs(usersEstudiantesref)
                .then((resp)=>{
                    experiencias.push(
                        resp.docs.map((doc)=>{
                            return {...doc.data()}
                        }));
                    
                })
            
        }
        setExpLabEst1(experiencias)
        


    },[])
    console.log(ExpLabEst1)
*/

    /* Extrayendo las experiencias laborales estudiantes */
    //var dataExpestud=localStorage.getItem('pruebaestudiantes.json');
    //var cargDataExpestud=JSON.parse(dataExpestud);
    //setdataExpEstud(cargDataExpestud);
    //console.log(cargDataExpestud);


    

    //EXPERIENCIA LABORAL
/*

    const experienciaLaboral=(id)=> {
        //var dataExpestud2=localStorage.getItem('pruebaestudiantes.json');
        //var cargDataExpestud2=JSON.parse(dataExpestud2);
        const data =cargDataExpestud[id].experiencia
        setexperienciaLab(data);
        //console.log(id);
        //console.log(experienciaLab);
        //return (cargDataExpestud2.id)

    
        
    }  
 
*/ 
    
    
    
    

    

    

    
/*

    var dato=localStorage.getItem('numerocuenta.json');
    var datoJSON=JSON.parse(dato);
    var numCuenta=datoJSON.numeroCuenta;
    var intnumCuenta = parseInt(numCuenta)
    console.log(typeof intnumCuenta);



*/
/*
    const Buscarestud=()=>{
        
            var dato=localStorage.getItem('numerocuenta.json');
            var datoJSON=JSON.parse(dato);
            var numCuenta=datoJSON.numeroCuenta;
            var intnumCuenta = parseInt(numCuenta) 
               
        

    }

*/  
    //const buscar=document.getElementById("buscar");
    //console.log(buscar);
    const handleClick = () => {
        
        console.log('Se hizo clic en el componente');
        var dato=localStorage.getItem('infoEstudiante.json');
        var datoJSON=JSON.parse(dato);
        var numCuenta=datoJSON.numeroCuenta;
        var intnumCuenta = parseInt(numCuenta)
        setintNumcuent(intnumCuenta);
        //console.log(intnumCuenta);

    };
    if (loading) {
        return (
            <div >
                
                <Row>
                
                    <Col xs={8}>
                        <br /><br />
                        <br /><br />
                        <strong>Cargando Datos....<hr /></strong>
                        <br /><br />
                        <br /><br />
                        
                    </Col>
                </Row>

            </div>
        )

        
    }

    return (

        <Container fluid>
            <div className='contenedor1'>
                
                    <Row>
                    
                        <Col >
                    
                            <p><strong>Selccione el tipo de pefil a observar</strong></p><hr />
                            
                        </Col>
                    </Row>
                    <Row>
                    
                    <Col >
                        <center>
                        <button type="button" id="estudiante" onClick={handleClickes}>Estudiante</button>
                        <br /><br />
                        <button type="button" id="docente" onClick={handleClickdo}>Docente</button>

                            
                        </center>
                
                    </Col>
                </Row>
                


            </div>
            {/*
                         <div className='contenedor2'>
                <Row>
                        
                        <Col >
                    
                            <h5><strong>Estadisticas</strong></h5><hr />

                        </Col>
                    </Row>
                    <Row>
                    
                    <Col >
                        <center>
                            <button type="button" onClick={handleClickes}>Hola a todos</button>
                            <br /><br />
                            <button type="button" onClick={handleClickdo} >Hola a todos</button>
                            
                        </center>
                
                    </Col>
                </Row>
            </div>
             */}
            <Row>

                <Col xs={8}>  
                    
                    <br />
                    <hr />
                    <h2>Visualizacion de Perfiles</h2>
                    <br />
                    <h6>En este espacio podra realizar realizar la busqueda de los alumnos de la carrera.</h6>

                    <div id="info" >
                        <br />
                        {
                            //ESTUDIANTE BUSQUEDA
                            verformest &&
                            <Form  onSubmit={handleSubmit(enviarDatos)}>
                                <br />
                                <h4>Buscar Estudiante</h4>
                                <hr />
                                <Form.Label>Filtrar por Nombre</Form.Label>
                                <Row>
                                    
                                    <Form.Group  className="mb-3" id="estud">
                                        
                                        <Form.Label>Nombre</Form.Label>
                                        <Form.Control type="text" id="numCuenta" placeholder="Nombre"   onChange={buscar_Nom} value={buscarNombre} />
                                    </Form.Group>


                                </Row>

                                
                                <Form.Group className="mb-3" id="estud">
                                    <Form.Label>Filtrar por Numero de Cuenta</Form.Label>
                                    <Form.Control type="number" id="numCuenta" placeholder="Numero de Cuenta" {...register( 'numeroCuenta' , { required:true } )}  onChange={buscar_NC} value={buscarNumCuent} />
                                </Form.Group>
                                

                                <p id='buscar'></p>
                                
                                <Button variant="primary" type="submit" controlId="buscar" onClick={handleClick}>
                                    Buscar
                                </Button>

                            </Form>
                        }
                                             
                    </div>
                    
                    <div>
                        {
                            //DOCENTE BUSQUEDA
                            verformdocen &&
                            <Form  onSubmit={handleSubmit(enviarDatos)}>
                                <br />
                                <h4>Buscar Docente</h4>
                                <hr />
                                <Form.Label>Filtrar por Nombre</Form.Label>
                                <Form.Group className="mb-3" id="estud">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control type="text" id="numCuenta" placeholder="Nombre" onChange={buscar_NomD} value={buscarNombreDocen} />
                                </Form.Group>

                                <Form.Label>Filtrar por Correo Institucional</Form.Label>
                                <Form.Group className="mb-3" id="estud">
                                    <Form.Label>Correo Institucional</Form.Label>
                                    <Form.Control type="text" id="numCuenta" placeholder="Correo Institucional" onChange={buscar_CorrD} value={buscarCorreoDocen} />
                                </Form.Group>
                                <p id='buscar'></p>
                                
                                <Button variant="primary" type="submit" controlId="buscar" onClick={handleClick}>
                                    Buscar
                                </Button>

                            </Form>
                        }   
                    </div>
                    <div>
                        <br />
                        {
                            //Filtrado data estudiantes por numero de cuenta        
                            verformest &&
                            arregloDatos.length>0 && 
                            arregloDatos.filter((registro)=> Object.values([registro.numero_cuenta]).some((valor)=>{
                                var svalor
                                if  (typeof valor ==='number' && valor!==0 && ~(!valor)){
                                    //console.log('numero que no son valores vacios')
                                    //console.log(~(!valor))
                                    svalor=String(valor)
                                    if (svalor.includes(String(buscarNumCuent))) {
                                        //console.log(svalor)
                                        return true
                                    } 
                                }
                                else{
                                    return false
                                }
                       
                                
                            })).map((filtro)=>{
                                
                                    //console.log('FILTRADO DE LA DATA')
                                    //console.log(filtro)
                                    if (buscarNumCuent==='0' || !buscarNumCuent) {
                                        return(null);
                                        
                                    }else{
                                        const experiencia = ExpLabEst[parseInt(filtro.id )];
                                        //console.log(filtro)
                                        //const infoADD=InfoAddEst[filtro.id]

                                        return(
                                            <Card 
                                                bg="secondary"
                                                className="mb-2"
                                                key={parseInt(filtro.id )}
                                                >
                                                <CardImg variant="top" src={filtro.imagen}/>
                                                <Card.Body>
                                                    <Card.Title>{filtro.nombre +' '+ filtro.apellido} </Card.Title>
                                                    <Card.Text>
                                                        Numero de Cuenta: {filtro.numero_cuenta}
                                                        <br></br>
                                                        {(InfoAddEst[parseInt(filtro.id)] !== undefined && InfoAddEst[parseInt(filtro.id)] !==null) && (
                                                            <React.Fragment>
                                                                Orientacion: {InfoAddEst[parseInt(filtro.id)].orientacion}
                                                                <br></br>
                                                                Deparamento de Residencia: {InfoAddEst[parseInt(filtro.id)].depatamentoResidencia}
                                                                <br></br>
                                                                Telefono: {InfoAddEst[parseInt(filtro.id)].telefono}
                                                            </React.Fragment>
                                                        )}
                                                        <br></br>
                                                        Correo: {filtro.correo_electronico}                                                        <br></br><br></br>
                                                        <h5>Experiencia Laboral</h5>
                                                        <hr />
                                                        {experiencia.map((experiencia, index) => (
                                                            <div key={index}>
                                                                <h4>Experiencia {index+1}</h4><br />
                                                                <p>Cargo: {experiencia.cargo}</p>
                                                                <p>Nombre de la empresa: {experiencia.nombre_empresa}</p>
                                                                <p>Ubicación: {experiencia.ubicacion}</p>
                                                                <p>Tipo de ubicación: {experiencia.tipo_ubicacion}</p>
                                                                <br/>
                                                            </div>
                                                        ))}
                                                        

                                                    </Card.Text>
                                                </Card.Body>
        
                                            </Card>    
                                        ) 

                                    }
                            })
  
                        }

                    </div>
                    
                    <div>
                        <br />
                        {
                            //Filtrado data estudiantes por nombre        
                            verformest &&
                            arregloDatos.length>0 && 
                            arregloDatos.filter((registro)=> Object.values([registro.nombre+registro.apellido]).some((valor)=>{
                                console.log(typeof valor)
                                var svalor;
                                var buscarNombre_;
                                buscarNombre_=buscarNombre.replace(/\s/g, '').toLowerCase();
                                svalor=valor.replace(/\s/g, '').toLowerCase();

                                if (svalor.includes(buscarNombre_)){
                                    return true;

                                }
                                else{
                                    return false;
                                }
                       
                                
                            })).map((filtro)=>{
                                //var buscarNombre_=buscarNombre.replace(/\s/g, '').toLowerCase();
                                if (buscarNombre==='') {
                                    return null;
                                }else{
                                    const experiencia = ExpLabEst[parseInt(filtro.id )];
                                    return(
                                        
                                        <Card 
                                            bg="secondary"
                                            className="mb-2"
                                            key={parseInt(filtro.id )}
                                            >
                                            <CardImg variant="top" src={filtro.image}/>
                                            <Card.Body>
                                                <Card.Title>{filtro.nombre +' '+ filtro.apellido} </Card.Title>
                                                <Card.Text>
                                                        Numero de Cuenta: {filtro.numero_cuenta}
                                                        <br></br>
                                                        {(InfoAddEst[parseInt(filtro.id)] !== undefined && InfoAddEst[parseInt(filtro.id)] !==null) && (
                                                            <React.Fragment>
                                                                Orientacion: {InfoAddEst[parseInt(filtro.id)].orientacion}
                                                                <br></br>
                                                                Deparamento de Residencia: {InfoAddEst[parseInt(filtro.id)].depatamentoResidencia}
                                                                <br></br>
                                                                Telefono: {InfoAddEst[parseInt(filtro.id)].telefono}
                                                            </React.Fragment>
                                                        )}
                                                        <br></br>
                                                        Correo: {filtro.correo_electronico} 
                                                        <br></br><br></br>
                                                        <h5>Experiencia Laboral</h5>
                                                        <hr />
                                                        {experiencia.map((experiencia, index) => (
                                                            <div key={index}>
                                                                <h4>Experiencia {index+1}</h4><br />
                                                                <p>Cargo: {experiencia.cargo}</p>
                                                                <p>Nombre de la empresa: {experiencia.nombre_empresa}</p>
                                                                <p>Ubicación: {experiencia.ubicacion}</p>
                                                                <p>Tipo de ubicación: {experiencia.tipo_ubicacion}</p>
                                                                <br/>
                                                            </div>
                                                        ))}  

                                                </Card.Text>
                                            </Card.Body>
    
                                        </Card>    
                                    ) 
                                }

                            })
                        }
                    </div>

                    <div>
                        {
                            //Filtrado data docentes por nombre        
                            verformdocen &&
                            arregloDatosDocentes.length>0 && 
                            arregloDatosDocentes.filter((registro)=> Object.values([registro.nombre+registro.apellido]).some((valor)=>{
                                var svalor;
                                var buscarNombre_;
                                //console.log(valor)
                                buscarNombre_=buscarNombreDocen.replace(/\s/g, '').toLowerCase();
                                svalor=valor.replace(/\s/g, '').toLowerCase();

                                if (svalor.includes(buscarNombre_)){
                                    return true;

                                }
                                else{
                                    return false;
                                }
                       
                                
                            })).map((filtro)=>{
                                //var buscarNombre_=buscarNombre.replace(/\s/g, '').toLowerCase();
                                if (buscarNombreDocen==='') {
                                    return null;
                                }else{
                                    const experiencia = ExpLabDocen[parseInt(filtro.id )];
                                    const Investigacion = InvestDocen[parseInt(filtro.id )];

                                    //const investigacion = cargDataInvestdocen[filtro.id - 1].investigacion;
                                    return(
                                        <Card 
                                            bg="secondary"
                                            className="mb-2"
                                            key={parseInt(filtro.id )}
                                            >
                                            <CardImg variant="top" src={filtro.image}/>
                                            <Card.Body>
                                                <Card.Title>{filtro.nombre +' '+ filtro.apellido} </Card.Title>
                                                <Card.Text>
                                                        Numero de Cuenta: {filtro.numero_cuenta}
                                                        <br></br>
                                                        {(InfoAddDocen[parseInt(filtro.id)] !== undefined && InfoAddDocen[parseInt(filtro.id)] !== null) && (
                                                            <React.Fragment>
                                                                Orientacion: {InfoAddDocen[parseInt(filtro.id)].orientacion}
                                                                <br></br>
                                                                Deparamento de Residencia: {InfoAddDocen[parseInt(filtro.id)].depatamentoResidencia}
                                                                <br></br>
                                                                Telefono: {InfoAddDocen[parseInt(filtro.id)].telefono}
                                                                <br></br>
                                                            </React.Fragment>
                                                        )}
                                                        <br></br>
                                                        Correo: {filtro.correo_electronico}
                                                        <br></br><br></br>
                                                        <h5>Experiencia Laboral</h5>
                                                        <hr />
                                                        {experiencia.map((experiencia, index) => (
                                                            <div key={index}>
                                                                <h4>Experiencia {index+1}</h4><br />
                                                                <p>Cargo: {experiencia.cargo}</p>
                                                                <p>Nombre de la empresa: {experiencia.nombre_empresa}</p>
                                                                <p>Ubicación: {experiencia.ubicacion}</p>
                                                                <p>Tipo de ubicación: {experiencia.tipo_ubicacion}</p>
                                                                <br/>
                                                            </div>
                                                        ))} 

                                                        <h4>Investigacion</h4>
                                                        <hr />

                                                        {Investigacion.map((investigacion, index) => (
                                                            <div key={index}>
                                                                <h4>Investigacion {index+1}</h4><br />
                                                                <p>Cargo: {investigacion.tema}</p>
                                                                <p>Nombre de la empresa: {investigacion.autor}</p>
                                                                <p>Ubicación: {investigacion.año_publicacion}</p>
                                                                <p>Tipo de ubicación: {investigacion.sintesis}</p>
                                                                <br/>
                                                            </div>
                                                        ))} 




                                                </Card.Text>
                                            </Card.Body>
    
                                        </Card>    
                                    ) 
                                }

                            })
                        }


                    </div>

                    
                    <div>
                        {
                            //Filtrado data docentes por correo institucional        
                            verformdocen &&
                            arregloDatosDocentes.length>0 && 
                            arregloDatosDocentes.filter((registro)=> Object.values([registro.correo_electronico]).some((valor)=>{
                                var svalor;
                                var buscarNombre_;
                                buscarNombre_=buscarCorreoDocen.replace(/\s/g, '').toLowerCase();
                                svalor=valor.replace(/\s/g, '').toLowerCase();

                                if (svalor.includes(buscarNombre_)){
                                    return true;

                                }
                                else{
                                    return false;
                                }
                       
                                
                            })).map((filtro)=>{
                                //var buscarNombre_=buscarNombre.replace(/\s/g, '').toLowerCase();
                                if (buscarCorreoDocen==='') {
                                    return null;
                                }else{

                                    const experiencia = ExpLabDocen[parseInt(filtro.id )];
                                    const Investigacion = InvestDocen[parseInt(filtro.id )];
                                    return(
                                        <Card 
                                            bg="secondary"
                                            className="mb-2"
                                            key={parseInt(filtro.id )}
                                            >
                                            <CardImg variant="top" src={filtro.image}/>
                                            <Card.Body>
                                                <Card.Title>{filtro.nombre +' '+ filtro.apellido} </Card.Title>
                                                <Card.Text>
                                                        Numero de Cuenta: {filtro.numero_cuenta}
                                                        <br></br>
                                                        {(InfoAddDocen[parseInt(filtro.id)] !== undefined && InfoAddDocen[parseInt(filtro.id)] !== null) && (
                                                            <React.Fragment>
                                                                Orientacion: {InfoAddDocen[parseInt(filtro.id)].orientacion}
                                                                <br></br>
                                                                Deparamento de Residencia: {InfoAddDocen[parseInt(filtro.id)].depatamentoResidencia}
                                                                <br></br>
                                                                Telefono: {InfoAddDocen[parseInt(filtro.id)].telefono}
                                                            </React.Fragment>
                                                        )}
                                                        Correo: {filtro.correo_electronico}
                                                        <br></br><br></br>
                                                        <h5>Experiencia Laboral</h5>
                                                        <hr />
                                                        {experiencia.map((experiencia, index) => (
                                                            <div key={index}>
                                                                <h4>Experiencia {index+1}</h4><br />
                                                                <p>Cargo: {experiencia.cargo}</p>
                                                                <p>Nombre de la empresa: {experiencia.nombre_empresa}</p>
                                                                <p>Ubicación: {experiencia.ubicacion}</p>
                                                                <p>Tipo de ubicación: {experiencia.tipo_ubicacion}</p>
                                                                <br/>
                                                            </div>
                                                        ))} 

                                                        <h4>Investigacion</h4>
                                                        <hr />

                                                        {Investigacion.map((investigacion, index) => (
                                                            <div key={index}>
                                                                <h4>Investigacion {index+1}</h4><br />
                                                                <p>Cargo: {investigacion.tema}</p>
                                                                <p>Nombre de la empresa: {investigacion.autor}</p>
                                                                <p>Ubicación: {investigacion.año_publicacion}</p>
                                                                <p>Tipo de ubicación: {investigacion.sintesis}</p>
                                                                <br/>
                                                            </div>
                                                        ))} 






                                                </Card.Text>
                                            </Card.Body>
    
                                        </Card>    
                                    ) 
                                }

                            })
                        }


                    </div>

                    



                    

 




                    

                </Col>


            
            </Row>

            <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </Container>
        

    );

}
  
export default Viewadmin;

/*


                            verformest &&
                            <Form  onSubmit={handleSubmit(enviarDatos)}>
                                <br />
                                <h4>Buscar Estudiante</h4>
                                <hr />

                                <Form.Group className="mb-3" id="estud">
                                    <Form.Label>Numero de Cuenta</Form.Label>
                                    <Form.Control type="number" id="numCuenta" placeholder="Ingrese su Numero de Cuenta" {...register( 'numeroCuenta' , { required:true } )}  onChange={handleChange} />
                                </Form.Group>
                                
                                <Button variant="primary" type="submit" >
                                    Buscar
                                </Button>

                            </Form>

                                                        verformdocen &&
                            <Form onSubmit={handleSubmit(enviarDatos)}>
                                <br />
                                <h4>Buscar Docente</h4>
                                <hr />
                                <Form.Group className="mb-3" controlId="buscardocen">
                                    <Form.Label>Numero de Empleado</Form.Label>
                                    <Form.Control type='number' placeholder="Numero de Empleado" {...register( 'numeroCuenta' , { required:true } )} />
                                </Form.Group>

                                <Button variant="primary" type="submit"  >
                                    Submit
                                </Button>
                            </Form>


                        {
                            verinfo &&
                            arregloDatos.length>0 && 
                            arregloDatos.map((registro)=>{
                                
                                if (registro.orientacion==='informatica') {
                                    return(
                                        <Card 
                                            bg="secondary"
                                            className="mb-2"
                                            >
                                            <CardImg variant="top" src={registro.image}/>
                                            <Card.Body>
                                                <Card.Title>{registro.first_name +' '+ registro.last_name} </Card.Title>
                                                <Card.Text>
                                                    Orientación: {registro.orientacion}
                                                    <br></br>
                                                    Sexo: {registro.gender}
                                                    <br></br>
                                                    Correo: {registro.email}
                                                </Card.Text>
                                            </Card.Body>

                                        </Card>
                                        
                                        

                                    ) 
                                }
                                return null;

                            }) 

                        }









                        {
                            buscar.addEventListener('click',(e)=>{
                                e.preventDefault();
                                var dato=localStorage.getItem('numerocuenta.json');
                                var datoJSON=JSON.parse(dato);
                                var numCuenta=datoJSON.numeroCuenta;
                                var intnumCuenta = parseInt(numCuenta)
                                console.log(typeof intnumCuenta);

                                verformest &&
                                arregloDatos.length>0 && 
                                arregloDatos.map((registro)=>{
                                    
                                    if (registro.id===intnumCuenta) {
                                        return(
                                            <Card 
                                                bg="secondary"
                                                className="mb-2"
                                                >
                                                <CardImg variant="top" src={registro.image}/>
                                                <Card.Body>
                                                    <Card.Title>{registro.first_name +' '+ registro.last_name} </Card.Title>
                                                    <Card.Text>
                                                        Orientación: {registro.orientacion}
                                                        <br></br>
                                                        Sexo: {registro.gender}
                                                        <br></br>
                                                        Correo: {registro.email}
                                                    </Card.Text>
                                                </Card.Body>
    
                                            </Card>
                                            
                                            
    
                                        ) 
                                    }
                                    return null;
    
                                }) 
                                
                            })
                            


                        }


                    <div>
                        {
                            arregloDatos.length>0 && (stop===true)&&
                            arregloDatos.map((registro)=>{
                                var registro_={
                                    id: registro.id,
                                    experiencia: []
                                }
                                var registrosExistente = JSON.parse(localStorage.getItem('infoEstudiante.json')) || [];
                                registrosExistente.push(registro_);
                                localStorage.setItem('infoEstudiante.json',JSON.stringify(registrosExistente));
                                stop=false;
                            })

                            
                            

                        }
                    </div>

*/

/*


                                                        <br></br>
                                                        NUMERO DE CUENTA DE EXP: {cargDataExpestud[filtro.id-1].id}
<div className='contenedor'>
                hola mundo

            </div>


*/

/*


                        {
                            //Filtrado data estudiantes por numCuenta        
                            verformest &&
                            arregloDatos.length>0 && 
                            arregloDatos.filter((registro)=> Object.values([registro.id,registro.first_name,' ',registro.last_name]).some((valor)=>{
                                var svalor;
                                var svalo_;
                                if  ((typeof valor ==='number' && valor!==0 && ~(!valor) && buscarNumCuent!==0 && ~(!buscarNumCuent) && buscarNombre==='' )||(typeof valor ==='string' && valor!=='' && ~(!valor) && buscarNombre!=='' && ~(!buscarNombre) && !buscarNumCuent)){
                                    //console.log('numero que no son valores vacios')
                                    //svalor=valor;
                                    //console.log(svalor);
                                                                     
                                    if (typeof valor ==='number') {
                                        svalor=String(valor)
                                        if (svalor.includes(String(buscarNumCuent))) {
                                            //console.log(svalor)
                                            return (true);
                                        }
                                        
                                    }else{
                                        svalo_=valor
                                        if (svalo_.toLowerCase().includes(buscarNombre)) {
                                            //console.log(svalor)
                                            return (true);
                                        }else{
                                            return (false);
                                        }
                                        
                                    }




                                }
                                else{
                                    return (false);
                                }
                       
                                
                            })).map((filtro)=>{
                                    //console.log('FILTRADO DE LA DATA')
                                    //console.log(filtro)
                                    
                                    return(
                                        <Card 
                                            bg="secondary"
                                            className="mb-2"
                                            key={filtro.id}
                                            >
                                            <CardImg variant="top" src={filtro.image}/>
                                            <Card.Body>
                                                <Card.Title>{filtro.first_name +' '+ filtro.last_name} </Card.Title>
                                                <Card.Text>
                                                    Orientación: {filtro.orientacion}
                                                    <br></br>
                                                    Sexo: {filtro.gender}
                                                    <br></br>
                                                    Correo: {filtro.email}
                                                    <br></br>
                                                    Numero de Cuenta: {filtro.id}
                                                </Card.Text>
                                            </Card.Body>
    
                                        </Card>    
                                    ) 

                            })
  
                        }

*/