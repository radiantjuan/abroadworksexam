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
                page: 1,
                itemsperpage: event.target.value,
                sortBy: userReducer.sortBy,
                orderSort: userReducer.orderSort
            }
            dispatch(fetchUsers(fetchUserQuery));
        }
    }

    const paginationHandler = (page: number) => {
        const fetchUserQuery: fetchUsersType = {
            page: page,
            itemsperpage: userReducer.itemsPerPage,
            sortBy: userReducer.sortBy,
            orderSort: userReducer.orderSort
        }
        dispatch(fetchUsers(fetchUserQuery));
    }

    const pages = [];
    for (let i = 1; i <= Math.ceil(userReducer.totalUsersCount / userReducer.itemsPerPage); i++) {
        if (i !== userReducer.page) {
            pages.push(<li key={i}>
                <a href="#" onClick={() => paginationHandler(i)} className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {i}
                </a>
            </li>);
        } else {
            pages.push(<li key={i}>
                <a href="#" aria-current="page" className="z-10 py-2 px-3 leading-tight text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">{i}</a>
            </li>);
        }
    }
    const pageMultipliedByItemsPerPage = userReducer.page * userReducer.itemsPerPage;
    const showingCurrent = ((pageMultipliedByItemsPerPage) + 1) - userReducer.itemsPerPage;
    const showingCurrentTo = ((pageMultipliedByItemsPerPage) >= userReducer.totalUsersCount)
        ? userReducer.totalUsersCount
        : pageMultipliedByItemsPerPage;
    return (
        <nav className="flex justify-between items-center p-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{showingCurrent}-{showingCurrentTo}</span> of <span className="font-semibold text-gray-900 dark:text-white">{userReducer.totalUsersCount}</span></span>
            {
                (userReducer.itemsPerPage > userReducer.totalUsersCount)
                    ? ''
                    : (
                        <ul className="inline-flex items-center -space-x-px">
                            {
                                (userReducer.page > 1) ?
                                    (<li>
                                        <a href="#" className="block disabled py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => paginationHandler(userReducer.page - 1)}>
                                            <span className="sr-only">Previous</span>
                                            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        </a>
                                    </li>) : ''
                            }
                            {pages}
                            {
                                ((pageMultipliedByItemsPerPage) <= userReducer.totalUsersCount) ?
                                    (
                                        <li>
                                            <a href="#" className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => paginationHandler(userReducer.page + 1)}>
                                                <span className="sr-only">Next</span>
                                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                            </a>
                                        </li>
                                    ) : ''
                            }

                        </ul>
                    )
            }
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