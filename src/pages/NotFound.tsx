
const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-body">
              <h1 className="display-4 text-danger">404 - Not Found</h1>
              <p className="lead mb-4">The page you are looking for does not exist.</p>
              <a href="/" className="btn btn-primary btn-lg">
                <i className="fas fa-home mr-2"></i>Go to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound