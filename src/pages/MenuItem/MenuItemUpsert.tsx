import React, { useState, useEffect } from "react"
import { inputHelper, toastNotify } from "../../Helper"
import { useCreateMenuItemsMutaion, useGetMenuItemByIdQuery, useUpdateMenuItemsMutaion } from "../../API"
import { useNavigate, useParams } from "react-router-dom"
import foodItems from "../../assets/foods"
import { SD_Categories } from "../../Utilities/SD"
import { MainLoader } from "../../components/pages/common"

const categories = [
    SD_Categories.APPETIZER, SD_Categories.BEVERAFES, SD_Categories.DESSERT, SD_Categories.ENTREE
]

const menuItemData = {
    name: "",
    description: "",
    specialTag: "",
    category: categories[0],
    price: 0
}

function MenuItemUpsert() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const [menuItemInput, setMenuItemInput] = useState(menuItemData)
    const [imageToBeStore, setImageToBeStore] = useState<any>("")
    const [imageToBeDisplay, setImageToBeDisplay] = useState<string>("")

    const [createMenuItem] = useCreateMenuItemsMutaion();
    const [updateMenuItem] = useUpdateMenuItemsMutaion();


    const { data } = useGetMenuItemByIdQuery(id);

    useEffect(() => {
        if (data && data.result) {
            const tempData = {
                name: data.result.name,
                description: data.result.description,
                specialTag: data.result.specialTag,
                category: data.result.category,
                price: data.result.price
            }
            setMenuItemInput(tempData)
            setImageToBeDisplay(foodItems[Number(id) - 1])
        }

    }, [data])

    const handleMenuItemInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const tempData = inputHelper(e, menuItemInput)
        setMenuItemInput(tempData)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file) {

            const imageTypes = file.type.split('/')[1]
            const validImageType = ['jpeg', 'jpg', 'png']
            const isImageTypeValid = validImageType.filter((each) => {
                return each === imageTypes
            })

            if (file.size > 1000 * 1024) {
                setImageToBeStore("")
                toastNotify('Image must be less than 1 MB', "error")
                return
            }
            if (isImageTypeValid.length == 0) {
                setImageToBeStore("")
                toastNotify("image must be of type JPEG,JPG or PNG", "error")
                return
            }

            const reader = new FileReader()
            reader.readAsDataURL(file)
            setImageToBeStore(file)
            reader.onload = (e) => {
                const imgUrl = e.target?.result as string;
                setImageToBeDisplay(imgUrl)
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        if (!imageToBeStore && !id) {
            toastNotify("Please upload image", "error")
            setIsLoading(false)
            return
        }

        const formData = new FormData()
        formData.append("Name", menuItemInput.name)
        formData.append("Description", menuItemInput.description)
        formData.append("SpecialTag", menuItemInput.specialTag ?? "")
        formData.append("Category", menuItemInput.category)
        const price = new Blob([String(menuItemInput.price)]);
        formData.append("Price", price)
        if (imageToBeStore) formData.append("File", imageToBeStore)

        let response
        if (id) {
            // update
            formData.append("Id", id)
            response = updateMenuItem({ data: formData, id })
            toastNotify("Item updated successfully", "success")
        } else {
            // create
            response = await createMenuItem(formData)
            if (response.error) {
                toastNotify(`error`, "error")
            } else {
                toastNotify("Item added successfully", "success")
            }

        }

        console.log(response);

        if (response) {
            setIsLoading(false)
            navigate("/menuitem/menuitemList")
        }

        setIsLoading(false)

    }

    return (
        <>
            {isLoading && <MainLoader />}
            {!isLoading && (
                <div className="container border mt-5 p-5 bg-light">
                <h3 className="px-2 text-success">{id ? "Update Menu Item" : "Add New Menu Item"}</h3>
                <form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="row mt-3">
                        <div className="col-md-7">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                required
                                name="name"
                                value={menuItemInput.name}
                                onChange={handleMenuItemInput}
                            />
                            <textarea
                                className="form-control mt-3"
                                placeholder="Enter Description"
                                name="description"
                                rows={10}
                                value={menuItemInput.description}
                                onChange={handleMenuItemInput}
                            ></textarea>
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Enter Special Tag"
                                name="specialTag"
                                value={menuItemInput.specialTag}
                                onChange={handleMenuItemInput}
                            />
                            <select
                                className="form-control form-select  mt-3"
                                name="category"
                                value={menuItemInput.category}
                                onChange={handleMenuItemInput}
                            >
                                {categories.map((each, index) => (
                                    <option value={each} key={index}>{each}</option>
                                ))}
                            </select>
                            <input
                                type="number"
                                className="form-control mt-3"
                                required
                                placeholder="Enter Price"
                                name="price"
                                value={menuItemInput.price}
                                onChange={handleMenuItemInput}
                            />
                            <input onChange={handleFileChange} type="file" className="form-control mt-3" />
                            <div className="row">
                                <div className="col-6">
                                    <button
                                        type="submit"
                                        className="btn btn-success mt-5 form-control"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="col-6">
                                    <a
                                        className="btn btn-secondary mt-5 form-control"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back To Menu Item
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 text-center">
                            <img
                                src={imageToBeDisplay}
                                style={{ width: "100%", borderRadius: "30px" }}
                                alt=""
                            />
                        </div>
                    </div>
                </form>
            </div>
            )}
        </>

    )
}

export default MenuItemUpsert