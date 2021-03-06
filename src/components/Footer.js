import React from 'react';

import fb from '../fb.png';
import twitter from '../twitter.png';
import insta from '../insta.png';
import youtube from '../youtube.png';

const style = {
    textAlign: "center",
    padding: "20px",
    left: "0",
    bottom: "0",
    height: "10em",
    width: "100%",
};



function Footer({ children }) {
    return <>
            <hr/>
            <div style={style}>
                { children }
                <p className="copyright">© 1796-3005, WE HAVE THINGS, Inc. or its affiliates</p>
			    <a href='https://www.facebook.com/marketplace/?ref=app_tab'><img alt='' className="socials" src={fb}/></a>
                <a href='https://twitter.com/?lang=en'><img alt='' className="socials" src={twitter}/></a>
                <a href='https://www.instagram.com/explore/tags/things/'><img alt='' className="socials" src={insta}/></a>
                <a href='https://youtu.be/9C_HReR_McQ'><img alt='' className="socials" src={youtube}/></a>
            </div>
    </>
}

export default Footer;
