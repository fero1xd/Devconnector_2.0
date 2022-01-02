import axios from 'axios';
import baseUrl from './baseUrl';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';


const Axios = axios.create({
    baseURL: `${baseUrl}/api/posts`,
    headers: {
        Authorization: cookie.get('token'),
    },
});


export const createPost = async (formData, setPosts) => {
    try {
        const { data } = await Axios.post('/', formData)

        setPosts(prev => [data, ...prev])
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const deletePost = async (postId, setPosts) => {
    try {
        await Axios.delete(`/${postId}`);

        setPosts(prev => prev.filter((post) => post._id.toString() !== postId));
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const likePost = async (postId, setLikes) => {
    try {
        const { data } = await Axios.put(`/like/${postId}`);

        setLikes(data);

    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const unlikePost = async (postId, setLikes) => {
    try {
        const { data } = await Axios.put(`/unlike/${postId}`);

        setLikes(data);

    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const addComment = async (postId, setComments, formData) => {
    try {
        const { data } = await Axios.post(`/comment/${postId}`, formData);
        setComments(data);
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const deleteComment = async (postId, commentId, setComments) => {
    try {
        const { data } = await Axios.delete(`/comment/${postId}/${commentId}`);
        setComments(data);
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}