import React from "react";

const inputHelper = (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>,data:any) => {
    const temData:any = {...data}
    temData[e.target.name] = e.target.value
    return temData
}

export {inputHelper}