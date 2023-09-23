import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const MainMenu = () => {

  const StyledLink = styled(Link)`
  font-weight: normal;
  &:hover {
    font-weight: bold;
  }`;

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1>My Store</h1>
        <h3>Menu</h3>
        <StyledLink to='/products'>Products</StyledLink><br/>
        <StyledLink to='/customers'>Customers</StyledLink><br/>
        <StyledLink to='/purchases'>Purchases</StyledLink><br/>
    </div>
  );
}

export default MainMenu;
