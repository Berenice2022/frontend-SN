import { useForm} from 'react-hook-form'
import { useInfoProfiles } from '../context/InfoProfilesContext';
import {useNavigate, useParams} from 'react-router-dom';
import { useEffect } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc)

function InfoProfilesFormPage() {
    const {register, handleSubmit, setValue, formState:{errors}} = useForm();
    const {createInfoProfile, getInfoProfile,updateInfoProfile} = useInfoProfiles();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        async function loadtInfoProfile(){
            if(params.id){
                const infoprofile = await getInfoProfile(params.id);
                console.log(infoprofile);
                setValue('fullname',infoprofile.fullname);
                //console.log(dayjs(infoprofile.birthdate).utc().format('YYYY-MM-DD'))
                setValue('birthdate',dayjs(infoprofile.birthdate).utc().format('YYYY-MM-DD'));
                setValue('gender',infoprofile.gender);
                setValue('civil_status',infoprofile.civil_status);
                setValue('phone_number',infoprofile.phone_number);
                setValue('job',infoprofile.job);
                setValue('description_personal',infoprofile.description_personal);
            }
        }
        loadtInfoProfile();
        //console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = handleSubmit((data) =>{
        const dataValid = {
            ...data, 
            birthdate: data.birthdate ? dayjs.utc(data.birthdate).format() : dayjs.utc().format(),
        };
        //console.log(dataValid);
        if(params.id){
            //updateInfoProfile(params.id, data);
            updateInfoProfile(params.id, dataValid);
        }else{
            //createInfoProfile(data);
            createInfoProfile(dataValid);
        }
        navigate('/infoprofiles');
    });

    return (
        <div className="flex items-center justify-center h-screen">
        <div className='bg-zinc-800 max-w-md w-full p-10 py-2 rounded-md '>
            <form onSubmit={onSubmit}>
                <h1 className='text-3xl font-bold my-2'>Information Profile</h1>

                <label htmlFor='fullname'>FullName</label>
                <input 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="text" 
                placeholder="Full Name"
                required  
                {...register('fullname',{required:true})}
                autoFocus
                />
                {errors.fullname && (<div className='text-red-500'>The fullname is required</div>)}

                <label htmlFor='birthdate'>Birthdate</label>
                <input 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="date"
                placeholder="Birthdate"
                {...register('birthdate',{required:true})}
                />
                {errors.birthdate && (<div className='text-red-500'>The birthsate is required</div>)}
                
                <label htmlFor='gender'>Gender</label>
                <input 
                required
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="text"
                placeholder="Gender"
                {...register('gender',{required:true})}
                />
                {errors.gender && (<div className='text-red-500'>The gender is required</div>)}
                
                <label htmlFor='civil_status'>Civil Status</label>
                <input 
                required
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="text"
                placeholder="Civil Status"
                {...register('civil_status',{required:true})}
                />
                {errors.civil_status && (<div className='text-red-500'>The civil status is required</div>)}

                <label htmlFor='phone_number'>Phone Number</label>
                <input 
                required
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="tel"
                placeholder="Phone number"
                {...register('phone_number',{required:true})}
                />
                {errors.phone_number && (<div className='text-red-500'>The phone_number is required</div>)}

                <label htmlFor='job'>Job</label>
                <input 
                required
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="text"
                placeholder="Job"
                {...register('job',{required:true})}
                />
                {errors.job && (<div className='text-red-500'>The job is required</div>)}

                <label htmlFor='description_personal'>Description Personal</label>
                <input 
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' 
                type="text"
                placeholder="Description Personal"
                {...register('description_personal',{required:true})}
                />
                {errors.description_personal && (<div className='text-red-500'>The description_personalis required</div>)}
                
               <button className='bg-zinc-700 px-3 py-2 rounded-md'
               type='submit'>Save</button>
               {/*<button className='bg-zinc-900 p-10 px-3 py-2 rounded-md' 
                onClick={() =>{'/infoprofiles'}}>
                Cancel</button>*/}
            </form>
        </div>
        </div>
    )
}

export default InfoProfilesFormPage