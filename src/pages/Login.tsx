import React, { useState } from 'react'
import { inputHelper } from '../Helper'
import { useLoginUserMutation } from '../API'
import { apiResponse, userModel } from '../interfaces';
import { MainLoader } from '../components/pages/common';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from '../Storage';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [userInput, setUserInput] = useState({
    userName: "",
    password: "",
  })

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(e, userInput)
    setUserInput(tempData)
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const response: apiResponse = await loginUser({
      userName: userInput.userName,
      password: userInput.password,
    })

    if (response.data) {
      const {token} = response.data.result
      localStorage.setItem("token",token)
      const {fullName,id,email,role}:userModel = jwtDecode(token);
      dispatch(setLoggedInUser({fullName,id,email,role}))
      navigate("/");
    } else if (response.error) {
      // console.log(response.error.data.errorMessages[0])
      setError(response.error.data.errorMessages[0])
    }
    setLoading(false)
  }

  return (
    <div className="container text-center">
      {loading && <MainLoader/>}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Login</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name='userName'
              value={userInput.userName}
              onChange={handleUserInput}
              required
            />
          </div>

          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              name='password'
              value={userInput.password}
              onChange={handleUserInput}
              required
            />
          </div>
        </div>

        <div className="mt-2">
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          <button
            type="submit"
            className="btn btn-success"
            style={{ width: "200px" }}
            disabled={loading}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login