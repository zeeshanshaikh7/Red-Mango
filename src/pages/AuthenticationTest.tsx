import { withAuth } from "../HOC"

function AuthenticationTest() {
  return (
    <div>this page can be accessed by any logged in user</div>
  )
}

export default withAuth(AuthenticationTest);