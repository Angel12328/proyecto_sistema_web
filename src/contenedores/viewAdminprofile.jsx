import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Viewadmin from '../formularios/administrador/formadmin';

//import CollapsibleExample from './barra_nav';
//import GridComplexExample from '../formularios/prueba';
/*

      <Row>
        <CollapsibleExample />{}
      </Row>
 */

function ViewAdmin() {
  return (
    <Container fluid>

      <Row>
        <Col xs={8}>
            
            <Viewadmin/>{}
            

        </Col>
        
      </Row>
    </Container>
  );
}

export default ViewAdmin;