import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useFetch(url:string): {estate:any, error: string | null, loading: boolean} {
    const [ estate, setEstate ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(
        () => {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const res = await axios.get(url);
                    setEstate(res.data.data);
                    setLoading(false);
                } catch (error: any) {
                    setError(error);
                    setLoading(false);
                }
            };
            fetchData();
        },
        [ url ]
    );

    return { estate, error, loading };
}
