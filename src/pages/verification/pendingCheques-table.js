import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table'
import { Panel, PanelBody } from './../../components/panel/panel.jsx';
import axios from "axios";
import ReactLoading from "react-loading";



const dummyData = [
	{
		serial: '1',
		title_rec: 'muhammad',
		recieving_time: '13:20',
		cheque_status: 'pending',

	},
]


const TablePendingCheques = (props) => {
	const data = React.useMemo(
		() => [
		  {
			serial: '1',
			title_rec: 'IZMAH ISRAR',
			recieving_time: '01-11-2015',
			cheque_status: 'pending',
		  },
		  {
			serial: '2',
			title_rec: 'HASNAIN ABBASI',
			recieving_time: '19-01-2022',
			cheque_status: 'pending',
		  },
		  {
			serial: '3',
			title_rec: 'NEELUM MUNIR',
			recieving_time: '27-07-2011',
			cheque_status: 'pending',
		  },
		  {
			serial: '4',
			title_rec: 'BILAL SALEEM',
			recieving_time: '15-08-2020',
			cheque_status: 'pending',
		  },
		  {
			serial: '5',
			title_rec: 'ALTAF MAZHAR',
			recieving_time: '03-06-2023',
			cheque_status: 'pending',
		  }
		  
		],
		[]
	)
	
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(null);
	const columns = React.useMemo(
		() => [
		  {
			Header: ' ',
			columns: [
				{
					Header: 'S.no',
					accessor: 'serial',
					
					
				  },
			  {
				Header: 'Receiver',
				accessor: 'title_rec',
				sortable: true
			  },
			  {
				Header: 'Receiving Time',
				accessor: 'recieving_time',
		
				sortable: true
			  },
			],
		  },
		  {
			Header: ' ',
			columns: [
			  {
				Header: 'Sign Status',
				accessor: 'cheque_status',
				sortable: true
			  },
			],
		  },
		],
		[]
	  );
	const selectedData = (row) => {
		setSelected(row.index);
		console.log(row.original);
		props.parentCallback(row);
  	}
  	// const fetchData = React.useCallback(() => {
    // 	axios({
	// 		method: "GET",
	// 		url: 'http://34.125.195.139:8090/api/get/pending',
   	// 	})
    //   .then((response) => {
    //     console.log(response.data);
	// 	let preData = response.data;
	// 	preData.forEach((photo, index) => { photo.serial = index + 1; });
		
    //     setData(preData);
	// 	setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  	// }, []);
	// useEffect(() => {
    // 	fetchData();
  	// }, [fetchData]);
//   const data = React.useMemo(() => makeData(200), []);
//   data.forEach((photo, index) => { photo.serial = index + 1; });
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data }, useSortBy, usePagination)

	 
	return (
		<div>
			{loading ?
			<div>  
			<ReactLoading width={50} type={"spinningBubbles"} color="#0083ca" />
			</div> :
			<Panel theme="default" >
				<div class="table-responsive">
					<table class="table" {...getTableProps()}>
						<thead>
							{headerGroups.map(headerGroup => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map(column => (
										<th className="width-150" {...column.getHeaderProps(column.getSortByToggleProps())}>
											<div class="d-flex" style={{minWidth: '150px'}}>
												<span>{column.render('Header')}</span>
												<span class="ml-auto">
													{column.sortable ?
														column.isSorted
															? column.isSortedDesc
																? <i className="fa fa-sort-down fa-fw f-s-14 text-blue"></i>
																: <i className="fa fa-sort-up fa-fw f-s-14 text-blue"></i>
															: <i className="fa fa-sort fa-fw f-s-14 opacity-3"></i>
														: ''}
												</span>
											</div>
										</th>
									))}
								</tr>
							))}
					 </thead>
					 <tbody {...getTableBodyProps()}>
							{page.map(
								(row, i) => {
									prepareRow(row);
									return (
										<tr {...row.getRowProps()}onClick={() => selectedData(row)} style = {{  background: row.index === selected ? '#F5F8FF' : 'white'}}>
											{row.cells.map(cell => {
												return (
													<td {...cell.getCellProps()}>{cell.render('Cell')}</td>
												)
											})}
										</tr>
									)}
							)}
					 </tbody>
				 </table>
			 </div>
			 <hr class="m-0" />
			 <PanelBody>
			 	<div class="d-flex align-items-center justify-content-center">
					<ul className="pagination mb-0">
						<li className="page-item"><button className="page-link" onClick={() => gotoPage(0)} disabled={!canPreviousPage}><i className="fa fa-angle-double-left"></i></button></li>
						<li className="page-item"><button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage}><i className="fa fa-angle-left"></i></button></li>
						<li className="page-item d-flex align-items-center px-2">
							<div>Page <strong>{pageIndex + 1} of {pageOptions.length}</strong></div>
						</li>
						<li className="page-item"><button className="page-link" onClick={() => nextPage()} disabled={!canNextPage}><i className="fa fa-angle-right"></i></button></li>
						<li className="page-item"><button className="page-link" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><i className="fa fa-angle-double-right"></i></button></li>
					</ul>
					<div class="ml-3 mr-1">Go to page:</div>
					<div class="width-50 mx-2">
						<input className="form-control" type="number" defaultValue={pageIndex + 1}
								onChange={e => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0
									gotoPage(page)
								}}
							/>
					</div>
					<div>
						<select
							className="form-control"
							value={pageSize}
							onChange={e => {
								setPageSize(Number(e.target.value))
							}}
						>
							{[5, 10, 20, 30, 40, 50].map(pageSize => (
								<option key={pageSize} value={pageSize}>
									Show {pageSize}
								</option>
							))}
						</select>
					</div>
				</div>
			 </PanelBody>
			</Panel>}
		</div>
	)
}

export default TablePendingCheques;