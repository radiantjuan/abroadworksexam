import type { NextPage } from 'next'
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { fetchUsers } from '../redux/userSlice';
import TableFooter from './components/tableFooter';


const Home: NextPage = () => {
  const userReducer = useAppSelector((state: RootState) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUsers({
      page: userReducer.page,
      itemsperpage: userReducer.itemsPerPage,
      sortBy: userReducer.sortBy,
      orderSort: userReducer.orderSort
    }));
  }, []);

  const checkAllHandler = (event: any) => {
    if (event.target.checked) {
      document.getElementsByName('checkboxname').forEach((element: any) => {
        element.checked = true;
      });
    } else {
      document.getElementsByName('checkboxname').forEach((element: any) => {
        element.checked = false;
      });
    }
  }

  const checkHandler = (event: any) => {
    const checkboxAll: any = document.getElementById('checkbox-all');
    checkboxAll.checked = false;
  }

  const sortHandler = (sortBy: string) => {
    let orderSort = 'asc';
    if (sortBy === userReducer.sortBy) {
      orderSort = userReducer.orderSort === 'asc' ? 'desc' : 'asc';
    }

    dispatch(fetchUsers({
      page: userReducer.page,
      itemsperpage: userReducer.itemsPerPage,
      sortBy: sortBy,
      orderSort: orderSort
    }));
  }

  const rows = userReducer.userList.map((val: any, key: number) => {
    return (
      <tr key={key} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4 w-4">
          <div className="flex items-center">
            <input id={"checkbox-table-" + key} type="checkbox" onClick={checkHandler} name="checkboxname" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor={"checkbox-table-" + key} className="sr-only" >checkbox</label>
          </div>
        </td>
        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          {val.firstName}
        </th>
        <td className="py-4 px-6">
          {val.lastName}
        </td>
        <td className="py-4 px-6">
          {val.email}
        </td>
      </tr>
    )
  });

  const orderByDirection = (userReducer.orderSort === 'asc') ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block bi bi-caret-up-fill" viewBox="0 0 16 16"> <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" /> </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline-block bi bi-caret-down-fill" viewBox="0 0 16 16"> <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" /></svg>
  )
  return (
    <>
      <div className="sm:container mx-auto my-5">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input id="checkbox-all" type="checkbox" onClick={checkAllHandler} className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6">
                  <a href="#" onClick={() => { sortHandler('firstName') }}>
                    First Name
                    {(userReducer.sortBy === 'firstName') ? orderByDirection : ''}
                  </a>
                </th>
                <th scope="col" className="py-3 px-6">
                  <a href="#" onClick={() => { sortHandler('lastName') }}>
                    Last Name
                    {(userReducer.sortBy === 'lastName') ? orderByDirection : ''}
                  </a>
                </th>
                <th scope="col" className="py-3 px-6">
                  <a href="#" onClick={() => { sortHandler('email') }}>
                    Email
                    {(userReducer.sortBy === 'email') ? orderByDirection : ''}
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                (userReducer.loading) ?
                  <tr>
                    <td className="py-4 px-6">
                      loading...
                    </td>
                  </tr>
                  : rows
              }
            </tbody>
          </table>
          <TableFooter />
        </div>
      </div>
    </>
  )
}

export default Home
