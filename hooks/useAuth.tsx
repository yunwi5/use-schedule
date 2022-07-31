import React, { useDebugValue, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { getLoginLink } from '../utilities/link-utils';

const useAuth = () => {
    const router = useRouter();

    const { user, isLoading, error } = useUser();
    useDebugValue([user, isLoading]);
    if (error) console.log('error:', error);

    useEffect(() => {
        // console.log('user:', user);
        if (!user && !isLoading) {
            router.replace(getLoginLink());
        }
    }, [user, isLoading, router]);

    return { user, isLoading };
};

export default useAuth;
