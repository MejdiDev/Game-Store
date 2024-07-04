import "../styles/css/guideBody.css";

const steps = [
    {
        title: 'Login to your Steam account',

        image: "./guide/activation_key/1.jpg" 

    },

    {
        title: 'Click "ADD A GAME..." in the bottom left',

        image: "./guide/activation_key/2.jpg"

    },

    {
        title: 'Click "Activate a Product on Steam..."',

        image: "./guide/activation_key/3.jpg"

    },

    {
        title: 'Click "NEXT"',

        image: "./guide/activation_key/4.jpg" 

    },

    {
        title: 'Click "I Agree"',

        image: "./guide/activation_key/5.jpg" 

    },

    {
        title: 'Enter you game code and click "NEXT"',

        image: "./guide/activation_key/6.jpg" 

    },

    {
        title: 'Proceed with installation by double clicking the game in your library.',

        image: "./guide/activation_key/7.jpg" 

    }
]

const GuideBody = () => {
    const hideGuideWindow = () => {
        document.getElementById('drop_menu_wrapper').style.zIndex = '999';

        document.getElementById('guide_body_wrapper').classList.remove('active');
        document.getElementById('overlay_dropdown').style.opacity = "0";

    

        setTimeout(() => {
            document.getElementById('guide_body_wrapper').style.display = "none";
            document.getElementById('overlay_dropdown').style.display = "none";
        }, 300);

        document.querySelector('body').style.overflowY = 'auto';
        document.querySelector('nav').classList.remove('blur');
    }

    return (
        <section id="guide_body_wrapper">
            <div id="guide_body">
                <div onClick={hideGuideWindow} id="cross">
                    <img src="./icons/cross.svg" alt="Close" />
                </div>

                
                {
                    steps.map((step, idx) =>
                        <div className="step_wrapper">
                            <h2>{
                                (idx < 9) ?
                                ( "0" + String(idx + 1) ) : idx

                            }</h2>

                            <div id="line_design_wrapper">
                                <div id="circle"><div id="ring"></div></div>
                                <div id="line"></div>
                            </div>

                            <div id="content_wrapper">

                                <p>{ step.title }</p>

                                <img src={ step.image } alt={ step.title } />

                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    );
}

export default GuideBody;