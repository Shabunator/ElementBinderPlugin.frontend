import { Link, useRouteError } from 'react-router-dom';
import { RejectedDataType } from '@shared/types';

export const Fallback = () => {
    const error = useRouteError();
    console.log(error);
    const knownError = error as RejectedDataType;

    return (
        <div>
            <h1 className='fallback__img'>Something went wrong</h1>
            <span className='fallback__describe'>
                {knownError?.messageError} {knownError?.status}
            </span>
            <Link to='/' className='fallback__link'>
                Go to home page
            </Link>
        </div>
    );
};
