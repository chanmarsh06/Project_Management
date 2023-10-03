import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import AddTask from './components/AddTask';
import NavBar from './components/NavBar';
import TaskList from './components/TaskList';
import MyVerticallyCenteredModal from './components/UpdateTAsk';

function App() {
  return (
    <Container>
      <NavBar />
      <Row className="justify-content-md-center">
        <Col lg="6">
          <AddTask />
          <TaskList/>
        </Col>
      </Row>
     <MyVerticallyCenteredModal/>
    </Container>
  );
}

export default App;
