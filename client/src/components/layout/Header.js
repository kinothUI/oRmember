import React from 'react';

function header() {
  return (
    <header style={headerStyle}>
      <h1>oRmember</h1>
    </header>
  )
}

const headerStyle = {
  background: '#333',
  color: '#fff',
  fontFamily: 'Lato,Helvetica Neue,Arial,Helvetica,sans-serif',
  textDecoration: 'none',
  fontWeight: '700',
  textAlign: 'center',
  padding: '10px'
}

export default header;
