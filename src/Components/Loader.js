// https://codepen.io/virtualwiz/pen/OJveNwo This HTML was created by Virtual Wiz on CodePen

import React from 'react';
import './CSS/Main.scss';
class Loader extends React.Component {
    render () {
        return (
            <div class="containerMoon" style={{visibility: this.props.visibility}}>
                <div class="moon">
                    <div class="crater crater-1"></div>
                    <div class="crater crater-2"></div>
                    <div class="crater crater-3"></div>
                    <div class="crater crater-4"></div>
                    <div class="crater crater-5"></div>
                    <div class="shadow"></div>
                    <div class="eye eye-l"></div>
                    <div class="eye eye-r"></div>
                    <div class="mouth"></div>
                    <div class="blush blush-1"></div>
                    <div class="blush blush-2"></div>
                </div>
            <div class="orbit">
                <div class="rocket">
                    <div class="window"></div>
                </div>
            </div>
        </div>
        )
    }
}

export default Loader;