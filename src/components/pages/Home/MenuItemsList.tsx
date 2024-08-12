import { useEffect, useState } from 'react'
import { menuItemModel } from '../../../interfaces'
import { MenuCards } from './'
import { useGetMenuItemsQuery } from '../../../API'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, setMenuItem } from '../../../Storage'
import { MainLoader } from '../common'
import { SD_SortTypes } from '../../../Utilities/SD'


export default function MenuItemsList() {
  const [menuItemsList, setMenuItemsList] = useState([])
  const { data, isLoading } = useGetMenuItemsQuery(null);
  const [selectedCategory, setselectedCategory] = useState("All")
  const [sortName, setSortName] = useState(SD_SortTypes.NAME_A_Z)
  const [categoryList, setCategoryList] = useState<string[]>([])
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.menuItemStore.search)
  const sortOptions: Array<SD_SortTypes> = [
    SD_SortTypes.PRICE_LOW_HIGH,
    SD_SortTypes.PRICE_HIGH_LOW,
    SD_SortTypes.NAME_A_Z,
    SD_SortTypes.NAME_Z_A,
  ]

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilter(sortName, selectedCategory, searchValue)
      setMenuItemsList(tempMenuArray)
    }
  }, [searchValue, selectedCategory])


  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons");
    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active");
        localCategory = index === 0 ? 'All' : categoryList[index];
        setselectedCategory(localCategory);
        const tempArray = handleFilter(sortName, localCategory, searchValue); // Use localCategory directly
        setMenuItemsList(tempArray);
      } else {
        button.classList.remove("active");
      }
    });
  }

  const handleSortClick = (i: number) => {
    setSortName(sortOptions[i])
    const tempArray = handleFilter(
      sortOptions[i],
      selectedCategory,
      searchValue
    )
    setMenuItemsList(tempArray)
  }


  const handleFilter = (sortType: SD_SortTypes, category: string, search: string) => {
    let tempArray = category === "All" ? [...data.result] : data.result.filter((item: menuItemModel) =>
      item.category.toUpperCase() === category.toUpperCase())
    if (search) {
      const tempSearchMenuItem = [...tempArray]
      tempArray = tempSearchMenuItem.filter((item: menuItemModel) =>
        item.name.toUpperCase().includes(search.toUpperCase()))
    }


    // sort
    if (sortType === SD_SortTypes.PRICE_LOW_HIGH) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => a.price - b.price)
    }
    if (sortType === SD_SortTypes.PRICE_HIGH_LOW) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) => b.price - a.price)
    }

    if (sortType === SD_SortTypes.NAME_A_Z) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) =>
        a.name.toUpperCase().charCodeAt(0) - b.name.toUpperCase().charCodeAt(0))
    }
    if (sortType === SD_SortTypes.NAME_Z_A) {
      tempArray.sort((a: menuItemModel, b: menuItemModel) =>
        b.name.toUpperCase().charCodeAt(0) - a.name.toUpperCase().charCodeAt(0))
    }

    return tempArray;
  }



  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result))
      setMenuItemsList(data.result)

      const tempCategoryList = ["All"]
      data.result.forEach((item: menuItemModel) => {
        if (tempCategoryList.indexOf(item.category) === -1) {
          tempCategoryList.push(item.category)
        }
      })
      setCategoryList(tempCategoryList)
    }
  }, [isLoading])

  if (isLoading) {
    return <MainLoader />
  }

  return (
    <div className='container row'>
      <div className="my-3">
        <ul className="nav w-100 d-flex justify-content-center">
          {categoryList.map((item, index) => (
            <li className="nav-item" key={index}>
              <button
                onClick={() => handleCategoryClick(index)}
                className={`nav-link p-0 pb-2 custom-buttons fs-5 ${index === 0 && 'active'}`}>{item}</button>
            </li>
          ))}

          <li className='nav-item dropdown' style={{ marginLeft: "auto" }}>
            <div
              className='nav-link dropdown-toggle text-dark fs-6 border'
              role='button'
              data-bs-toggle="dropdown"
              aria-expanded='false'
            >
              {sortName}
            </div>
            <ul className="dropdown-menu">
              {sortOptions.map((sortTypes, index) => (
                <li
                  onClick={() => handleSortClick(index)}
                  key={index} className='dropdown-item' style={{cursor:"pointer"}}>
                  {sortTypes}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      {menuItemsList.length > 0 && menuItemsList.map((menuItem: menuItemModel, index: number) => (
        <MenuCards menuItem={menuItem} key={index} />
      ))}
    </div>
  )
}

/* 
{



  const handleCategoryClick = (i: number) => {
    const buttons = document.querySelectorAll(".custom-buttons")

    let localCategory;
    buttons.forEach((button, index) => {
      if (index === i) {
        button.classList.add("active")
              if (index === 0) {
                localCategory = 'All'
              } else {
                localCategory = categoryList[index]
              }
              setselectedCategory(localCategory)
              const tempArray = handleFilter(selectedCategory, searchValue)
              
              setMenuItemsList(tempArray)
              console.log("tempArray",tempArray);
              console.log("menuItemsList",menuItemsList);
              
      } else {
        button.classList.remove("active")
      }
    })

  }
} */