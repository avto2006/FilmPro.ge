import './Footer.css'

const Footer = () => {
         const navigationLinks = [
        { name: 'ფილმები', href: '#' },
        { name: 'სერიალები', href: '#' },
        { name: 'ანიმეები', href: '#' }
    ]

    return (
        <>
              <div className="footer_box">
                <h2>KinoPro.ge</h2>
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

            <p>უყურე ფილმებს ქართულად KinoPro.ge-ზე</p>
              </div>
        </>
    )
}

export default Footer