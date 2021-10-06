import { useHistory } from 'react-router-dom';

function Home() {

    const history = useHistory();

    return (
        <div id="h-outer">
            <div>
                <div id="h-tag">
                    Welcome to<br/>
                    the place where<br/>
                    <div id="h-tag-bs">
                        <div id="buyers">buyers&nbsp;</div> meet&nbsp;<div id="sellers">sellers!</div> <br/><br/>
                    </div>
                </div>
                <div>
                    <button id="h-about-us">About Us</button>
                    <button id="h-contact-us">Contact Us</button>
                </div>
            </div>

            <div id="h-image">
                <img src="/images/man.jpg" height="500" width="650" alt="ERROR"/>
            </div>
        </div>
    );
}
export { Home };