

const MyMessage=({content})=>{
    console.log("hello from my message")
    return (
        <div className="message message-personal"> 
            <span>
                {content}
            </span> 
        </div>
    )
}

export default MyMessage