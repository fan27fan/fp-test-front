function CommentSection(activation) {
    const handleEnter = (e) => {
        e.preventDefault();

    }
    return (
        <>
            <h3>Введите комментарий:</h3>
            <textarea></textarea>
            <button onKeyUp={handleEnter}></button>
        </>
    )
}