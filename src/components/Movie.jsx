export default function Movie({ movie }) {
    const {posterURL, title} = movie;
    return (
        <>
            <img src={posterURL} alt={title}/>
        </>
    );
}