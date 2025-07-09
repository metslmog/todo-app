import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-purple-100 p-4 w-48 min-h-screen fixed left-0 top-0">
            <div className="flex flex-col gap-1">
                <Link 
                    to="/" 
                    className="text-black no-underline text-sm font-medium p-3 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                    Home
                </Link>
                <Link 
                    to="/project/1" 
                    className="text-black no-underline text-sm font-medium p-3 rounded-md hover:bg-white hover:bg-opacity-10 transition-colors"
                >
                    Project 1
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;