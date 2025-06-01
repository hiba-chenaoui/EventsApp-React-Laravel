import '../styles/button.css'
export default function Button({type , onClick}){
    return(
    <button onClick={onClick} className="btn">
        {type}
    </button>
    );
}