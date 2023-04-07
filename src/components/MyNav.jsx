import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNav() {
  return (
      <Navbar className='nav py-3 text-light' bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img className='logo' src='/WMO-logo-blue.png' alt='logo'></img> </Navbar.Brand>
          <Nav className="w-50">
            <Nav.Link className='mr-5' href="#home">Home</Nav.Link>
            <Nav.Link className='mr-5' href="#features">Your Country</Nav.Link>
            <Nav.Link href="#pricing">About Us</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default MyNav;