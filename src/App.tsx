import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import GradeList from './pages/GradeList';
import GradeDetail from './pages/GradeDetail';
import ChapterView from './pages/ChapterView';
import Converter from './pages/Converter';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kutuphane" element={<GradeList />} />
          <Route path="/sinif/:gradeId" element={<GradeDetail />} />
          <Route path="/sinif/:gradeId/bolum/:chapterId" element={<ChapterView />} />
          <Route path="/donusturucu" element={<Converter />} />
        </Routes>
      </Layout>
    </Router>
  );
}


