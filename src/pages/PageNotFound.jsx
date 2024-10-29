function PageNotFound() {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        backgroundColor: '#f2f2f2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '15px', color: '#4A90E2' }}>404</h1>
        <p style={{ fontSize: '24px', margin: '0 0 20px 0' }}>صفحه مورد نظر پیدا نشد.</p>
        <button onClick={() => window.location.href = '/'} style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: '#4A90E2',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          outline: 'none',
          textDecoration: 'none'
        }}>
          بازگشت به خانه
        </button>
      </div>
    );
  }
  
  export default PageNotFound;
  