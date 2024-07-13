import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form'; 
//import datosEstudiantes from '../../data/prueba.json';
import { useState } from 'react';
import { enviarDatos } from '../catchingestudiantes';
import { db } from '../../firebase/config';
import { collection,addDoc } from 'firebase/firestore';

//import { Console } from 'console';
//import App from '../../App';
function GridComplexExample() {
  const { register , handleSubmit } = useForm();
  //const fs = require('fs');
  //const archivo='prueba.json';


/*
  const fs = require('fs');
  const archivo='prueba.json';
  const cargadata=fs.readFileSync(archivo,'utf-8');
  const data=JSON.parse(cargadata);
  console.log(data);


*/

  const [experiencias,setexperiencias]=useState([{cargo: "",nombre_empresa: '', ubicacion: '', tipo_ubicacion: '' },]);

  const handleAddExperiencia = () => {
    setexperiencias([...experiencias, {cargo: "", nombre_empresa: '', ubicacion: '', tipo_ubicacion: '' }]);
  };

  const handleSubmitExp = (e) => {
    localStorage.removeItem('cachedData');
    e.preventDefault();
    console.log(experiencias)


    // Aquí puedes enviar los datos al servidor o realizar otras acciones
    let experienciasJSON=[];
    for (let index = 0; index < experiencias.length; index++) {
      const cargo = experiencias[index].cargo;
      const nombre_empresa=experiencias[index].nombre_empresa;
      const ubicacion=experiencias[index].ubicacion;
      const tipo_ubicacion=experiencias[index].tipo_ubicacion;

      const experienciaJSON = {
        cargo: cargo,
        nombre_empresa: nombre_empresa,
        ubicacion: ubicacion,
        tipo_ubicacion:tipo_ubicacion
      };
      experienciasJSON.push(experienciaJSON);
      //var datoJSON=JSON.parse(element);

      //const info={"cargo": experiencias[index].cargo,"nombreempresa": experiencias[index].nombre_empresa,"ubicacion": experiencias[index].ubicacion,"tipoubicacion": experiencias[index].tipo_ubicacion};
      //console.log('Experiencias enviadas:', info);

      
    }
    const IDLOGIN=11; // IDLOGIN ES EL ID QUE CAPTURA EL LOGIN QUE ES LA POSICION EN EL ARREGLO DE DATOS GENERALES
    const ids=[String(IDLOGIN),'expLab'];
    const usersEstudiantesref= collection(db,"dataEstudiantes",...ids);
      //console.log('Se hizo clic en el componente');
    //ar archivoExperienciaEstud=localStorage.getItem('pruebaestudiantes.json');
    //var data=JSON.parse(archivoExperienciaEstud);
    for (let index = 0; index < experienciasJSON.length; index++) {
      const element = experienciasJSON[index];
      //data[1].experiencia.push(element);
      //console.log(element);
      addDoc(usersEstudiantesref,element);
      //localStorage.setItem('pruebaestudiantes.json',JSON.stringify(data));

      
    }
    alert('Informacion Enviada');
    //localStorage.setItem()
    //console.log(data[0].experiencia)
    //localStorage.getItem('prueba.json',JSON.stringify(data));
    
    //let experiencia=[];

    //var data[0].experiencia=experienciaJSONstring;

    //console.log('Experiencias enviadas:', experienciasJSON);
    



    //console.log('Experiencias enviadas:', experienciasJSON);

    
  };


  return (
    
    <Form onSubmit={handleSubmit(enviarDatos)} >
      
      <Row className="mb-3">
        <h1>Información del Estudiante</h1><hr />
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            <h6>Correo Electronico:</h6>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="azavalap@unah.hn" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            <h6>Estudiante:</h6>
          </Form.Label>
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue="Angel Zavala" />
          </Col>
        </Form.Group>

      </Row>

      <h3>Complete su Informacion</h3><hr />

      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Departamneto de residencia</Form.Label>
          <Form.Select defaultValue="Seleccione un departamento" {...register( 'depatamentoResidencia' , { required:true } )} >
            <option >Seleccione un departamento</option>
            <option>Comayagua</option>
            <option>Francisco Morazan</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Telefono</Form.Label>
          <Form.Control placeholder='telefono' {...register( 'telefono' , { required:true } )} type='number' />
          
        </Form.Group>
      </Row>

      <br />

      <h5>Informacion Academica</h5><hr />
      <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Orientación a la que pertenece</Form.Label>
          <Form.Select defaultValue="Seleccione una orientacion" {...register( 'orientacion' , { required:true } )}>
            <option >Seleccione una orientacion</option>
            <option>Informatica</option>
            <option>Estadistica</option>
            <option>Ingieneria Matematica</option>
          </Form.Select>
        </Form.Group>
        <br />

      <Button variant="primary" type="submit" >
        Enviar
      </Button>
      <br /><br />
      
      <h5>Experiencia Profesional</h5><hr />
      <Form.Label>En este espacio podria propocionar su experiencia en proyectos de investigacion en los que ha participado</Form.Label><br /><br />

      

        
        {
          experiencias.map((exp,index)=>(
            <div key={index}>
              <h5>Experiencia {index + 1}</h5>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Cargo</Form.Label><br />
                <Form.Control placeholder="Ej: responsable de ventas minoristas" 
                  type="text"
                  value={exp.cargo}
                  onChange={(e) => {
                    const updatedExperiencias = [...experiencias];
                    updatedExperiencias[index].cargo = e.target.value;
                    setexperiencias(updatedExperiencias);
                  }} 
                />



                <Form.Label>Nombre del empresa</Form.Label>
                <Form.Control placeholder="Ej: Microsoft" 
                  type="text"
                  value={exp.nombre_empresa}
                  onChange={(e) => {
                    const updatedExperiencias = [...experiencias];
                    updatedExperiencias[index].nombre_empresa = e.target.value;
                    setexperiencias(updatedExperiencias);
                  }}
                />

                <Form.Label>Ubicacion</Form.Label>
                <Form.Control placeholder="Ej: Tegucipalpa,Honduras" 
                  type="text"
                  value={exp.ubicacion}
                  onChange={(e) => {
                    const updatedExperiencias = [...experiencias];
                    updatedExperiencias[index].ubicacion = e.target.value;
                    setexperiencias(updatedExperiencias);
                  }}
                />

                <Form.Label>Tipo de Ubicacion</Form.Label>
                <Form.Select defaultValue="Seleccione un tipo de ubicacion" 
                  type="text"
                  value={exp.tipo_ubicacion}
                  onChange={(e) => {
                    const updatedExperiencias = [...experiencias];
                    updatedExperiencias[index].tipo_ubicacion = e.target.value;
                    setexperiencias(updatedExperiencias);
                  }}
                >
                  <option>Seleccione un tipo de ubicacion</option>
                  <option>Presencial</option>
                  <option>Hibrido</option>
                  <option>Remoto</option>
                </Form.Select>

              </Form.Group>

            </div>

          ))

        }
        <Row>
          <Col>
            <Button variant="primary" type="button" onClick={handleAddExperiencia}>
              Agregar Experiencia
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="button" onClick={handleSubmitExp} >
              Enviar Experiencia
            </Button>
          </Col>
        </Row> 
    
        




      

      <br /><br />

      <br /><br /><br /><br />

    </Form>



    




    

  );
}

export default GridComplexExample;