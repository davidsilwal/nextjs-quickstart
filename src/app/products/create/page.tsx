"use client";

import { ProductToCreateDto } from '@/domain/product/model';
import { createProduct } from '@/domain/product/service';
import { useForm } from 'react-hook-form';

const Form: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProductToCreateDto>();

    const onSubmit = async (data: ProductToCreateDto) => {
        const response = await createProduct(data);

        if (response.status = 201) {
            console.log('created');

        } else {
            console.error('Error submitting form:', response.statusText);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name:</label>
            <input type="text" {...register('title', { required: true })} />
            {errors.title && <span className="error">Title is required</span>}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;