import companiesData from './data/companies.json';
import CompaniesList from './features/companies/CompaniesList';

function App() {
  return <CompaniesList data={companiesData} />;
}
export default App;
