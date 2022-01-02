import { useState } from 'react';
import PostItem from '../../components/Posts/PostItem';
import CommentForm from '../../components/Post/CommentForm';
import CommentItem from '../../components/Post/CommentItem';
import Link from 'next/link';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { parseCookies } from 'nookies';


const Post = ({ postData, user }) => {
    const [comments, setComments] = useState(postData.comments);
    return (
        <>
            <section className='container'>

                <Link href='/posts' className='btn'>
                    Back to Posts
                </Link>
                <PostItem post={postData} />
                <CommentForm postId={postData._id} setComments={setComments} />
                <div className='comments'>
                    {comments.length > 0 &&
                        comments.map((comment) => (
                            <CommentItem
                                key={comment._id}
                                comment={comment}
                                postId={postData._id}
                                loggedUser={user}
                                setComments={setComments}
                            />
                        ))}
                </div>
            </section>
        </>
    );
};

export const getServerSideProps = async ctx => {
    try {
        const { postId } = ctx.query;
        const { token } = await parseCookies(ctx);
        const { data } = await axios.get(`${baseUrl}/api/posts/${postId}`, {
            headers: { Authorization: token }
        });
        return { props: { postData: data } }
    } catch (error) {
        return { props: { errorLoading: true } }
    }
}

export default Post;
