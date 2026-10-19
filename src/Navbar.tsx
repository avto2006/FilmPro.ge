import { useState } from "react";
import userProfile from './assets/user.png'


const Navbar = () => {
    // const [searchTerm, setSearchTerm] = useState('')

    const navigationLinks = [
        { name: 'ფილმები', href: '#' },
        { name: 'სერიალები', href: '#' },
        { name: 'ანიმეები', href: '#' }
    ]


    // const handleSearchInput = (e) => {
    //     const value = e.target.value;
    //     setSearchTerm(value)


    //     // if(/\d/.test(value)) {
    //     //     alert('ძებნის ველში ციფრების შეყვანა აკრძალულია')
    //     //     setSearchTerm('')
    //     // } 
    // }

    return (
        <>
            <nav >
                <div className=""></div>
                <div className=""></div>

                <div className="logoDiv">
            <a href="#" className="logo" >
              KinoPro.ge
            </a>
          </div>

            <div className="elements">
                {navigationLinks.map((link) => (
                    <a
                     key={link.name}
                     href={link.href}
                     
                     >
                       {link.name}
                    </a>
                ))}
            </div>

            <div className="signArea">
                <input
                 placeholder="მოძებნეე..."
                  className="searchInp"
                   type="text"
                //    value={searchTerm}
                //    onChange={handleSearchInput}
                 />
                <img className="userPr" src={userProfile} alt="" />
            </div>
            
            </nav>
        </>
    )
}


export default Navbar;