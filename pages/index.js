import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import Link from 'next/link'
import StoryList from '../components/StoryList';
import Layout from '../components/Layout';

export class Index extends Component {

    static async getInitialProps({ req, res, query }) {
        let stories;
        let page = Number(query.page) || 1;
    
        try {
            const res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`)
            stories = await res.json();

        } catch (error) {
            console.log(error);
            stories = [];
        }

        return { stories, page };
    }


    render() {
        const { stories, page } = this.props;
        if(stories.length === 0 ) {
            return <Error statusCode={503}/>
        }
        return (
            <Layout title="Hacker News" description="A hacker news">
                <StoryList stories={stories}/>
               <footer>
               <Link href={`/?page=${page + 1}`}>
                    <a>Next Page ({ page + 1 })</a>
                </Link>
               </footer>
                <style jsx>{`
                   footer {
                       padding: 1em;
                   }

                   footer a {
                       font-weight: bold;
                       text-decoration: none;
                       color: black;
                   }
                    
                   footer a:hover {
                       text-decoration: underline;
                   }
                `}</style>
            </Layout>
        )
    }
}

export default Index;
