import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form'; 
import { enviarDatosDocentes } from '../cantchingdocentes';
import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection,addDoc } from 'firebase/firestore';




function FormDocente() {
    const { register , handleSubmit } = useForm();
    /* TOMANDO LA EXPERIENCIA LABORAL */
    const [experiencias,setexperiencias]=useState([{cargo: "",nombre_empresa: '', ubicacion: '', tipo_ubicacion: '' },]);

    const handleAddExperiencia = (e) => {
      e.preventDefault();
      setexperiencias([...experiencias, {cargo: "", nombre_empresa: '', ubicacion: '', tipo_ubicacion: '' }]);
    };
  
    const handleSubmitExp = (e) => {
      localStorage.removeItem('cachedData');
      e.preventDefault();
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
      const usersDocentesref= collection(db,"dataDocentes",...ids);
        //console.log('Se hizo clic en el componente');
      //ar archivoExperienciaEstud=localStorage.getItem('pruebaestudiantes.json');
      //var data=JSON.parse(archivoExperienciaEstud);
      for (let index = 0; index < experienciasJSON.length; index++) {
        const element = experienciasJSON[index];
        //data[1].experiencia.push(element);
        //console.log(element);
        addDoc(usersDocentesref,element);
        //localStorage.setItem('pruebaestudiantes.json',JSON.stringify(data)); 
      }
      
      
      //localStorage.setItem()
      //console.log(data[0].experiencia)
      //localStorage.getItem('prueba.json',JSON.stringify(data));
      
      //let experiencia=[];
  
      //var data[0].experiencia=experienciaJSONstring;
  
      //console.log('Experiencias enviadas:', experienciasJSON);
      alert("Informacion Enviada");
  
  
  
      //console.log('Experiencias enviadas:', experienciasJSON);
  
      
    };


    /* TOMANDO LOS PROYECTOS DE INVESTIGACION */

    const [investigaciones,setinvestigaciones]=useState([{tema: "", autor: '', año_publicacion: '', sintesis: '' },]);

    const handleAddInvestigacion = (e) => {
      e.preventDefault();
      setinvestigaciones([...investigaciones, {tema: "", autor: '', año_publicacion: '', sintesis: '' }]);
    };
  
    const handleSubmitInvest = (e) => {
      localStorage.removeItem('cachedData');
      e.preventDefault();
      // Aquí puedes enviar los datos al servidor o realizar otras acciones
      let investigacionesJSON=[];
      for (let index = 0; index < investigaciones.length; index++) {
        const tema = investigaciones[index].tema;
        const autor=investigaciones[index].autor;
        const año_publicacion=investigaciones[index].año_publicacion;
        const sintesis=investigaciones[index].sintesis;
  
        const investigacion = {
          tema: tema,
          autor: autor,
          año_publicacion: año_publicacion,
          sintesis:sintesis
        };
        investigacionesJSON.push(investigacion);
        //var datoJSON=JSON.parse(element);
  
        //const info={"cargo": experiencias[index].cargo,"nombreempresa": experiencias[index].nombre_empresa,"ubicacion": experiencias[index].ubicacion,"tipoubicacion": experiencias[index].tipo_ubicacion};
        //console.log('Experiencias enviadas:', info);
  
        
      }
  
        //console.log('Se hizo clic en el componente');
        const IDLOGIN=11; // IDLOGIN ES EL ID QUE CAPTURA EL LOGIN QUE ES LA POSICION EN EL ARREGLO DE DATOS GENERALES
        const ids=[String(IDLOGIN),'invest'];
        const usersInvestref= collection(db,"dataDocentes",...ids);
          //console.log('Se hizo clic en el componente');
        //ar archivoExperienciaEstud=localStorage.getItem('pruebaestudiantes.json');
        //var data=JSON.parse(archivoExperienciaEstud);
        for (let index = 0; index < investigacionesJSON.length; index++) {
          const element = investigacionesJSON[index];
          //data[1].experiencia.push(element);
          //console.log(element);
          addDoc(usersInvestref,element);
          //localStorage.setItem('pruebaestudiantes.json',JSON.stringify(data));     
        }
      
      //localStorage.setItem()
      //console.log(data[0].experiencia)
      //localStorage.getItem('prueba.json',JSON.stringify(data));
      
      //let experiencia=[];
  
      //var data[0].experiencia=experienciaJSONstring;
  
      //console.log('Experiencias enviadas:', experienciasJSON);
      alert("Informacion Enviada");
  
  
  
      //console.log('Experiencias enviadas:', experienciasJSON);
  
      
    };


    return (
      <Form onSubmit={handleSubmit(enviarDatosDocentes)}>
        <Row className="mb-3">
          <h1>Información del Docente</h1><hr />
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
              <h6>Docente:</h6>
            </Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue="Angel Zavala" />
            </Col>
          </Form.Group>
  
        </Row>
  
        <h3>Complete su Informacion</h3><hr />
  
        <Row className="mb-3">
  
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Departamento de residencia</Form.Label>
            <Form.Select defaultValue="Seleccione un departamento" {...register( 'departamentoResidencia' , { required:true } )}>
              <option >Seleccione un departamento</option>
              <option>Comayagua</option>
              <option>Francisco Morazan</option>
            </Form.Select>
          </Form.Group>
  
          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Telefono</Form.Label>
            <Form.Control {...register( 'telefono' , { required:true } )} placeholder='Telefono'/>
              
          </Form.Group>
        </Row>
  
        <br />
  
        <h5>Departamento al que pertenece</h5><hr />
        <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Departamento</Form.Label>
            <Form.Select defaultValue="Seleccione una orientacion" {...register( 'orientacion' , { required:true } )}>
                <option >Seleccione un Departamento</option>
                <option>Matemática Aplicada</option>
                <option>Matemática Pura</option>
                <option>Estadistica Matemática</option>
              
            </Form.Select>
          </Form.Group>
          <br />
        
        <Button variant="primary" type="submit">
          Enviar Informacion
        </Button>
  
        <br /><br /><h5>Experiencia Profesional</h5><hr />
        <Form.Label>En este espacio podria propocionar su experiencia en proyectos de investigacion en los que ha participado</Form.Label><br/><br />

        {

          experiencias.map((exp,index)=>(
            <div key={index}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <h5>Experiencia {index + 1}</h5><hr />
                  <Form.Label>Cargo</Form.Label><br/>
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
                  <Form.Control placeholder="Tegucipalpa,Honduras"
                      type="text"
                      value={exp.ubicacion}
                      onChange={(e) => {
                        const updatedExperiencias = [...experiencias];
                        updatedExperiencias[index].ubicacion = e.target.value;
                        setexperiencias(updatedExperiencias);
                      }}               
                  />
                  <Form.Label>Tipo de Ubicacion</Form.Label>
                  <Form.Select defaultValue="Seleccione un departamento"
                      type="text"
                      value={exp.tipo_ubicacion}
                      onChange={(e) => {
                        const updatedExperiencias = [...experiencias];
                        updatedExperiencias[index].tipo_ubicacion = e.target.value;
                        setexperiencias(updatedExperiencias);
                      }}               
                  
                  >
                      <option >Seleccione un departamento</option>
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
        

        <br /><br /><h5>Investigacion</h5><hr />
        <Form.Label>En este espacio podria propocionar su experiencia en proyectos de investigacion en los que ha participado</Form.Label>
        {

          investigaciones.map((exp,index)=>(
            <div key={index}>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <h5>Investigación {index + 1}</h5><hr />
                  <Form.Label>Tema</Form.Label><br/>
                  <Form.Control placeholder="Ej: Analsis de modelos economicos locales" 
                      type="text"
                      value={exp.tema}
                      onChange={(e) => {
                        const updatedinvestigaciones = [...investigaciones];
                        updatedinvestigaciones[index].tema = e.target.value;
                        setinvestigaciones(updatedinvestigaciones);
                      }}               
                  />

                  <Form.Label>Autor</Form.Label><br/>
                  <Form.Control placeholder="Ej: PÉREZ GONZÁLEZ, Carlos" 
                      type="text"
                      value={exp.autor}
                      onChange={(e) => {
                        const updatedinvestigaciones = [...investigaciones];
                        updatedinvestigaciones[index].autor = e.target.value;
                        setinvestigaciones(updatedinvestigaciones);
                      }}               
                  />

                  <Form.Label>Año de Publicacion</Form.Label><br/>
                  <Form.Control placeholder="Ej: 2024" 
                      type="text"
                      value={exp.año_publicacion}
                      onChange={(e) => {
                        const updatedinvestigaciones = [...investigaciones];
                        updatedinvestigaciones[index].año_publicacion = e.target.value;
                        setinvestigaciones(updatedinvestigaciones);
                      }}               
                  />

                  <Form.Label>Sintesis</Form.Label><br/>
                  <Form.Control placeholder="Ej: La alimentación es un elemento vital para todo ser vivo, en especial para los seres humanos..." 
                      type="text"
                      value={exp.sintesis}
                      onChange={(e) => {
                        const updatedinvestigaciones = [...investigaciones];
                        updatedinvestigaciones[index].sintesis = e.target.value;
                        setinvestigaciones(updatedinvestigaciones);
                      }}               
                  />


              </Form.Group>             
            </div>
            

          ))
          

        }
        <Row>
          <Col>
            <Button variant="primary" type="button" onClick={handleAddInvestigacion}>
              Agregar Investigacion
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="button" onClick={handleSubmitInvest} >
              Enviar Investigaciones
            </Button>
          </Col>
        </Row> 
        <br /><br />
      </Form>


    );
  }
  
  export default FormDocente;

