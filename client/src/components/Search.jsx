import React, { useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';



const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSearchPage,setIsSearchPage] = useState(false)
    const [ isMobile ] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)

    useEffect(()=>{
        const isSearch = location.pathname === "/search"
        setIsSearchPage(isSearch)
    },[location])


    const redirectToSearchPage = ()=>{
        navigate("/search")
    }

    const handleOnChange = (e)=>{
        const value = e.target.value
        const url = `/search?q=${value}`
        navigate(url)
    }

  return (
    <div className='w-full  min-w-[300px] lg:min-w-[250px] h-11 lg:h-13 rounded-full border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-black '>
      
        <div className='w-full h-full'>
            {
                !isSearchPage ? (
                     //not in search page
                     <div onClick={redirectToSearchPage} className='w-full h-full flex items-center justify-center '>
                        <TypeAnimation
                                sequence={[
                                    // Same substring at the start will only be typed out once, initially
                                    'Search "baby toys"',
                                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                                    'Search "feeding"',
                                    1000,
                                    'Search "nursing"',
                                    1000,
                                    'Search "safety & grooming"',
                                    1000,
                                    'Search "baby gear"',
                                    1000,
                                    'Search "mother needs"',
                                    1000,
                                    'Search "bathing"',
                                    1000,
                                    'Search "Diapering"',
                                    1000,
                                    'Search "muslin essentials"',
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                     </div>
                ) : (
                    //when i was search page
                    <div className="w-full h-full flex items-center justify-center">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search..."
                        autoFocus
                        defaultValue={searchText}
                        onChange={handleOnChange}
                        className="bg-transparent w-full h-full outline-none text-center "
                    />
                </div>
                
                )
            }
        </div>

        <div>
        <hr />
            {
                (isMobile && isSearchPage ) ? (
                    <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-black bg-white rounded-full shadow-md '>
                        <FaArrowLeft size={20}/>
                    </Link>
                ) :(
                    <button className='flex justify-center items-center h-full p-3 group-focus-within:text-black border-[1.5px] bottom-7 border-black rounded-r-[50px] font-bold'>
                        <IoSearch size={16}/>
                    </button>
                )
            }
        </div>

        
    </div>
  )
}

export default Search
