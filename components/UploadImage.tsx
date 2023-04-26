export default function UploadImage({setFile}:{setFile: React.Dispatch<React.SetStateAction<File | null>>}){

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileObj = event.target.files?.[0];
        if (!fileObj || !fileObj.type) return;
        // bc/ 'buffer' file type and node.js file types are slightly different
        setFile(fileObj);
    }

    return (
        <div>
            <label htmlFor="file">Attach a file</label>
        <input id="file" type="file" onChange={(e)=>handleFileChange(e)}></input>
        </div>
    )
}