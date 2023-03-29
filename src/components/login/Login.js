import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script';
import { Modal } from 'react-bootstrap'
import "./Login.css"
import axios from 'axios'

const clientId = '223844690055-qo4ua389e61goh8us4avpjvb4mt26na3.apps.googleusercontent.com'

function LoginButton({onHide}) {

    // const onSuccess = (res) => {
    //     //let auth = gapi.auth2.getAuthInstance()
    //     //console.log(auth.isSignedIn.get())

    //     console.log('[Login Success] currentUser:', res)

    //     var myUserEntity = {};
    //     myUserEntity.family = res.profileObj.familyName
    //     myUserEntity.name = res.profileObj.givenName
    //     sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
        
    //     onHide()

    //     console.log("Windows reload")
    //     window.location.reload();
    // }

    // const onFailure = (res) => {

    //     let auth = gapi.auth2.getAuthInstance()
    //     console.log(auth.isSignedIn.get())
    //     console.log('[Login failed] res:', res)
        
    //     sessionStorage.clear()
    // }

    const responseGoogle = (response) => {
        if (response.tokenId){
            axios.get('api/authorization/auth?token='+ response.tokenId, { withCredentials: 'include' })
            .then(function (res) {
                if (res.data.email_verified) {
                    let auth = gapi.auth2.getAuthInstance()
                    console.log(auth.isSignedIn.get())

                    console.log('[Login Success] currentUser:', res)

                    const myUserEntity = {
                        "family": response.profileObj.familyName,
                        "name": response.profileObj.givenName,
                        "imageUrl": response.profileObj.imageUrl,
                        "roleUser": res.data.roleUser
                    };

                    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
                    
                    onHide()

                    console.log("Windows reload")
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error, "error");
                let auth = gapi.auth2.getAuthInstance()
                console.log(auth.isSignedIn.get())
                console.log('[Login failed] res:', response)
                
                sessionStorage.clear()
        });
        }
    }

    return(
        <div>
            <GoogleLogin
                className="authButton"
                clientId={clientId}
                buttonText="Войти"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}

function Login({show, onHide}) {
    return(
        <div>
            <Modal
            show={show}
            onHide={onHide}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="authModal"
            >

            <Modal.Header closeButton>
                <h4 className="titleAuthModal">
                    Авторизация
                </h4>
            </Modal.Header>
            <Modal.Body>
                <LoginButton onHide={onHide}/>
            </Modal.Body>
            </Modal>
        </div>
    )
}


export default Login