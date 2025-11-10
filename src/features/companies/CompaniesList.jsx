import React, { useState, useEffect } from 'react';
import {
  Box, Paper, Typography, Fade, Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
  TextField, Select, MenuItem, FormControl, InputLabel, Pagination
} from '@mui/material';

const accentColor = "#1976d2"; // Blue for headings
const subtitleColor = "#7b1fa2"; // Purple for subtitle

function CompaniesList({ data }) {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ name: '', location: '', industry: '' });
  const [sortKey, setSortKey] = useState('');
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    if (data) setCompanies(data);
  }, [data]);

  // Unique filter dropdown options
  const locations = [...new Set(companies.map(c => c.location))];
  const industries = [...new Set(companies.map(c => c.industry))];

  // Filtering
  let filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    (filters.location === '' || company.location === filters.location) &&
    (filters.industry === '' || company.industry === filters.industry)
  );
  // Sorting
  if (sortKey) {
    filteredCompanies = filteredCompanies.slice().sort((a, b) =>
      a[sortKey]?.localeCompare(b[sortKey])
    );
  }
  // Pagination
  const count = Math.ceil(filteredCompanies.length / rowsPerPage);
  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  // Handlers
  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPage(1);
  };
  const handleSortChange = e => {
    setSortKey(e.target.value);
    setPage(1);
  };
  const handlePageChange = (_, value) => setPage(value);

  return (
    <Box sx={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)"
    }}>
      <Paper elevation={8} sx={{
        p: 4,
        minWidth: 900,
        maxWidth: "95vw",
        mx: "auto",
        textAlign: "center",
        borderRadius: 4,
        boxShadow: 8,
        background: "white"
      }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            mb: 1,
            letterSpacing: 3,
            color: accentColor,
            fontFamily: "'Roboto Slab', 'Montserrat', 'sans-serif'",
            textShadow: "1px 2px 6px #90caf9"
          }}>
          Companies Directory
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mb: 4,
            color: subtitleColor,
            fontFamily: 'Montserrat, Arial, sans-serif',
            fontWeight: 500,
            letterSpacing: 1.5
          }}>
          Engaging, searchable, and filterable list of top companies
        </Typography>
        {/* Controls */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center',
          justifyContent: "center",
          mb: 3,
          minWidth: 700
        }}>
          <TextField
            label="Search by name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            variant="outlined"
            size="small"
            sx={{
              bgcolor: "#fafafa", borderRadius: 2, minWidth: 185,
              boxShadow: "0px 1px 2px #e0e0e0"
            }}
            InputProps={{
              style: { fontSize: 16 }
            }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 170, zIndex: 2 }}>
            <InputLabel>Location</InputLabel>
            <Select
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              MenuProps={{
                PaperProps: { sx: { zIndex: 9999 } }
              }}
            >
              <MenuItem value="">All Locations</MenuItem>
              {locations.map(loc => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 170, zIndex: 2 }}>
            <InputLabel>Industry</InputLabel>
            <Select
              label="Industry"
              name="industry"
              value={filters.industry}
              onChange={handleFilterChange}
              MenuProps={{
                PaperProps: { sx: { zIndex: 9999 } }
              }}
            >
              <MenuItem value="">All Industries</MenuItem>
              {industries.map(ind => (
                <MenuItem key={ind} value={ind}>{ind}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 130 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              label="Sort by"
              value={sortKey}
              onChange={handleSortChange}
            >
              <MenuItem value="">Sort by</MenuItem>
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="location">Location</MenuItem>
              <MenuItem value="industry">Industry</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* Animated Table */}
        <Fade in timeout={600}>
          <div>
            {paginatedCompanies.length === 0 ? (
              <Typography sx={{ mt: 3, color: 'error.main' }}>No companies found.</Typography>
            ) : (
              <TableContainer component={Paper} sx={{ boxShadow: 2 }}>
                <Table>
                  <TableHead sx={{ bgcolor: accentColor + "22" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 700, fontSize: 17 }}>Industry</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCompanies.map(company => (
                      <TableRow
                        key={company.id}
                        sx={{
                          transition: 'background 0.2s',
                          '&:hover': { background: "#e3f2fd" }
                        }}>
                        <TableCell>{company.name}</TableCell>
                        <TableCell>{company.location}</TableCell>
                        <TableCell>{company.industry}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </Fade>
        {/* Pagination */}
        {count > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination count={count} page={page} onChange={handlePageChange}
              sx={{
                '& .Mui-selected': { bgcolor: accentColor, color: 'white' },
                '& .MuiPaginationItem-root': { borderRadius: '50%' }
              }} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
export default CompaniesList;