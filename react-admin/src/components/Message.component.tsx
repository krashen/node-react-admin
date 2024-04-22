import '../Form.css'

const Message = (props: {text: string, color?: string}) =>{
    return (
        <div className={`message ${props.color}`}>{props.text}</div>
    )
}

export default Message