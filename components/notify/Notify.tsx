import { DataContext } from '@/utils/store/golobalState';
import { useContext, useEffect } from 'react'
import Loading from '../loading/loading';
import Toast from '../toast/toast';

const Notify = () => {
    const { state, dispatch }: any = useContext(DataContext)
    const { notify } = state

    // settimeout to close Toast
    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch({ type: 'NOTIFY', payload: {} })
        }, 3000);
        return () => clearTimeout(timer);
    }, [notify]);

    return (
        <>
            {notify.loading && <Loading />}
            {notify.error &&
                <Toast
                    msg={{ msg: notify.error, title: "Error" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-danger"
                />
            }

            {notify.success &&
                <Toast
                    msg={{ msg: notify.success, title: "Success" }}
                    handleShow={() => dispatch({ type: 'NOTIFY', payload: {} })}
                    bgColor="bg-success"
                />
            }
        </>
    )
}


export default Notify
