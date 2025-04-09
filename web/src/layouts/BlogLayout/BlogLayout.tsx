import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

import { useAuth } from 'src/auth';

type BlogLayoutProps = {
    children?: React.ReactNode;
};

const BlogLayout = ({ children }: BlogLayoutProps) => {
    const { isAuthenticated, currentUser, logOut } = useAuth();
    return (
        <>
            <Toaster />

            <header className="relative flex justify-between items-center py-6 px-8 bg-blue-600 text-white shadow-lg">
                <h1 className="text-xl font-extrabold leading-none tracking-tight ">
                    <Link className="text-yellow-400" to={routes.home()}>
                        Redwood Blog
                    </Link>
                </h1>

                <nav className="flex items-end space-x-2 flex-col relative">
                    <ul className="m-0 gap-6 [&_li]:m-0 flex">
                        <li>
                            <Link to={routes.home()}>Home</Link>
                        </li>
                        <li>
                            <Link to={routes.about()}>About</Link>
                        </li>
                        <li>
                            <Link to={routes.contact()}>Contact</Link>
                        </li>
                        <li>|</li>
                        <li>
                            {isAuthenticated ? (
                                <button type="button" onClick={logOut}>
                                    Logout
                                </button>
                            ) : (
                                <Link to={routes.login()}>Login</Link>
                            )}
                        </li>
                    </ul>

                    {isAuthenticated && (
                        <span className="font-light text-[10px] text-gray-200/80 absolute -bottom-3 right-0">
                            (Logged in as: {currentUser?.email})
                        </span>
                    )}
                </nav>
            </header>

            <main className="px-8 py-4">{children}</main>
        </>
    );
};

export default BlogLayout;
