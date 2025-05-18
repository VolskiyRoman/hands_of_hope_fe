import React from 'react'
import Layout from 'containers/Layout'
import InfoCard from 'components/Cards/InfoCard'
import { articles } from 'data/articles'

function ArticlesPage() {
    return (
        <Layout>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map(({ title, image, link }) => (
                    <InfoCard key={title} title={title} image={image} link={link} />
                ))}
            </div>
        </Layout>
    )
}

export default ArticlesPage
