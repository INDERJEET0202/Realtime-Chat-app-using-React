import React, { useState, useEffect } from 'react';

function BackendStatus() {
    const [isBackendUp, setIsBackendUp] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const local_func = async () => {
            const response = await fetch("http://localhost:4000");
            if (response.status === 200) {
                setIsBackendUp(true);
                setLoading(true);
            }
            setLoading(false);
        }
        local_func();
    }, []);


    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            {isBackendUp ? (show &&
                <p style={{ textAlign: 'center', padding: '10px', fontSize: '14px', color: 'green' }}>Backend is up & running</p>
            ) : (
                <p style={{ textAlign: 'center', padding: '10px', fontSize: '14px', color: 'red' }}>Backend is Down. Please try again after some time or try informing the admin.</p>
            )}
        </div>
    );
}

export default BackendStatus;
