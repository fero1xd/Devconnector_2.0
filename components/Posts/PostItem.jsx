import Link from 'next/link';
import formatDate from '../../utils/formatDate';
import { deletePost, likePost, unlikePost } from '../../utils/postActions';
import { useState } from 'react';

const PostItem = ({
    post: { _id, text, name, avatar, user, likes, comments, date },
    showActions,
    loggedUser,
    setPosts
}) => {

    const [likesData, setLikesData] = useState(likes);



    return (
        <div className='post bg-white p-1 my-1'>
            <div>

                <img className='round-img' src={avatar} alt={name} />

                <h4>
                    <Link href={`/profiles/${user}`} >
                        {name}
                    </Link>
                </h4>
            </div>
            <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>Posted on {formatDate(date)}</p>

                {showActions && (
                    <>
                        <button
                            type='button'
                            className='btn btn-light'
                            onClick={() => likePost(_id, setLikesData)}
                        >
                            <i className='fas fa-thumbs-up' />{' '}
                            <span>{likesData.length > 0 && <span>{likesData.length}</span>}</span>
                        </button>
                        <button
                            type='button'
                            className='btn btn-light'
                            onClick={() => unlikePost(_id, setLikesData)}
                        >
                            <i className='fas fa-thumbs-down' />
                        </button>



                        <span style={{ "cursor": "pointer", marginRight: "10px" }}>
                            <Link href={`/posts/${_id}`} className='btn btn-primary'>

                                Discussion

                            </Link>
                        </span>
                        {comments.length > 0 &&

                            <span className='comment-count'>
                                <Link href={`/posts/${_id}`} className='btn btn-primary'>
                                    {comments.length}
                                </Link>

                            </span>

                        }

                        {user === loggedUser._id && (
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => deletePost(_id, setPosts)}
                            >
                                <i className='fas fa-times' />
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PostItem;
