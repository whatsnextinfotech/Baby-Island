import React, { useEffect, useState } from 'react'
import logo from '../assets/babyislandlogo.jpg'
import Search from './Search'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from '../hooks/useMobile';
import { BsCart4 } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import { useGlobalContext } from '../provider/GlobalProvider';
import DisplayCartItem from './DisplayCartItem';
import DisplayWishListItem from './DisplayWishListItem'
import { BsTruck } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";


const Header = () => {
    const [isMobile] = useMobile()
    const location = useLocation()
    const isSearchPage = location.pathname === "/search"
    const navigate = useNavigate()
    const user = useSelector((state) => state?.user)
    const [openUserMenu, setOpenUserMenu] = useState(false)
    
    // Get cart and wishlist data from Redux
    const cartItem = useSelector(state => state.cartItem.cart)
    const wishlistItems = useSelector(state => state.wishlist.wishlist)
    
    // Get global context for cart count
    const { totalQty } = useGlobalContext()
    
    // Count for wishlist
    const wishlistCount = wishlistItems?.length || 0
    
    const [openCartSection, setOpenCartSection] = useState(false)
    const [openWishListSection, setopenWishListSection] = useState(false)

    const redirectToLoginPage = () => {
        navigate("/login")
    }

    const handleCloseUserMenu = () => {
        setOpenUserMenu(false)
    }

    const handleMobileUser = () => {
        if (!user._id) {
            navigate("/login")
            return
        }
        navigate("/user")
    }

    return (
        <header className='h-32 lg:h-[120px] w-[100%] sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white border-b-2 shadow-sm'>
            {
                !(isSearchPage && isMobile) && (
                    <div className='container mx-auto flex items-center px-2 justify-around'>

                        {/* Mobile Icons - Left Side Profile Icon */}
                        <div className='flex lg:hidden'>
                            <button className='text-neutral-600' onClick={handleMobileUser}>
                                <FaRegCircleUser size={26} />
                            </button>
                        </div>

                        {/* Desktop User Menu and Search */}
                        <div className="serachicons hidden lg:flex gap-12 ">
                            {/* login */}
                            <div className='hidden lg:flex items-center gap-10'>
                                <div className='relative'>
                                    <div className='hidden lg:flex items-center gap-10'>
                                        {
                                            user?._id ? (
                                                <div className='relative'>
                                                    <div onClick={() => setOpenUserMenu(preve => !preve)} className='flex select-none items-center gap-1 cursor-pointer'>
                                                        <FaRegCircleUser className='text-green-300' size={32} />
                                                        {
                                                            openUserMenu ? (
                                                                <GoTriangleUp size={25} />
                                                            ) : (
                                                                <GoTriangleDown size={25} />
                                                            )
                                                        }
                                                    </div>
                                                    {
                                                        openUserMenu && (
                                                            <div className='absolute right-0 top-12 left-8'>
                                                                <div className='bg-white rounded p-4 min-w-52 lg:shadow-lg'>
                                                                    <UserMenu close={handleCloseUserMenu} />
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            ) : (
                                                <button onClick={redirectToLoginPage} className='text-lg px-2'><FaRegCircleUser className='text-red-500' size={32} /></button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            {/**Search */}
                            <div className='hidden lg:block'>
                                <Search />
                            </div>
                        </div>

                        {/**logo */}
                        {/** Logo */}
                        <div className='h-[80px] sm:h-[100px] md:h-[120px] lg:h-[120px] flex items-center'>
    <Link to={"/"} className='h-full flex justify-center items-center'>
    <img
    src={logo}
    className="h-full w-auto object-contain"
    alt="logo"
  />


    </Link>
</div>


                        {/* Mobile Icons - Right Side (Truck, Wishlist, Cart) */}
                        <div className='flex lg:hidden items-center gap-5'>
                            {/* <button onClick={() => setOpenCartSection(true)} className='text-neutral-600'>
                                <BsTruck size={22} />
                            </button> */}
                            
                            <button onClick={() => setopenWishListSection(true)} className='text-neutral-600 relative'>
                                <CiHeart size={22} className="stroke-1" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-sm font-medium">
                                        {wishlistCount > 99 ? '99+' : wishlistCount}
                                    </span>
                                )}
                            </button>
                            
                            <button onClick={() => setOpenCartSection(true)} className='text-neutral-600 relative'>
                                <BsCart4 size={22} />
                                {totalQty > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-sm font-medium">
                                        {totalQty > 99 ? '99+' : totalQty}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/**Desktop Icons*/}
                        <div className='hidden lg:block'>
                            <div className='hidden lg:flex items-center gap-10'>
                                <button onClick={() => setOpenCartSection(true)} className='flex items-center gap-2 py-2 rounded text-neutral-600 transition duration-300 hover:text-neutral-800'>
                                    {/**Truck icons */}
                                    <div className="header-icons flex w-full gap-12">
                                        <div>
                                            <BsTruck size={28} />
                                        </div>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setopenWishListSection(true)} 
                                    className='flex items-center gap-2 py-2 rounded text-neutral-600 transition duration-300 hover:text-neutral-800 relative'
                                >
                                    {/**Wishlist icons */}
                                    <div className="header-icons flex w-full gap-12 relative">
                                        <div>
                                            <CiHeart size={30} className="stroke-1" />
                                            {wishlistCount > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm font-medium">
                                                    {wishlistCount > 99 ? '99+' : wishlistCount}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>

                                <button 
                                    onClick={() => setOpenCartSection(true)} 
                                    className='flex items-center gap-2 py-2 rounded text-neutral-600 transition duration-300 hover:text-neutral-800 relative'
                                >
                                    {/**Cart icons */}
                                    <div className="header-icons flex w-full gap-12 relative">
                                        <div>
                                            <BsCart4 size={28} />
                                            {totalQty > 0 && (
                                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm font-medium transform transition-all duration-300 ease-in-out">
                                                    {totalQty > 99 ? '99+' : totalQty}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            <div className='container mx-auto px-2 lg:hidden'>
                <Search />
            </div>

            {
                openCartSection && (
                    <DisplayCartItem close={() => setOpenCartSection(false)} />
                )
            }
            {
                openWishListSection && (
                    <DisplayWishListItem close={() => setopenWishListSection(false)} />
                )
            }
        </header>
    )
}

export default Header