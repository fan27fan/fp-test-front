import PostCardHeader from "./post-card-header.jsx";
import PostCardBody from "./post-card-body.jsx";

function PostCard(postInfo) {
    return (
        <>
            <PostCardHeader
                            postId={postInfo.postInfo.id}
                            postDate={postInfo.postInfo.publishDateString}
                            ownerId={postInfo.postInfo.ownerId}
                            ownerName={postInfo.postInfo.ownerLogin}
            />
            <PostCardBody
                            id={postInfo.postInfo.id}
                            bulletinSubject={postInfo.postInfo.bulletinSubject}
                            bulletinText={postInfo.postInfo.bulletinText}
                            bulletinImages={postInfo.postInfo.bulletinImages}
                            commentActive={postInfo.postInfo.commentActive}
            />
        </>
    )
}

export default PostCard;