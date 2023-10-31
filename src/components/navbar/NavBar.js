import React, { useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation().pathname;
   
    const navigate = useNavigate();

    const onHandleAddClick = useCallback(()=>{
        navigate('/AddAnEmployee');
    },[navigate]);

    const onHandleViewClick = useCallback(()=>{
        navigate('/ViewEmployees');
    },[navigate]);

    const onHandleSkillClick = useCallback(() => {
      navigate('/Skills');
    },[navigate]);

    const onHandleHomeClick = useCallback(()=>{
        navigate('/');
    },[navigate]); 
    
  return ( 
    <>
    <nav className='dashBoardMainContainer'>
    <div className='dashBoardContainer'>
    <button className={location ==='/' ? 'linkButtonClicked' : 'linkButton'} onClick={onHandleHomeClick}>
        Home
      </button>
      <button className={location ==='/AddAnEmployee' ? 'linkButtonClicked' : 'linkButton'} onClick={onHandleAddClick}>
        Add an Employee
      </button>
      <button className={location ==='/ViewEmployees' ? 'linkButtonClicked' : 'linkButton'} onClick={onHandleViewClick}>
        View Employee Details
      </button> 
      <button className={location ==='/Skills' ? 'linkButtonClicked' : 'linkButton'} onClick={onHandleSkillClick}>
        Add Skills
      </button>
    </div>
    </nav>
    </>
  )
}

export default NavBar
