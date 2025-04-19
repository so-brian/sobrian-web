import Link from "next/link";

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-base-100 shadow-md">
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <Link className="btn btn-ghost text-xl" href="/">MyApp</Link>
                </div>
                <div className="flex-none">
                    <a className="btn btn-ghost" href="/about">About</a>
                    <a className="btn btn-ghost" href="/contact">Contact</a>
                </div>
            </div>
        </header>
    );
};

export default Header;
