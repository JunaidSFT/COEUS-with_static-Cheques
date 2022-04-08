import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import axios from "axios";
import ReactLoading from "react-loading";
import { Panel, PanelHeader, PanelBody } from './../../components/panel/panel.jsx';
import { Link } from 'react-router-dom';




const TableAll = (props) => {
	
	const data = React.useMemo(
		() => [
		  {
			serial: '1',
			title_rec: 'IZMAH ISRAR',
			cheque_amount: 'One Crore',
			cheque_no: '00000018',
			numeric_amount: '10000000',
			recieving_time: '01-11-2015',
			sig_status: 'pending',
		  },
		  {
			serial: '2',
			title_rec: 'HASNAIN ABBASI',
			cheque_amount: 'Seven Lac Eighty One Thousand Three Hundred Fourty Five',
			cheque_no: '00000020',
			numeric_amount: '781345',
			recieving_time: '19-01-2022',
			sig_status: 'pending',
		  },
		  {
			serial: '3',
			title_rec: 'NEELUM MUNIR',
			cheque_amount: 'Five Lac Fifty Thousand Eight Hundred Twenty',
			cheque_no:'00000011',
			numeric_amount: '550820',
			recieving_time: '27-07-2011',
			sig_status: 'pending',
		  },
		  {
			serial: '4',
			title_rec: 'BILAL SALEEM',
			cheque_amount: 'Five hundred Sixty Thousand',
			cheque_no: '00000014',
			numeric_amount: '560000',
			recieving_time: '15-08-2020',
			sig_status: 'pending',
		  },
		  {
			serial: '5',
			title_rec: 'ALTAF MAZHAR',
			cheque_amount: 'Thirty Seven Thousand Six Hundred Twenty',
			cheque_no: '00000019',
			numeric_amount: '37620',
			recieving_time: '03-06-2023',
			sig_status: 'pending',
		  }
		  
		],
		[]
	);
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
				sortable: true,

			},
          {
            Header: 'Receiver',
            accessor: 'title_rec',
            sortable: true
          },
          {
            Header: 'Amount',
            accessor: 'cheque_amount',
            sortable: true
          },
        ],
      },
      {
        Header: ' ',
        columns: [
          {
            Header: 'Cheque No.',
            accessor: 'cheque_no',
            sortable: true
          },
          {
            Header: 'Amount',
            accessor: 'numeric_amount',
            sortable: true
          },
          {
            Header: 'Cheque Status',
            accessor: 'sig_status',
            sortable: true
          },
		  {
            Header: 'Operation',
            id: "view",
            accessor: ()=> "view",

            Cell: (row) => (
              
              <div>
              <Link to="/detail" className="text-blue"
			  	onClick = {()=> {
					localStorage.setItem("chequeId",row.row.original.cheque_no);
					localStorage.setItem("customerName", row.row.original.title_rec);
					localStorage.setItem("customerAmount", row.row.original.numeric_amount);
					localStorage.setItem("customerAmountWords", row.row.original.cheque_amount);
					localStorage.setItem("customerDate", row.row.original.recieving_time);
					localStorage.setItem("ID", row.row.original._id);
					if (row.row.original.cheque_status === "approved") {
						localStorage.setItem("reasons", JSON.stringify([]));
					}
					else {
						localStorage.setItem("reasons", JSON.stringify(row.row.original.decline_reason));
					}
				  }}
			  >View More </Link>
                      </div>
            )
          }
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

//   const fetchData = React.useCallback(() => {
//     axios({
//       method: "GET",
//       url: "http://3.95.255.194:8080/api/get/all",
//     })
//       .then((response) => {
//         console.log(response.data);
// 		let preData = response.data;
// 		preData.forEach((photo, index) => { photo.serial = index + 1; });
		
//         setData(preData);
// 		setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);
//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);
  
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
  } = useTable({ columns, data, initialState: {pageIndex: 0, sortBy:[{ desc: true }]}}, useSortBy, usePagination)

	 
	return (
		<div>
			
			{loading ?
			<div style = {{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>  
			<ReactLoading width={100} type={"spinningBubbles"} color="#0083ca" />
			</div> :
			<div style = {{margin: '100px 50px 50px 50px', border: '2px solid #b4b4b4'}}>
			<Panel theme="default" >
				<PanelHeader noButton={true}>
					All
				</PanelHeader>
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
															? column.isSortedAesc
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
										<tr {...row.getRowProps()} onClick={() => selectedData(row)} style = {{  background: row.index === selected ? '#F5F8FF' : 'white'}}>
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
			</Panel>
			</div>}
			
		</div>
	)
}

export default TableAll;