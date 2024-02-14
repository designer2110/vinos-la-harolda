import landing from "../../../assets/img/landing-apaisada_lg_rd_tx.jpg"
import './mainhome.css';

export const MainHome = () => {
    return(
        <>
        <div class="flex">
        {/* <h2>Hola desde home</h2> */}
        <img src={landing} alt="React Image" id="landing"/>
    </div>
    </>
    )
}