import { useState } from 'react';
import { createPost } from '../../utils/postActions';

const PostForm = ({ setPosts }) => {
    const [text, setText] = useState('');

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Say Something...</h3>
            </div>
            <form
                className='form my-1'
                onSubmit={(e) => {
                    e.preventDefault();
                    createPost({ text }, setPosts);
                    setText('');
                }}
            >
                <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Create a post'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

export default PostForm;
