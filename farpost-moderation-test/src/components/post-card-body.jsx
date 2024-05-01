function PostCardBody(post, commentActive) {
    return (
        <div className="postCardBody">
            <h2>
                {post.bulletinSubject}
            </h2>
            <div className="postBodyContainer">
                <p>
                    {post.bulletinText}
                </p>
                <span></span>
                <div className="imgContainer">
                    {post.bulletinImages.map(function (image, index) {
                        return (<div key={index + post.id}>
                            <img alt={post.id} src={image}/>
                        </div>)
                    })}
                </div>
            </div>

        </div>
    )
}
export default PostCardBody