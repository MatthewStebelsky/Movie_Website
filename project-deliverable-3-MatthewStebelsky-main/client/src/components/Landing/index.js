import React from 'react';
import './Landing.css'; 

const Landing = () => {
    return (
        <div className="landing-page">
            <header className="header">
                <h1>Welcome to Matthew's Movie Website </h1>
            </header>
            <main className="main-content">
                <section className="hero-section">
                    <h2>Discover all things movies</h2>
                </section>
            </main>
            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Matthew's Movie Company</p>
            </footer>
        </div>
    );
}

export default Landing;
