import 'bootstrap/dist/css/bootstrap.min.css';

const MainLoader = () => {
  return (
    <div style={{
        position:"fixed",
        top:0,
        left:0,
        width:"100vw",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "white",
        zIndex:4,
    }}>
        <div className='spinner-border text-primary'
        style={{
            width:"4rem",
            height:"4rem"
        }}
        >
        </div>
    </div>
  )
}

export default MainLoader
