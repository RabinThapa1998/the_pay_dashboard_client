import { Layout } from '~/components';
import { Dashboard, Programs } from '~/containers';

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
