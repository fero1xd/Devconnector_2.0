import axios from 'axios';
import baseUrl from './baseUrl';
import catchErrors from './catchErrors';
import Router from 'next/router';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';


const Axios = axios.create({
    baseURL: `${baseUrl}/api/profile`,
    headers: {
        Authorization: cookie.get('token'),
    },
});


export const createProfile = async (formData) => {
    try {

        await Axios.post('/', formData);

        Router.push('/dashboard');
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}


export const addExperience = async (formData) => {
    try {

        await Axios.put('/experience', formData);

        Router.push('/dashboard');
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const addEducation = async (formData) => {
    try {

        await Axios.put('/education', formData);

        Router.push('/dashboard');
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const deleteExperience = async (expId, setExperienceData) => {
    try {

        await Axios.delete(`/experience/${expId}`);
        setExperienceData(prev => prev.filter((exp) => exp._id.toString() !== expId))
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

export const deleteEducation = async (eduId, setEducationData) => {
    try {

        await Axios.delete(`/education/${eduId}`);
        setEducationData(prev => prev.filter((edu) => edu._id.toString() !== eduId))
    } catch (error) {
        const errormsg = catchErrors(error);
        toast.error(errormsg);
    }
}

