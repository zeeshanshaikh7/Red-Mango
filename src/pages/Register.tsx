import React, { useState } from 'react'
import { SD_Roles } from '../Utilities/SD'
import { inputHelper, toastNotify } from '../Helper'
import { useRegisterUserMutation } from '../API/authApi'
import { apiResponse } from '../interfaces';
import { MainLoader } from '../components/pages/common';
import { useNavigate } from 'react-router-dom';


function Register() {
    const [registerUser] = useRegisterUserMutation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        role: "",
        name: "",
    })


    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e, userInput)
        setUserInput(tempData)
    }

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const response: apiResponse = await registerUser({
            userName: userInput.userName,
            password: userInput.password,
            role: userInput.role,
            name: userInput.name,
        })
        if (response.data) {
            toastNotify('Registration Successfull! Please login to continue', "success")
            navigate("/login")
        } else if (response.error) {
            toastNotify(response.error.data.errorMessages[0], "error")
        }
        setLoading(false)
    }

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form method="post" onSubmit={handleSubmit}>
                <h1 className="mt-5">Register</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            required
                            name='userName'
                            value={userInput.userName}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            required
                            name='name'
                            value={userInput.name}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            required
                            name='password'
                            value={userInput.password}
                            onChange={handleUserInput}
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <select
                            name='role'
                            className="form-control form-select"
                            required value={userInput.role}
                            onChange={handleUserInput}>
                            <option value="">--Select Role--</option>
                            <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
                            <option value={`${SD_Roles.ADMIN}`}>Admin</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-success" disabled={loading}>
                        Register
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Register