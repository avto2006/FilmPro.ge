import { useState } from "react";
import userProfile from './assets/user.png'


const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false)

    const navigationLinks = [
        { name: 'ფილმები', href: '#' },
        { name: 'სერიალები', href: '#' },
        { name: 'ანიმეები', href: '#' }
    ]

    return (
        <>
            <nav >
                <div className=""></div>
                <div className=""></div>

                <div className="flex-shrink-0 flex items-center">
            <a href="#" className="logo" >
              KinoPro.ge
            </a>
          </div>

            <div className="hidden md:flex space-x-8">
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
                <input type="text" />
                <img className="userPr" src={userProfile} alt="" />
            </div>
            
            </nav>
        </>
    )
}


export default Navbar;