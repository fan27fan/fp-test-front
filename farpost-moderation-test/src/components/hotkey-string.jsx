function hotkeyString ({title, color, hotkey}) {
    let style = {
        backgroundColor: color,
    }
    return (
        <>
                <p className="hotkeyTitle">{title}</p>
                <span className="spanMark" style={style}></span>
                <p className="hotkey">{hotkey}</p>
        </>
    )
}
export default hotkeyString