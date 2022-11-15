import React from 'react';

import './CSS/About.scss';

class About extends React.Component {

    render() {
        return (
            <div id="aboutPage">

                <div id="team">
                    <h1 >Meet the Team</h1>
                </div>
                <div id="aboutBody">

                    <div className="container">

                        <div className="card" >

                            

                            <div className="face face1">
                                <div className="content">

                                    <h2 className="Gaz">Michael Gazaway</h2>
                                    <p className="Gaz" >Hi, My name is Michael Gazaway. I am a former Marine and am currently working for the NSA as a Dataflow Engineer. I am working into becoming a full fledged SECDEVOP and using that expertise to expand our mission.</p>
                                    <img className="img" src="https://i.imgur.com/bNEb8VE.png" alt="Michael Gazaway"></img>
                                </div>
                            </div>
                            <div className="face face2">
                                <h2>Gaz</h2>
                            </div>
                        </div>

                        <div className="card">
                            <div className="face face1">
                                <div className="content">

                                    <h2 className="Ethan">Ethan Luxton</h2>
                                    <p className="Ethan">Hi! My name is Ethan. I am a full stack developer with a background in financial services, client services, public relations, and a passion for coding. I'm a lifelong learner who thrives in diverse team engagements.</p>
                                    <img className="img" src="https://i.imgur.com/T9k98fb.png" alt="Ethan Luxton"></img>
                                </div>
                            </div>
                            <div className="face face2">
                                <h2>Ethan</h2>
                            </div>
                        </div>

                        <div className="card">
                            <div className="face face1">
                                <div className="content">

                                    <h2 className="Manuch">Manuch Sadri</h2>
                                    <p className="Manuch">Manuch is a full-stack software developer with 18+ years of experience working in the contact center space creating tools for improving the customer and agent experience, and workforce management solutions.</p>
                                    <img className="img" src="https://i.imgur.com/WfDxlE0.png" alt="Manuch Sadri"></img>
                                </div>
                            </div>
                            <div className="face face2">
                                <h2>Manuch</h2>
                            </div>
                        </div>

                        <div className="card">
                            <div className="face face1">
                                <div className="content">

                                    <h2 className="Chris">Christopher Lopez</h2>
                                    <p className="Chris"></p>
                                    <img className="img" src="https://i.imgur.com/XejsiqA.png" alt="Christopher Lopez"></img>
                                </div>
                            </div>
                            <div className="face face2">
                                <h2>Chris</h2>
                            </div>
                        </div>
                    </div>

                </div>
            </div>





        )
    }

}

export default About;