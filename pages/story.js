import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Link from 'next/link';
import Error from 'next/error';
import Layout from '../components/Layout';

export class Story extends Component {

    static async getInitialProps({ req, res, query }) {

        let story;
       
        try {
            let storyId = query.id;
            const res = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`);
            story = await res.json();
            
        } catch (error) {
            console.log(error);
            story = null;
        }

        return { story }
    }


    render() {
        
        const { story } = this.props;

        if(!story) {
            return <Error statusCode={503}/>
        }
        
        return (
            <Layout>
                <main>
                    <h1 className="story-title"><a href={story.url}>{story.title}</a></h1>
                    <div className="story-details">
                        <strong>{ story.points } Points</strong>
                        <strong>{ story.comments_count } Comments </strong>
                        <strong>{ story.time_ago }</strong>
                    </div>
                </main>

                <style jsx>{`
                    main {
                        padding: 1em;
                    }
                    .story-title {
                        font-size: 1.2 rem;
                        font-weight: 300;
                        margin: 0;
                        padding-bottom: 0.5em;
                    }

                    .story-title a {
                        text-decoration: none;
                        color: #333
                    }

                    .story-title a:hover {
                        text-decoration: underline;
                    }

                    .story-details {
                        font-size: 0.8 rem;
                        padding-bottom: 1em;
                        border-bottom: 1px solid rgba(0,0,0,0.1);
                        margin-bottom: 1em;
                    }

                    .story-details strong {
                        margin-right: 1em;
                    }

                    .story-details a {
                        color: #f60;
                    }


                `}</style>
            </Layout>
        )
    }
}


export default Story;
