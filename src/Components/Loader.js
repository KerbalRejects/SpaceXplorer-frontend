// https://codepen.io/virtualwiz/pen/OJveNwo This HTML was created by Virtual Wiz on CodePen

import React from 'react';
import './CSS/Loader.scss';
class Loader extends React.Component {
    render () {
        return (
            <div className="containerMoon" style={{visibility: this.props.visibility}}>
                <div className="moon">
                    <div className="crater crater-1"></div>
                    <div className="crater crater-2"></div>
                    <div className="crater crater-3"></div>
                    <div className="crater crater-4"></div>
                    <div className="crater crater-5"></div>
                    <div className="shadow"></div>
                    <div className="eye eye-l"></div>
                    <div className="eye eye-r"></div>
                    <div className="mouth"></div>
                    <div className="blush blush-1"></div>
                    <div className="blush blush-2"></div>
                </div>
            <div className="orbit">
                <div className="rocket">
                    <div className="window"></div>
                </div>
            </div>
        </div>
        )
    }
}

export default Loader;