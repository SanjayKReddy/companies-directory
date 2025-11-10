import React, { useState, useEffect } from 'react';
import companiesData from './data/companies.json';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
} from '@mui/material';

function App() {
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ name: '', location: '', industry: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      const isError = false;
      if (isError) {
        setError('Failed to load data');
        setCompanies([]);
      } else {
        setCompanies(companiesData);
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const locations = [...new Set(companiesData.map(c => c.location))];
  const industries = [...new Set(companiesData.map(c => c.industry))];

  let filteredCompanies = companies.filter((company) => {
    return (
      company.name.toLowerCase().includes(filters.name.toLowerCase()) &&
      (filters.location === '' || company.location === filters.location) &&
      (filters.industry === '' || company.industry === filters.industry)
    );
  });

  if (sortKey) {
    filteredCompanies = filteredCompanies.sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey])
    );
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortChange = (e) => {
    setSortKey(e.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ paddingTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Companies Directory
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Search by name"
          variant="outlined"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          disabled={loading}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <FormControl sx={{ minWidth: 140 }} disabled={loading}>
          <InputLabel>Location</InputLabel>
          <Select name="location" value={filters.location} onChange={handleFilterChange} label="Location">
            <MenuItem value="">
              <em>All Locations</em>
            </MenuItem>
            {locations.map((loc) => (
              <MenuItem key={loc} value={loc}>
                {loc}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }} disabled={loading}>
          <InputLabel>Industry</InputLabel>
          <Select name="industry" value={filters.industry} onChange={handleFilterChange} label="Industry">
            <MenuItem value="">
              <em>All Industries</em>
            </MenuItem>
            {industries.map((ind) => (
              <MenuItem key={ind} value={ind}>
                {ind}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }} disabled={loading}>
          <InputLabel>Sort by</InputLabel>
          <Select value={sortKey} onChange={handleSortChange} label="Sort by">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="location">Location</MenuItem>
            <MenuItem value="industry">Industry</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Industry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No companies found.
                </TableCell>
              </TableRow>
            ) : (
              filteredCompanies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{company.location}</TableCell>
                  <TableCell>{company.industry}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </Container>
  );
}

export default App;
