import Card from 'react-bootstrap/Card';
import imageCompression from "browser-image-compression";

const ImageCompresser = ({
    originalImage,
    originalLink,
    uploadImage,
    outputFileName,
    compressedLink,
    setCompressedLink,
    handle,
    clicked
}) => {

    const changeValue = e => {
        return e.target.value;
    };

    const click = e => {
        e.preventDefault();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        if (options.maxSizeMB >= originalImage.size / 1024 / 1024) {
            console.log(`originalFile size ${originalImage.size / 1024 / 1024} MB`);
            alert("Image is too small. Can't be compressed!")
            return;
        }

        let output;
        imageCompression(originalImage, options).then(x => {
            output = x;
            const downloadLink = URL.createObjectURL(output);
            setCompressedLink(downloadLink);
        });

        this.setState({ clicked: true });
        return 1;
    };


    return (
        <div>
            <div className="text-light text-center">
                <h1>Three Simple Steps</h1>
                <h3>1. Upload Image</h3>
                <h3>2. Click on Compress</h3>
                <h3>3. Download Compressed Image</h3>
            </div>

            <div className="row">
                <div className="column">
                    {uploadImage && uploadImage ? (
                        <Card.Img
                            className="ht"
                            variant="top"
                            src={originalLink}
                        ></Card.Img>
                    ) : (
                        <Card.Img
                            className="ht"
                            variant="top"
                            src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg"
                        ></Card.Img>
                    )}

                    <div className="justify-content-center">
                        <input
                            type="file"
                            className="mt-2 btn btn-dark w-75"
                            accept="image/*"
                            onChange={e => handle(e)}
                        />
                    </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
                    <br />
                    {outputFileName && outputFileName ? (
                        <button
                            type="button"
                            className=" btn btn-dark"
                            onClick={e => click(e)}
                        >
                            Compress
                        </button>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
                    <Card.Img variant="top" src={compressedLink}></Card.Img>
                    {clicked ? (
                        <div className="d-flex justify-content-center">
                            <a
                                href={compressedLink}
                                download={outputFileName}
                                className="mt-2 btn btn-dark w-75"
                            >
                                Download
                            </a>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ImageCompresser