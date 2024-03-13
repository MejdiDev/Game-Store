import "../styles/css/categories.css";

const Categories = () => {
    return (
        <section id="categories_section">
            <ul>
                <li>
                    <p>7423</p>
                    <img src="./categories/action.svg" alt="Action" />
                    <h4>Action</h4>
                </li>

                <li>
                    <p>438</p>
                    <img src="./categories/adventure.svg" alt="Adventure" />
                    <h4>Adventure</h4>
                </li>

                <li>
                    <p>4723</p>
                    <img src="./categories/fps.svg" alt="FPS" />
                    <h4>FPS</h4>
                </li>

                <li>
                    <p>8392</p>
                    <img src="./categories/rpg.svg" alt="RPG" />
                    <h4>RPG</h4>
                </li>

                <li>
                    <p>3467</p>
                    <img src="./categories/indie.svg" alt="Indie" />
                    <h4>Indie</h4>
                </li>

                <li>
                    <p>2374</p>
                    <img src="./categories/simulation.svg" alt="Simulation" />
                    <h4>Simulation</h4>
                </li>

                <li>
                    <p>4309</p>
                    <img src="./categories/strategy.svg" alt="Strategy" />
                    <h4>Strategy</h4>
                </li>
            </ul>
        </section>
    );
}

export default Categories;