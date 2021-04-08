import './video.scss';

const Video = ({trailerUrl, title}) => {
    return ( 
        <div className='video'>
            <iframe width="100%" height="100%" border="0" frameBorder="0" title={title}
                src={`https://www.youtube.com/embed/${trailerUrl}`}>
            </iframe>
        </div>
     );
}
 
export default Video;