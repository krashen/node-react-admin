import axios from 'axios'

const ImageUploader = (props: {uploaded: (url: string) => void}) => {

    const onChangeHandle = async (files: FileList | null) => {
        if (files === null) return

        try {
            const formData = new FormData()
            formData.append('image', files[0])
            const {data} = await axios.post('upload', formData)

            props.uploaded(data.url)
        } catch(e){
            console.log(e)
        }

    }



    return (
        <label className="btn btn-primary">
            Upload <input type="file" hidden onChange={e => onChangeHandle(e.target.files)} />
        </label>
    )
}

export default ImageUploader