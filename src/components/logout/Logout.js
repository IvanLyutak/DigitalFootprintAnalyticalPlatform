import React from 'react';
import { GoogleLogout } from 'react-google-login'
import "./Logout.css"

const clientId = '223844690055-qo4ua389e61goh8us4avpjvb4mt26na3.apps.googleusercontent.com'

function Logout() {

    const onSuccess = () => {
        console.log('Logout made SuccessFully')
        sessionStorage.clear()
        window.location.reload();
    }

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                onLogoutSuccess={onSuccess}
                render={renderProps => (
                    <button className="buttonLogout" onClick={renderProps.onClick} disabled={renderProps.disabled}>Выйти</button>
                )}
            />
        </div>
    )
}

export default Logout