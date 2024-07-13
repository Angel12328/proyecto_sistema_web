import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useForm } from 'react-hook-form'; 
import datosEstudiantes from './data/dataestudiantesP.json';
import datosDocentes from './data/datadocentes.json';
//import datosDocentes from '../../data/datadocentes.json';
//import GridComplexExample from '../formularios/estudiantes/formestudiante';
//import CollapsibleExample from './barra_nav';
//import GridComplexExample from '../formularios/prueba';
/*

      <Row>
        <CollapsibleExample />{}
      </Row>
 */
import {useEffect} from 'react';
//import { EnviarLogin } from './formularios/catchingLogin';

function Login() {
  const { register , handleSubmit } = useForm();
  const [ arregloDatos , setArregloDatos ] = useState( [] );
  const [ arregloDatosDocentes , setArregloDatosDocentes ] = useState( [] );

  const getDatos=()=>{
      return new Promise(
          (resolve,reject)=>{
              resolve(datosEstudiantes);
          }
      )
  }

  useEffect(
      ()=>{
          getDatos().then(
              (respuesta)=>{
                  setArregloDatos(respuesta);
              }

          )
      }
  )
  /* Cargando data docentes */
  const getDatosDocentes=()=>{
      return new Promise(
          (resolve,reject)=>{
              resolve(datosDocentes);
          }    
      )
  }

  useEffect(
      ()=>{
          getDatosDocentes().then(
              (respuesta)=>{
                  setArregloDatosDocentes(respuesta);
              }
          )
      }
  )

  var [login,setlogin]=useState([]);

    

  const EnviarLogin = (data) =>{ 
    
    //var dataJSON=JSON.parse(data)
    
    
    localStorage.setItem('login.json',JSON.stringify(data));
    setlogin(data);
    


  } 
  
  const [verformest,setverformest]=useState(false);
  const handleClickes =()=>{
    setverformest(!verformest);
  }
  const [verformdocen,setverformdocen]=useState(false);
  const handleClickdo =()=>{
    setverformdocen(!verformdocen);
  }
  const [verformAdmin,setverformAdmin]=useState(false);
  const handleClickLogAdmin =()=>{
    setverformAdmin(!verformAdmin);
  }
  

  return (
    <Container fluid>

      <Row>
        <Col xs={8}>
            <div>
                <br /><br /><br /><br />
                <h4>Seleccione El Perfil a Seccionar ingresar</h4>
                <center>
                  <Button variant="primary" onClick={handleClickes}>Estudiante</Button>
                  <br /><br />
                  <Button variant="primary" onClick={handleClickdo} >Docente</Button>
                  <br /><br />
                  <Button variant="primary" onClick={handleClickLogAdmin}>Adminsitrador</Button>
                  <br /><br />
                </center>

                
                    
                

            </div>
            <div>
              {
                verformest&&
                <Form onSubmit={handleSubmit(EnviarLogin)}>
                <Form.Label>Login Estudiante</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero de Cuenta</Form.Label>
                    <Form.Control type="number" placeholder="Numero de Cuenta" {...register( 'clave' , { required:true } )}/>

                </Form.Group>


                <Button variant="primary" type="submit" >
                    Submit
                </Button>
                </Form>
              }
            </div>

            <div>
              {
                
                verformdocen&&
                <Form onSubmit={handleSubmit(EnviarLogin)}>
                <Form.Label>Login Docente</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero de Cuenta</Form.Label>
                    <Form.Control type="number" placeholder="Numero de Cuenta" {...register( 'clave' , { required:true } )}/>

                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
              }
            </div>

            <div>
              {
                verformAdmin&&
                <Form onSubmit={handleSubmit(EnviarLogin)}>
                <Form.Label>Login Administrador</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Numero de Cuenta</Form.Label>
                    <Form.Control type="number" placeholder="Numero de Cuenta" {...register( 'clave' , { required:true } )}/>

                </Form.Group>


                <Button variant="primary" type="submit">
                    Submit
                </Button>
                </Form>
              }
            </div>
            <div>
              {
                verformest&&
                arregloDatos>0&&
                arregloDatos.map((registro)=>{
                  console.log(registro);



                })
              }
            </div>

        </Col>
        
        
      </Row>
    </Container>
  );
}

export default Login;