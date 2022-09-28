import Layout from '~/components/common/layout';
import Dashboard from '~containers/dashboard';
import Programs from '~containers/programs';

import { Routes, Route, Link } from 'react-router-dom';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/programs' element={<Programs />} />
      </Routes>
    </Layout>
  );
}

export default App;
