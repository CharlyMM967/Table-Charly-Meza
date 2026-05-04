import Layout from './components/Layout.jsx';
import PageTitle from './components/PageTitle.jsx';
import PortfolioGrid from './components/PortfolioGrid.jsx';
import PostGrid from './components/PostGrid.jsx';
import CasePage from './components/CasePage.jsx';
import { portfolioItems, insightPosts, otherInsightPosts, caseStudies, staticPages } from './data/siteData.js';

function Home() {
  return <div id="content-wrapper"><div className="container"><div className="row"><div className="col-sm-12"><PageTitle description="Designing scalable product experiences through research, strategy and UX." /><PortfolioGrid items={portfolioItems} /></div></div></div></div>;
}

function Insights({ other = false }) {
  const posts = other ? otherInsightPosts : insightPosts;

  return (
    <div id="content-wrapper">
      <div className="container">
        <PageTitle className="has-description" />

        <PostGrid posts={posts} />

        <ul className="post-nav clearfix text-center">
          <li className={`post-number ${!other ? "active" : ""}`}>
            <a href="/insights.html">
              <span>1</span>
            </a>
          </li>

          <li className={`post-number ${other ? "active" : ""}`}>
            <a href="/insights-case.html">
              <span>2</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function StaticPage({ html }) {
  return <div id="content-wrapper" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Page() {
  const path = window.location.pathname === '/' ? '/index.html' : window.location.pathname;
  const caseItem = caseStudies.find((item) => item.slug === path);

  if (caseItem) return <CasePage item={caseItem} />;
  if (path === '/insights.html') return <Insights />;
  if (path === '/insights-case.html') return <Insights other />;
  if (staticPages[path]) return <StaticPage html={staticPages[path]} />;
  return <Home />;
}

export default function App() {
  return <Layout><Page /></Layout>;
}
