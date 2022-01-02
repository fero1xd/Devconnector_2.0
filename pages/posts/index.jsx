import { useState } from 'react';
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import PostItem from '../../components/Posts/PostItem';
import PostForm from '../../components/Posts/PostForm';

const Posts = ({ postsData, user }) => {

    const [posts, setPosts] = useState(postsData);


    return (
        <>
            <section className='container'>
                <PostForm setPosts={setPosts} />
                <div className='posts'>
                    {posts.map((post) => (
                        <PostItem key={post._id} post={post} showActions={true} loggedUser={user} setPosts={setPosts} />
                    ))}
                </div>
            </section>
        </>
    );
};

export const getServerSideProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        const { data } = await axios.get(`${baseUrl}/api/posts/`, {
            headers: { Authorization: token }
        })

        return { props: { postsData: data } }
    } catch (error) {
        return { props: { errorLoading: true } }
    }
}

export default Posts;
