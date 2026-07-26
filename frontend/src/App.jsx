import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home";
import Tutors from "./pages/Tutors";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MySessions from "./pages/MySessions";
import Session from "./pages/Session";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Ai from "./pages/ai";
import { useLocation } from "react-router-dom";
import AIHeader from "./components/AI/AIHeader";

export default function App() {
    const location = useLocation();
    const isAIPage = location.pathname === "/ai";
    return (
        <main className=" overflow-hidden bg-light text-tertiary">
            <ToastContainer position="bottom-right" />
            {isAIPage ? <AIHeader /> : <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tutors" element={<Tutors />} />
                <Route path="/tutors/:subject" element={<Tutors />} />
                <Route path="/ai" element={ <Ai />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/my-profile" element={<MyProfile />} />
                <Route path="/my-sessions" element={<MySessions />} />
                <Route path="/sessions/:tutId" element={<Session />} />
                <Route path="/verify" element={<Verify />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            {!isAIPage && <Footer />}
        </main>
    )
}