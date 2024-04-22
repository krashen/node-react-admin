import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'
import Wrapper from '../../components/Wrapper.component'
import ImageUploader from '../../components/ImageUploader.component'

const ProductEdit = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState('')
    const [redirectAfter, setRedirectAfter] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.get(`products/${id}`)

                setTitle(data.title)
                setDescription(data.description)
                setImage(data.image)
                setPrice(data.price)
                                   
            } catch(e) {
                console.log(e)
            }
            
        })()
    },[])
    
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        try {
            const response = await axios.put(`products/${id}`,{
                title,
                description,
                image,
                price: parseInt(price)
            })
            console.log(response)
            if (response.status === 202) {
                setRedirectAfter(true)           
            }
        } catch(e) {
            console.log(e)
        }

    }
    
    return (
        <Wrapper>
            {redirectAfter && <Navigate to={'/products'} />}
            <div className='form-signin form-add w-100 m-auto'>
                <form onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Add Product</h1>

                    <input
                        className="form-control" 
                        placeholder="Title"
                        defaultValue={title}
                        onChange={e => setTitle(e.target.value)}
                        required 
                    />
                    
                    <textarea
                        className="form-control" 
                        placeholder="Description"
                        defaultValue={description}
                        onChange={e => setDescription(e.target.value)}
                        required 
                    >
                    </textarea>
                    { (image.length > 0)?
                        <div className="small-image">
                            <img src={image} />
                            <button onClick={(e => setImage(''))}>X</button>
                        </div>
                        
                        :
                        null
                    }
                    <div className="input-group">
                        <input
                            className="form-control" 
                            placeholder="Image URL"
                            defaultValue={image}
                            onChange={e => setImage(e.target.value)}
                        />
                        or
                        <ImageUploader uploaded={setImage}/>
                        
                    </div>
                    

                    <input
                        className="form-control" 
                        placeholder="Price"
                        type="number"
                        defaultValue={price}
                        onChange={e => setPrice(e.target.value)}
                        required 
                    />
                    
                    <button
                        className="btn btn-primary w-100 py-2" type="submit">Add</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default ProductEdit