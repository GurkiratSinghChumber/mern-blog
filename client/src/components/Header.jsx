import { Button, Navbar, TextInput } from "flowbite-react";
import { CiSearch } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
export default function Header() {
    const path = useLocation().pathname;
  return (
      <div>
          <Navbar className='border-b-2'>
              <Link to={"/"} className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white font-semibold my-2'>
                  <span className='px-2 py-1 pb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>MernStack</span>Blog
              </Link>

              <form >
                  <TextInput type="text" placeholder="Search..." rightIcon={CiSearch} className="hidden lg:inline"></TextInput>
              </form>
              <Button className='w-12 h-10 lg:hidden' color="gray" pill>
                <IoSearch ></IoSearch>
              </Button>
              
              <div className='flex space-x-3 md:order-2'>
                  <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
                      <FaMoon></FaMoon>
                  </Button>
                  
                  <Link to="/sign-in">
                      <Button className='bg-gradient-to-r from-indigo-800 to-purple-600' outline>Sign In</Button>
                  </Link>

                  <Navbar.Toggle>
                  </Navbar.Toggle>
              </div>
              
                <Navbar.Collapse>
                    <Navbar.Link active={path === '/'} as={'div'}>
                        <Link to="/">Home</Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === '/about'} as={'div'}>
                        <Link to="/about">About</Link>
                    </Navbar.Link>

                    <Navbar.Link active={path === '/projects'} as={'div'}>
                        <Link to="/projects">Projects</Link>
                    </Navbar.Link>
              </Navbar.Collapse> 
          </Navbar>

          
    </div>
  )
}
