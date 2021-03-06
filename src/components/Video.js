import './video.scss';

const Video = ({trailerUrl, title, setTrailerUrl}) => {
    return ( 
        <div className='video'>
            <iframe width="100%" height="100%" border="0" frameBorder="0" title={title}
                src={`https://www.youtube.com/embed/${trailerUrl}`}>
            </iframe>
            {
            setTrailerUrl
            &&  
            <div className="video__close" onClick={() => setTrailerUrl('')} >
                <i class="far fa-times-circle"></i>
            </div>
            }
        </div>
     );
}
 
export default Video;