import React from 'react';
import Link from 'next/link';
import Head from 'next/head';


const Layout = ({ children, title, description }) => {
    return (
        <div>
         <Head>
            <title>{title}</title>
            <meta name="description" content={description}/>
        </Head>
            <div className="container">
                <nav>
                    <Link href="/">
                        <a>
                            <span className="main-title">Hacker News</span>
                        </a>
                    </Link>
                </nav>
                {children}
            </div>

            <style>{`
                .container {
                    max-width: 800px;
                    background-color: #f6f6ef;
                    margin: 0 auto;
                }
                nav {
                    background: #f60;
                    padding: 1em;
                }
                nav > * {
                    display: inline-block;
                    color: black;
                }

                nav a {
                    text-decoration: none;
                }

                nav .main-title {
                    font-weight: bold;
                }
            `}</style>
            <style global jsx>{`
               body {
                background: white;
                margin: 0;
                font-family: Verdana, Geneva, sans-serif;
               }
            `}</style>
        </div>
    )
}

export default Layout
