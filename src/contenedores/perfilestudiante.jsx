import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GridComplexExample from '../formularios/estudiantes/formestudiante';
//import CollapsibleExample from './barra_nav';
//import GridComplexExample from '../formularios/prueba';
/*

      <Row>
        <CollapsibleExample />{}
      </Row>
 */

function Perfestud() {
  return (
    <Container fluid>

      <Row>
        <Col xs={8}>
            <div>
                <GridComplexExample />{}
            </div>

        </Col>
        
        
      </Row>
    </Container>
  );
}

export default Perfestud;