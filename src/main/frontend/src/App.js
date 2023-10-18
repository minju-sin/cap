import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Home 컴포넌트를 import
import Login from './components/Login'; // Login 컴포넌트를 import
import SignUp from "./components/SignUp"; // SignUp 컴포넌트를 import
import Profile from "./components/user/Profile"; // Profile 컴포넌트를 import
import Management from "./components/admin/Management"; // Management 컴포넌트를 import
import Board from "./components/user/board/Board"; // Board 컴포넌트를 import
import BoardDetail from "./components/user/board/BoardDetail"; // Board 컴포넌트를 import
import BoardShow from "./components/user/board/BoardShow"; // Board 컴포넌트를 import
import Notice from "./components/admin/Notice"; // Notice 컴포넌트를 import


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/management" element={<Management />} />
                <Route path="/board" element={<Board />} />
                <Route path="/boardDetail" element={<BoardDetail />} />
                <Route path="/BoardShow" element={<BoardShow />} />
                <Route path="/notice" element={<Notice />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
