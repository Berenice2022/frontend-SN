import { useForm} from 'react-hook-form'
import { useLikes } from '../context/LikesContext';
import {useNavigate} from 'react-router-dom';

function LikesFormPage() {
    const {handleSubmit} = useForm();
    const {createLike} = useLikes();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) =>{
        createLike(data);
        navigate('/likes');
    });

    return (
        <div className="flex items-center justify-center h-screen">
        <div className='bg-zinc-800 max-w-md w-full p-10 py-2 rounded-md '>
            <form onSubmit={onSubmit}>
                <h1 className='text-3xl font-bold my-2'>Like</h1>
                
               <button className='bg-zinc-700 px-3 py-2 rounded-md'
               type='submit'>Save</button>
            </form>
        </div>
        </div>
    )
}

export default LikesFormPage