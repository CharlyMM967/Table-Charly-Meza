export default function PageTitle({ children = 'Empathize. Anticipate. Ideate.', description = 'Designing product experiences that users love and businesses grow.', className = '' }) {
    return (
        <div className={`page-title ${className}`}>
        <h1>{children}</h1>
        <p>{description}</p>
        </div>
    );
}
