import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormDocente from '../formularios/docentes/formdocente';

//import CollapsibleExample from './barra_nav';
//import GridComplexExample from '../formularios/prueba';
/*

      <Row>
        <CollapsibleExample />{}
      </Row>
 */

function PerfDocente() {
  return (
    <Container fluid>
      
      <Row>
        <Col xs={8}>
            <div>
                <FormDocente />{}
            </div>

        </Col>
        
      </Row>
    </Container>
  );
}

export default PerfDocente;