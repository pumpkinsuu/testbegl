import { useForm } from 'react-hook-form';
import {GetData} from "./api";


export default function Search({setData}) {
    const {
        register,
        handleSubmit,
    } = useForm();
    const onSubmit = (data) => {
        GetData(data.query.toLocaleLowerCase()).then(users => setData(users))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('query')} />
            <input type="submit" value="Search" />
        </form>
    );
};