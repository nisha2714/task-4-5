import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField } from '@mui/material';


// Static JSON data
const customersData = [
  { id: 1, customer: 'Branson Weimann', lastSeen: '08/08/2020', orders: 2, totalSpent: '295.31 SUS', latestPurchase: '27/11/2019 à 13:12:25', segment: 'Regular', news: true },
  { id: 2, customer: 'Anna Bruen', lastSeen: '08/08/2020', orders: 1, totalSpent: '647,91 SUS', latestPurchase: '07/06/2020 à 07:48:18', segment: 'x', news: false },
  { id: 3, customer: 'Gudrun Tromp', lastSeen: '08/05/2020', orders: 0, totalSpent: '0,00 SUS', latestPurchase: '', segment: '', news: true },
  { id: 4, customer: 'Florencio Roob', lastSeen: '08/05/2020', orders: 0, totalSpent: '0,00 SUS', latestPurchase: '', segment: '', news: false },
  { id: 5, customer: 'Maddison Torp', lastSeen: '09/05/2020', orders: 0, totalSpent: '0,00 SUS', latestPurchase: '', segment: '', news: true },
  { id: 6, customer: 'Rashawn Boor', lastSeen: '09/05/2020', orders: 3, totalSpent: '693,50 SUS', latestPurchase: '19/06/2020 à 10:03:18', segment: '', news: true },
  { id: 7, customer: 'Both Hill', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00 SUS', latestPurchase: '', segment: '', news: false },
  { id: 8, customer: 'Brandyn Hooger', lastSeen: '08/08/2020', orders: 1, totalSpent: '0,00 SUS', latestPurchase: '', segment: '', news: true },
  { id: 9, customer: 'Rey Schuster', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00 $US', latestPurchase: '', segment: '', news: false },
  { id: 10, customer: 'Jakob Armstrong', lastSeen: '08/08/2020', orders: 0, totalSpent: '0,00 $US', latestPurchase: '', segment: '', news: true },
  { id: 11, customer: 'Janao Glover', lastSeen: 'DB/DB/2020', orders: 0, totalSpent: '0,00 SUS', latestPurchase: '', segment: 'Regular', news: false },
  { id: 12, customer: 'Dina Tillman', lastSeen: 'OB/DB/2020', orders: 0, totalSpent: '0,00 $US', latestPurchase: '', segment: '', news: true }
];

function DataGridComponent() {
  // State for each filter
  const [filters, setFilters] = useState({
    customer: '',
    lastSeen: '',
    orders: '',
    totalSpent: '',
    latestPurchase: '',
    segment: '',
    news: '',
  });

  // Handle filter change for each field
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  // Filter data based on input from each filter field
  const filteredData = customersData.filter((customer) => {
    return (
      customer.customer.toLowerCase().includes(filters.customer.toLowerCase()) &&
      customer.lastSeen.includes(filters.lastSeen) &&
      String(customer.orders).includes(filters.orders) &&
      customer.totalSpent.includes(filters.totalSpent) &&
      customer.latestPurchase.includes(filters.latestPurchase) &&
      customer.segment.toLowerCase().includes(filters.segment.toLowerCase()) &&
      (filters.news === '' || String(customer.news).toLowerCase() === filters.news.toLowerCase())
    );
  });

  // Define columns for the DataGrid
  const columns = [
    { field: 'customer', headerName: 'Customer', width: 200 },
    { field: 'lastSeen', headerName: 'Last Seen', width: 150 },
    { field: 'orders', headerName: 'Orders', width: 100, sortable: true },
    { field: 'totalSpent', headerName: 'Total Spent', width: 150, sortable: true },
    { field: 'latestPurchase', headerName: 'Latest Purchase', width: 200, sortable: true },
    { field: 'segment', headerName: 'Segment', width: 120, sortable: true },
    {
      field: 'news',
      headerName: 'News',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return params.value ? '✅' : '❌'; // Show emoji based on the news value
      }
    },
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <h2>Customer DataGrid with Filters</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <TextField
          label="Customer"
          variant="outlined"
          name="customer"
          value={filters.customer}
          onChange={handleFilterChange}
        />
        <TextField
          label="Last Seen"
          variant="outlined"
          name="lastSeen"
          value={filters.lastSeen}
          onChange={handleFilterChange}
        />
        <TextField
          label="Orders"
          variant="outlined"
          name="orders"
          value={filters.orders}
          onChange={handleFilterChange}
        />
        <TextField
          label="Total Spent"
          variant="outlined"
          name="totalSpent"
          value={filters.totalSpent}
          onChange={handleFilterChange}
        />
        <TextField
          label="Latest Purchase"
          variant="outlined"
          name="latestPurchase"
          value={filters.latestPurchase}
          onChange={handleFilterChange}
        />
        <TextField
          label="Segment"
          variant="outlined"
          name="segment"
          value={filters.segment}
          onChange={handleFilterChange}
        />
        <TextField
          label="News (true/false)"
          variant="outlined"
          name="news"
          value={filters.news}
          onChange={handleFilterChange}
        />
      </div>

      {/* DataGrid with filter functionality */}
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        sortingOrder={['asc', 'desc']}
      />
    </div>
  );
}

export default DataGridComponent;
