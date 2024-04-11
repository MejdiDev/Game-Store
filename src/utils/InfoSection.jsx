import "../styles/css/infoSection.css";

const InfoSection = ({ title, body }) => {
    return (
        <section id="info_section">
            <h1>{ title }</h1>
            { body }
        </section>
    );
}

export default InfoSection;