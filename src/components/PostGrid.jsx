export default function PostGrid({ posts }) {
    return (
        <div className="post-list row">
        {posts.map((post) => (
            <article className="post col-md-4" key={`${post.href}-${post.title}`}>
            <div className="post-img-wrap"><a href={post.href} className="post-img"><img src={post.image} alt="" /></a></div>
            <div className="post-content-wrap"><div className="post-content">
                <h2 className="post-title"><a href={post.href}>{post.title}</a></h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-btn"><a href={post.href}><span className="link">View case →</span></a></div>
            </div></div>
            </article>
        ))}
        </div>
    );
}
