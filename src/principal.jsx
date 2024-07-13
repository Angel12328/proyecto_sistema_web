import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import FormDocente from '../formularios/docentes/formdocente';
//import Button from 'react-bootstrap/Button';

function Principal() {



    return (
        <Container fluid>
        
        <Row>
            <Col xs={8} >
                <div>
                    <br />
                    
                    <center>
                        <h1>Pagina Principal</h1>

                    </center>
                    <p>
                        La matemática ha jugado un papel fundamental en las ciencias modernas desde su propio inicio: una teoría científica es una teoría que posee un modelo matemático apropiado. Muchos de los conceptos teóricos de las ciencias  y de la ingeniería están basados esencialmente en conceptos matemáticos. La matemática es el lenguaje con el cual se escribe la ciencia.<br/><br/>
                        Así mismo durante los últimos cuatro siglos, la matemática ha contribuido de manera más radical al desarrollo científico-tecnológico de la sociedad que lo hecho por la revolución neolítica en noventa siglos. En las últimas décadas se ha visto una tendencia por cuantificar y expresar en este lenguaje a disciplinas como Economía, en particular para el estudio de mercados financieros; en algunas ramas de la Química, Biología y Medicina e incluso hasta en las Ciencias Sociales.<br/><br/>
                        En este contexto no es casual entonces que las grandes escuelas o facultades de ingeniería, economía, física, química, etc. de las universidades más prestigiosas del mundo estén siempre acompañadas de una escuela o departamento de matemática de alto nivel. Cabe señalar que todos los estudios científicos demuestran claramente el vínculo entre el nivel de formación matemática de los ciudadanos de un país y el desarrollo económico, social y cultural de dicho país.
                    </p> 
                </div>

            </Col>
  
        </Row>

        </Container>

        
    );
    }

export default Principal;