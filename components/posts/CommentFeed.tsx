import CommentItem from "./CommentItem";

interface CommentFeedProps{
    comments?: any[];
}
export default function CommentFeed({comments}:CommentFeedProps){
    return(
        <>
        {comments?.map((comment)=>(
            <CommentItem key={comment.id} data={comment}/>
        ))}
        </>
    )
}