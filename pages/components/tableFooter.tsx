import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/userSlice';
import { RootState } from '../../redux/store';
import type { fetchUsersType } from '../../redux/userSlice';

const TableFooter = () => {
    const userReducer = useAppSelector((state: RootState) => state.userReducer);
    const dispatch = useAppDispatch();
    const itemsPerPageChangeHandler = (event: any) => {
        if (event.target.value) {
            const fetchUserQuery: fetchUsersType = {
                page: userReducer.page,
                limit: event.target.value
            }
            dispatch(fetchUsers(fetchUserQuery));
        }
    }

    const paginationHandler = (page: number) => {
        // const fetchUserQuery: fetchUsersType = {
        //     page: userReducer.page,
        //     limit: userReducer.itemsPerPage
        // }
        // dispatch(fetchUsers(fetchUserQuery));
    }

    const pages = [];
    for (let i = 1; i <= userReducer.totalUsersCount / userReducer.itemsPerPage; i++) {
        if (i !== userReducer.page) {
            pages.push(<li key={i}>
                <a href="#" onClick={() => paginationHandler(i)} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {i}
                </a>
            </li>);
        } else {
            pages.push(<li>
                <a href="#" aria-current="page" className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i}</a>
            </li>);
        }

    }
    return (
        <nav className="flex justify-between items-center p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">{userReducer.totalUsersCount}</span></span>
            <ul className="inline-flex items-center -space-x-px">
                <li>
                    <a href="#" className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                </li>
                {pages}
                <li>
                    <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </a>
                </li>
            </ul>
            <div className="flex items-center">
                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 mr-5">Items per page</label>
                <select id="countries" onChange={itemsPerPageChangeHandler} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </div>
        </nav>
    )
}

export default TableFooter;