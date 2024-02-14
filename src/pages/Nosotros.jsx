import landing from "../assets/img/campo-pexels-pixabay-461960-ap.jpg";
import foto from "../assets/img/foto-bebiendo-vino-rd.jpg";
import './nosotros.css';

export const Nosotros = () => {
    return(
        <>
        <div>
        <h2>Sobre nosotros</h2>
        <img src={landing} alt="React Image" id="landing"/>
        <div class="div">
        <div class="texto">
        <p id="texto">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati commodi error nobis laboriosam explicabo a consectetur cum velit, fuga libero? Minima excepturi facere a fugiat exercitationem sapiente illum, ipsam, rerum itaque iusto mollitia ab ullam cupiditate officia fuga, sint similique recusandae? Voluptatibus odio laborum iusto eveniet asperiores recusandae qui accusantium, quasi magnam laboriosam architecto blanditiis repellendus sequi, dicta illo necessitatibus! Atque aut maxime voluptas. Et quos corrupti, nobis dicta ipsa neque suscipit ea est, ducimus non atque nisi qui aliquam rerum laboriosam nemo sunt consequuntur quae! Tempora cum ipsum recusandae eveniet accusantium. Id esse voluptatem enim cum dolores hic accusantium ut optio, magni distinctio facilis saepe laboriosam unde similique accusamus recusandae voluptatibus impedit corrupti quisquam veritatis natus itaque pariatur molestias. Excepturi voluptatum ab fugit eaque qui voluptates asperiores corporis expedita impedit omnis assumenda dolores deserunt et dolore quos illo dolorem rerum placeat velit consequatur quas, minima alias delectus exercitationem. Animi?</p>
        </div>
        <div class="image">
        <img src={foto} alt="Bebiendo Vino" id="foto"/>
        </div>
        </div>
    </div>
    </>
    )
}